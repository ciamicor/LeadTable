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
      <!--    <div v-if="companyLocalData.lead_Ret"
               class="table-container &#45;&#45;m-b-24">
            <table>
              <thead>
              <tr>
                <th colspan="2">Name</th>
                <th id="email">Email</th>
                <th id="phone">Phone</th>
                <th id="employer">Employer</th>
                <th id="employer">Title</th>
                <th id="score">Score</th>
                <th id="comment">Comment</th>
                <th v-if="debug"
                    id="expo_Year">Expo
                </th>
                <th v-if="debug"
                    id="expo_Client">Client
                </th>
                <th v-if="debug"
                    id="company_Id">c_Id
                </th>
                <th v-if="debug">Edit/Add
                </th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(lead, index) in leadsList"
                  :key="index"
                  :data-attendee-id="lead.attendee_Id"
                  :data-company-scan="lead.scan_Company_Id"
              >
                <LeadCard :lead="lead" />
              </tr>
              <tr v-if="debug">
                <td>
                  <input v-model="lead.name_First"
                         name="nameFirst"
                         type="text">
                </td>
                <td>
                  <input v-model="lead.name_Last"
                         name="nameLast"
                         type="text">
                </td>
                <td>
                  <input v-model="lead.email"
                         name="email"
                         type="email">
                </td>
                <td>
                  <input v-model="lead.phone"
                         name="phone"
                         type="tel">
                </td>
                <td>
                  <input v-model="lead.employer"
                         name="employer"
                         type="text">
                </td>
                <td>
                  <input v-model="lead.title"
                         name="employer"
                         type="text">
                </td>
                <td>
                  <input v-model="lead.score"
                         name="score"
                         type="text">
                </td>
                <td>
                  <input v-model="lead.comment"
                         name="comment"
                         type="text">
                </td>
                <td>
                  {{ lead.expo_Year }}
                </td>
                <td>
                  {{ lead.expo_Client }}
                </td>
                <td>
                  {{ lead.scan_Company_Id }}
                </td>
                <td>
                  <button class="&#45;&#45;square &#45;&#45;success"
                          @click="createLead(lead)">
                    <svg
                      fill="none"
                      height="20"
                      stroke="currentColor"
                      stroke-width="1.5"
                      viewBox="0 0 24 24"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                            stroke-linecap="round"
                            stroke-linejoin="round" />
                    </svg>
                  </button>
                </td>
              </tr>
              </tbody>
            </table>
          </div>-->
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
import {
  createLead_Service,
  deleteLead_Service,
  getAllLeads_Service
} from '../services/LeadDataService.js'
import { onMounted, ref } from 'vue'
import { getLocalCompanyData_Service } from '@/services/CompanyDataService.js'
import LeadCard from '@/components/LeadCard.vue'

const debug = false
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
    console.log( 'loggedCompany: ',
      companyLocalData.expo_Year,
      companyLocalData.expo_Client,
      companyLocalData.id,
      companyLocalData.lead_Ret,
      companyLocalData.login_Url,
      companyLocalData.name )
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

async function resetLeadVal() {
  lead.value.expo_Client = companyLocalData.expo_Client
  lead.value.expo_Year = companyLocalData.expo_Year
  lead.value.attendee_Id = null
  lead.value.scan_Company_Id = companyLocalData.id
  lead.value.name_First = null
  lead.value.name_Last = null
  lead.value.title = null
  lead.value.email = null
  lead.value.phone = null
  lead.value.address = null
  lead.value.employer = null
  lead.value.score = 5
  lead.value.comment = ''
}

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

async function createLead( l ) {
  console.log( 'Create lead: ', l )
  await createLead_Service( l )
  await addDbLead()
  await getAllLeads( leadsList )
  await resetLeadVal()
}

async function deleteLead( id ) {
  await deleteLead_Service( id )
  await getAllLeads( leadsList )
}

async function checkLeadFields() {
}

</script>

