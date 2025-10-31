<template>

  <div v-if="!companyLocal.lead_Ret"
       class="row-12-300 --place-content-center">
    <div
      class="col-12-300 col-10-500 col-5-800">
      <h1>Looking for Leads?</h1>
      <p>To access or purchase lead retrieval, you'll first need to login.</p>
      <p>If you haven't purchased access, you can do so by logging in, then scrolling to "Booths &
         Extras" click "Reserve More",
         then scroll down again to find the option for lead
         retrieval.</p>
      <router-link
        class="button --primary"
        to="profile"
      >
        Go to Profile
      </router-link>
      <p class="--font-xs">You may need to logout, then login again to have the purchase
                           register.</p>
    </div>
  </div>
  <div v-if="companyLocal.lead_Ret === true">
    <div class="row-12-300 --p-10-clamp --place-content-space-between">
      <div v-if="companyLocal.name"
           class="--flex-grow-1">
        <p>
          {{ companyLocal.expo_Client }}
          {{ companyLocal.expo_Year }}
          Supplier's Day
        </p>
        <h2>{{ companyLocal.name }}</h2>
      </div>
      <LeadsExport v-if="leadsList.length > 0"
                   :leads-list="leadsList"
                   class="--justify-self-end"/>
    </div>
    <LoadingHolder :status="status"
                   class="--place-self-center"/>
    <div class="lead-cards-container">
      <p v-if="leadsList.length === 0"
         class="--place-self-center">
        No leads yet.
      </p>
      <div v-for="(lead,index) in leadsList"
           :key="index"
           :data-attendee-id="lead.attendee_Id"
           :data-company-scan="lead.scan_Company_Id"
           class="lead-card"
      >
        <LeadCard :lead="lead"/>
      </div>
    </div>

    <router-link
      v-if="companyLocal.lead_Ret === true"
      class="button --stacked --float --bottom-r --success--invert"
      to="scan-lead">
      <i class="bi-qr-code-scan"></i>
      Scan
    </router-link>
  </div>


</template>

<script setup>
import LoadingHolder from "@/components/LoadingHolder.vue";
import { useCompanyLocalStore, useExpoLocalStore, useLeadsListLocal } from '@/stores.ts'
import { getAllLeads_Service, getAllCompanyLeads_Service } from '../services/LeadDataService.js'
import { onMounted, ref } from 'vue'
import { getLocalCompanyData_Service } from '@/services/ExhibitorDataService.ts'
import LeadCard from '@/components/LeadCard.vue'
import LeadsExport from '@/components/LeadsExport.vue'

const companyLocal = useCompanyLocalStore()
const expoLocal = useExpoLocalStore()
const leadListLocal = useLeadsListLocal()

/*-| Hooks |-*/
/*---+----+---+----+---+----+---+----+---*/
onMounted( async () => {
    await getLocalCompanyData_Service( companyLocal )
    console.log( companyLocal.id )
    await getAllCompanyLeads_Service( companyLocal.id, leadsList )
    status.value = false
    console.log( typeof leadsList )
    console.log( leadsList.value )
    console.log( " Mapping array..." )
    const listMap = new Map( leadsList.value.map( ( l ) => [ l.id, l ] ) )
    // arr.map((obj) => [obj.key, obj.value])
    console.log( typeof listMap )
    console.log( listMap )
    console.log( listMap.get( 459 ) )
  }
)
/*/===!===!===!===!===!===!===!===!===!===!===!===!===!===!===!===!/*/
/*-| DB |-*/
/*/===!===!===!===!===!===!===!===!===!===!===!===!===!===!===!/*/
const status = ref( true )

/*/===!===!===!===!===!===!===!===!===!===!===!===!===!===!===!===!/*/
/*-| Leads List |-*/
/*/===!===!===!===!===!===!===!===!===!===!===!===!===!===!===!/*/

const leadsList = ref( [] )
const lead = ref(
  {
    expo_Client: companyLocal.expo_Client,
    expo_Year: companyLocal.expo_Year,
    attendee_Id: null,
    scan_Company_Id: companyLocal.id,
    name_First: '',
    name_Last: '',
    title: '',
    email: '',
    phone: '',
    address_Line1: '',
    address_Line2: '',
    address_City: '',
    address_State: '',
    address_Zip: '',
    address_Country: '',
    employer: '',
    score: 0,
    comment: ''
  }
)


</script>

