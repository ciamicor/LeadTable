<template>
  <div
    class="row-12-300 --place-content-center">
    <div v-if="!companyLocalData.lead_Ret"
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
    <div v-if="companyLocalData.lead_Ret === true">
      <div class="row-12-300 --p-10-clamp">
        <div v-if="companyLocalData.name"
             class="col-12-300 col-8-800 --flex-grow">
          <p>
            {{ companyLocalData.expo_Client }}
            {{ companyLocalData.expo_Year }}
            Supplier's Day
          </p>
          <h2>{{ companyLocalData.name }}</h2>
        </div>
        <LeadsExport :leads-list="leadsList"
                     class="--justify-self-end"/>
      </div>
      <LoadingHolder :status="status"
                     class="--place-self-center"/>
      <div class="lead-cards-container">
        <div v-for="(lead, index) in leadsList"
             :key="index"
             :data-attendee-id="lead.attendee_Id"
             :data-company-scan="lead.scan_Company_Id"
             class="lead-card"
        >
          <LeadCard :lead="lead"/>
        </div>
      </div>

      <router-link
        v-if="companyLocalData.lead_Ret === true"
        class="button --stacked --float --bottom-r --success--invert"
        to="scan-lead">
        <i class="bi-qr-code-scan"></i>
        Scan
      </router-link>
    </div>

  </div>

</template>

<script setup>
import LoadingHolder from "@/components/LoadingHolder.vue";
import { useCompanyLocalStore, useExpoLocalStore } from '@/stores.ts'
import { getAllLeads_Service, getAllCompanyLeads_Service } from '../services/LeadDataService.js'
import { onMounted, ref } from 'vue'
import { getLocalCompanyData_Service } from '@/services/CompanyDataService.js'
import LeadCard from '@/components/LeadCard.vue'
import LeadsExport from '@/components/LeadsExport.vue'

const companyLocalData = useCompanyLocalStore()
const expoLocalData = useExpoLocalStore()

/*-| Hooks |-*/
/*---+----+---+----+---+----+---+----+---*/
onMounted( async () => {
    await getLocalCompanyData_Service( companyLocalData )
    console.log( companyLocalData.id )
    await getAllCompanyLeads_Service( companyLocalData.id, leadsList )
    status.value = false
  }
)
/*/===!===!===!===!===!===!===!===!===!===!===!===!===!===!===!===!/*/
/*-| DB |-*/
/*/===!===!===!===!===!===!===!===!===!===!===!===!===!===!===!/*/
const status = ref( true )

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
    comment: ''
  }
)

/*/===!===!===!===!===!===!===!===!===!===!===!===!===!===!===!===!/*/
/*-| Edit Leads |-*/
/*/===!===!===!===!===!===!===!===!===!===!===!===!===!===!===!/*/

async function getAllLeads( l ) {
  await getAllLeads_Service( l )
  //console.log( 'Got All Leads: ', l )
  leadsList.value = leadsList.value.filter( ( l ) => {
    return l.scan_Company_Id === companyLocalData.id
  } )
}

</script>

