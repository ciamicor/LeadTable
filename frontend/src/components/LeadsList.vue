<template>
  <div
    class="row --justify-content-center">
    <div v-if="!companyLocalData.lead_Ret"
         class="col-12-300 col-9-500 col-5-900  --place-self-center">
      <h1>Looking for Leads?</h1>
      <p>To access or purchase lead retrieval, you'll first need to login.</p>
      <p>In "Booths & Extras" click "Reserve More", then scroll down to find the option for lead
         retrieval.</p>
      <router-link
        class="button --primary"
        to="/profile"
      >
        Go to Profile
      </router-link>
      <p class="--font-xs">You may need to logout, then login again to have the purchase
                           register.</p>

    </div>
    <div v-if="companyLocalData.lead_Ret">
      <div class="row --p-4">
        <div v-if="companyLocalData.name"
             class="col-12-300 col-10-800">
          <p class="--m-0">{{ companyLocalData.expo_Client }} {{ companyLocalData.expo_Year }}
                           Supplier's Day</p>
          <h2>{{ companyLocalData.name }}</h2>
        </div>
        <LeadsExport :leads-list="leadsList" />
      </div>
      <div class="lead-cards-container">
        <div v-for="(lead, index) in leadsList"
             :key="index"
             :data-attendee-id="lead.attendee_Id"
             :data-company-scan="lead.scan_Company_Id"
             class="lead-card"
        >
          <LeadCard :lead="lead" />
        </div>
      </div>

      <router-link
        v-if="companyLocalData.lead_Ret"
        class="button --stacked --float --bottom-r --success--invert"
        to="/scan-lead">
        <i class="bi-qr-code-scan"></i>
        Scan
      </router-link>
    </div>

  </div>

</template>

<script setup>
import { useCompanyLocalStore } from '@/main.ts'
import { storeToRefs } from 'pinia'
import { db } from '../db'
import { getAllLeads_Service } from '../services/LeadDataService.js'
import { onMounted, ref } from 'vue'
import { getLocalCompanyData_Service } from '@/services/CompanyDataService.js'
import LeadCard from '@/components/LeadCard.vue'
import LeadsExport from '@/components/LeadsExport.vue'

const companyLocalData = useCompanyLocalStore()
const {
  id,
  name,
  login_Url,
  lead_Ret,
  expo_Year,
  expo_Client
} = storeToRefs( companyLocalData )

/*-| Hooks |-*/
/*---+----+---+----+---+----+---+----+---*/
onMounted( () => {
    getAllLeads( leadsList )
    getProfile()
  }
)

/*/===!===!===!===!===!===!===!===!===!===!===!===!===!===!===!===!/*/
/*-| DB |-*/
/*/===!===!===!===!===!===!===!===!===!===!===!===!===!===!===!/*/
const status = ref()

async function getProfile() {
  await getLocalCompanyData_Service( companyLocalData )
}

async function addDbLead() {
  try {
    const id = await db.leads.add( {
      expo_Year: lead.value.expo_Year,
      expo_Client: lead.value.expo_Client,
      attendee_Id: lead.value.attendee_Id,
      scan_Company_Id: lead.value.scan_Company_Id,
      name_First: lead.value.name_First,
      name_Last: lead.value.name_Last,
      email: lead.value.email,
      phone: lead.value.phone,
      employer: lead.value.employer,
      address: lead.value.address,
      score: lead.value.score,
      comment: lead.value.comment
    } )

    status.value = `${ lead.value.name_First }
          successfully added. Got id ${ id }`

  } catch ( error ) {
    status.value = `Failed to add
          ${ lead.value.name }: ${ error }`
  }
  // Reset form
}

/*/===!===!===!===!===!===!===!===!===!===!===!===!===!===!===!===!/*/
/*-| Leads List |-*/
/*/===!===!===!===!===!===!===!===!===!===!===!===!===!===!===!/*/

const leadsList = ref()
const lead = ref(
  {
    expo_Client: companyLocalData.expo_Client,
    expo_Year: companyLocalData.expo_Year,
    attendee_Id: null,
    scan_Company_Id: companyLocalData.id,
    name_First: '',
    name_Last: '',
    title: '',
    email: '',
    phone: '',
    address: '',
    employer: '',
    score: 5,
    comment: 'I would do anything for her.'
  }
)

/*/===!===!===!===!===!===!===!===!===!===!===!===!===!===!===!===!/*/
/*-| Edit Leads |-*/
/*/===!===!===!===!===!===!===!===!===!===!===!===!===!===!===!/*/

async function getAllLeads( l ) {
  await getAllLeads_Service( l )
  console.log( 'leads', l )
  leadsList.value = leadsList.value.filter( ( l ) => {
    return l.scan_Company_Id === companyLocalData.id
  } )
}

</script>

