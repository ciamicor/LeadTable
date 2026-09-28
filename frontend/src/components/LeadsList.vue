<template>

  <div v-if="!exhibitorLocal.lead_Ret"
       class="row-12-300 --place-content-center">
    <div
      class="col-12-300 col-10-500 col-5-800">
      <h1>Looking for Leads?</h1>
      <div v-if="exhibitorLocal.name !== ''">
        <p>If you haven't purchased access, you can do in your
           ExpoFP Exhibitor Portal.
          <a v-if="exhibitorLocal.login_Url"
             :href="'https://app.expofp.com' + exhibitorLocal.login_Url"
             target="_blank"> Click here to view your
                              portal.</a>
           Scroll down to "Booths &
           Extras," click "Reserve More,"
           and select the option for lead
           retrieval.</p>
      </div>
      <p v-else-if="exhibitorLocal.name === ''">
        You'll need your login ID to access lead retrieval.
      </p>
      <router-link
        class="button --primary"
        to="profile"
      >
        Go to Profile
      </router-link>
    </div>
  </div>
  <div v-if="exhibitorLocal.lead_Ret === true">
    <div class="col-12-300 --p-10-clamp">
      <div class="row-12-300 --justify-content-space-between --m-b-6">
        <LeadsExport v-if="leadsLocalDB.length > 0"
                     :lead-count="leadsLocalDB.length"
                     :leads-list="leadsLocalDB"
                     class=" --p-v-3"/>
        <span v-if="unsyncedLocalLeads > 0">
          {{ unsyncedLocalLeads }} Unsynced Leads
        </span>
        <button class="--warn --p-v-3"
                @click="logOut">Log Out
        </button>
      </div>

      <div v-if="exhibitorLocal.name"
           class="--flex-grow-1">
        <p>
          {{ expoLocal.clientFull }}
          {{ expoLocal.name }}
        </p>
        <h2>{{ exhibitorLocal.name }}</h2>
      </div>
    </div>
    <LoadingHolder :status="status"
                   class="--place-self-center"/>
    <div class="lead-cards-container">
      <p v-if="!leadsLocalDB"
         class="--place-self-center">
        No leads yet.
      </p>
      <!--      <div v-for="(lead,index) in leadsList"-->
      <div v-for="(lead,index) in leadsLocalDB"
           :key="index"
           :data-attendee-id="lead.attendee_Id"
           :data-company-scan="lead.scan_Company_Id"
           class="lead-card"
      >
        <LeadCard
          :lead="lead"
        />
      </div>
    </div>

    <router-link
      v-if="exhibitorLocal.lead_Ret === true"
      class="button --stacked --float --bottom-r --success--invert"
      to="scan-lead">
      <i class="bi-qr-code-scan"></i>
      Scan
    </router-link>
  </div>
</template>

<script setup>
import LoadingHolder from "@/components/LoadingHolder.vue";
import {
  useExhibitorLocalStore,
  useExpoLocalStore,
  useSessionStore
} from "@/stores.ts"
import {
  createLead_Service,
  getAllCompanyLeads_Service,
  saveLocal_Lead
} from "../services/LeadDataService.js"
import { onBeforeMount, onBeforeUnmount, onMounted, ref } from "vue"
import { getLocalExhibitor_Service } from "@/services/ExhibitorDataService.ts"
import LeadCard from "@/components/LeadCard.vue"
import LeadsExport from "@/components/LeadsExport.vue"
import { db } from "@/db.js";
import { liveQuery } from "dexie";
import { checkError } from "@/services/ErrorService.ts";

const sessionStore = useSessionStore()
const exhibitorLocal = useExhibitorLocalStore()
const expoLocal = useExpoLocalStore()

const leadsLocalDB = ref( [] )
const leadsServer = ref( [] )
const leadsTempHold = ref( [] );
const unsyncedLocalLeads = ref( 0 )
const isDBSubbed = ref( false )

/*-| Hooks |-*/
/*---+----+---+----+---+----+---+----+---*/
onBeforeMount( async () => {
} )

const leadsQuery = liveQuery( () => db.leads.where(
  { scan_Company_Id: exhibitorLocal.id }
).toArray() )
/*const leadsSubscribe = */
leadsQuery.subscribe( {
  next: ( result ) => {
    console.log( "leads from local DB: ", result );
    leadsLocalDB.value = result
  },
  error: ( error ) => console.error( error )
} );

onMounted( async () => {
    await getLocalExhibitor_Service( exhibitorLocal )
    console.log( exhibitorLocal.id )

    /*-| Get Server Leads
    ---+----+---+----+---+----+---+----+---*/
    await getAllCompanyLeads_Service( exhibitorLocal.id, leadsServer )
    status.value = false
    console.log( "leads from server: ", leadsServer.value )

    /*-| Compare Server Leads to Local
    ---+----+---+----+---+----+---+----+---*/
    let localDBHold = leadsLocalDB

    const leadsServerLength = leadsServer.value.length
    const leadsLocalLength = localDBHold.value.length

    for ( let x = 0; x < leadsLocalLength; x++ ) {
      let matchFound = false;
      let localLead = localDBHold.value[x]
      let localId = localLead.id;

      if ( leadsServerLength >= 1 ) {
        for ( let y = 0; y < leadsServerLength; y++ ) {
          let server = leadsServer.value[y]
          // console.log( y + " Server" )
          // console.log( server )
          if ( localLead.scan_Company_Id === server.scan_Company_Id
            && localLead.contact_Email === server.contact_Email
            && localLead.name_First === server.name_First
            && localLead.name_Last === server.name_Last
            && localLead.id === server.id ) {
            matchFound = true
          }
        }
      } else {
        matchFound = false
        console.log( "No leads found on the server." )
      }
      console.log( `Server match found for local ${ localLead.name_First }, ${ localLead.id }?`,
        matchFound )
      /*-| Hold Local Lead if NO MATCH |-*/
      if ( !matchFound ) {
        leadsTempHold.value.push( localLead )
        console.log( "holding temp lead", localLead )
      }
    }
    // Upload held Local Leads!
    for ( let y = 0; y < leadsTempHold.value.length; y++ ) {
      const id = leadsTempHold.value[y].id
      const leadHold = leadsTempHold.value[y]
      try {
        let localLeadUpload = await createLead_Service( leadHold )
        console.log( "uploaded lead id with new id:", localLeadUpload.id )
        await db.leads.update( id, { id: localLeadUpload.id, synced: true } );
        localDBHold.value[y].synced = true
        console.log( `updated local id: ${ id } to new server id: ${ localLeadUpload.id }` )
      } catch ( e ) {
        console.error( e )
      }
    }
    leadsTempHold.value = []

    /*-| Compare Local Leads to Server
    ---+----+---+----+---+----+---+----+---*/
    for ( let x = 0; x < leadsServerLength; x++ ) {
      let matchFound = false;
      let serverLead = leadsServer.value[x]

      for ( let y = 0; y < leadsLocalLength; y++ ) {
        let local = leadsLocalDB.value[y]
        // console.log( y + " Server" )
        // console.log( local )
        if ( local.scan_Company_Id === serverLead.scan_Company_Id
          && local.contact_Email === serverLead.contact_Email
          && local.name_First === serverLead.name_First
          && local.name_Last === serverLead.name_Last
          && local.id === serverLead.id ) {
          matchFound = true
        }
      }
      console.log( `Local match found for server ${ serverLead.name_First }, ${ serverLead.id }?`,
        matchFound )
      if ( !matchFound ) {
        await saveLocal_Lead( serverLead.id, serverLead, true )
      }
    }
  }
)

onBeforeUnmount( async () => {
  // await queryLocalLeads( "unsub" )
} )

/*-| Query Local Leads |-*/
async function queryLocalLeads( request = "sub" ) {
  const leadsQuery = liveQuery( () => db.leads.toArray() )
  const leadsSubscribe = leadsQuery.subscribe( {
    next: ( result ) => {
      console.log( "leads from local DB: ", result );
    },
    error: ( error ) => console.error( error )
  } );
  isDBSubbed.value = true;
  if ( isDBSubbed && request === "unsub" ) {
    leadsSubscribe.unsubscribe();
    console.log( "unsubscribed to local DB" )
  }
  return leadsSubscribe
}

/*-| Re-Attempt Lead Sync |-*/
async function attemptSync( l ) {
  console.log( "attempting to sync lead:", l )
  const idHold = l.id
  try {
    const leadAttempt = await createLead_Service( l )
    checkError( leadAttempt )
    console.log( "lead id is:", l.id )
    await db.leads.update( idHold,
      { id: leadAttempt.id, synced: true }
    )
    l.synced = true
  } catch ( e ) {
    console.error( e )
    unsyncedLocalLeads.value++
  }
}

/*/===!===!===!===!===!===!===!===!===!===!===!===!===!===!===!===!/*/
/*-| DB |-*/
/*/===!===!===!===!===!===!===!===!===!===!===!===!===!===!===!/*/
const status = ref( true )

const lead = ref(
  {
    expo_Client: exhibitorLocal.expo_Client,
    expo_Year: exhibitorLocal.expo_Year,
    attendee_Id: null,
    scan_Company_Id: exhibitorLocal.id,
    name_First: "",
    name_Last: "",
    title: "",
    email: "",
    phone: "",
    address_Line1: "",
    address_Line2: "",
    address_City: "",
    address_State: "",
    address_Zip: "",
    address_Country: "",
    employer: "",
    score: 0,
    comment: ""
  }
)

async function logOut() {
  // db.delete({ disableAutoOpen: false })
  db.profile.delete( 1 )
  sessionStore.logged_In = false
  exhibitorLocal.$reset()
  window.location.reload()
}

</script>

