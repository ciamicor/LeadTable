<template>
  <div class="row">
    <div class="table-container">
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
          <th id="expo_Year">Expo</th>
          <th id="company_Id">c_Id</th>
          <th>Edit/Add</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(lead, index) in leadsList"
            :key="index"
            :data-attendee-id="lead.attendee_Id"
            :data-company-scan="lead.scan_Company_Id"
        >
          <td id="name_First">{{ lead.name_First }}</td>
          <td id="name_Last">{{ lead.name_Last }}</td>
          <td id="email">{{ lead.email }}</td>
          <td id="phone">{{ lead.phone }}</td>
          <td id="employer">{{ lead.employer }}</td>
          <td id="employer">{{ lead.title }}</td>
          <td id="score">{{ lead.score }}</td>
          <td id="comment">{{ lead.comment }}</td>
          <td id="expo_Year">{{ lead.expo_Year }}</td>
          <td id="company_Id">{{ lead.scan_Company_Id }}</td>
          <td>
            <button class="--square --warn"
                    @click="deleteLead(lead.id)">
              <svg
                fill="none"
                height="20"
                stroke="currentColor"
                stroke-width="1.5"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg">
                <path d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      stroke-linecap="round"
                      stroke-linejoin="round" />
              </svg>
            </button>
          </td>
        </tr>

        <tr>
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
            {{ lead.scan_Company_Id }}
          </td>
          <td>
            <button class="--square --success"
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
    </div>
    <router-link
      class="button --stacked --float --bottom-r --success"
      to="/scan-lead">
      <i class="bi-qr-code-scan"></i>
      Scan
    </router-link>
  </div>

</template>

<script setup>
import router from '@/router.js'
import { db } from '../db'
import {
  createLead_Service, deleteLead_Service,
  getAllLeads_Service
} from '../services/LeadDataService.js'
import { ref, inject, onBeforeMount } from 'vue'
import QrCode from '@/components/QrCode.vue'

const expoYear = inject( 'expoYear_Global' )
const activeCompId = inject( 'activeCompId_Global' )
const activeCompLeadRet = inject( 'activeCompLeadRet_Global' )
const activeCompUrl = inject( 'activeCompUrl_Global' )
const activeCompName = inject( 'activeCompName_Global' )

console.log( 'loggedCompany: ',
  expoYear.value,
  activeCompId.value,
  activeCompLeadRet.value,
  activeCompUrl.value,
  activeCompName.value )

/*/===!===!===!===!===!===!===!===!===!===!===!===!===!===!===!===!/*/
/*-| DB |-*/
/*/===!===!===!===!===!===!===!===!===!===!===!===!===!===!===!/*/
const status = ref()

async function addDbLead() {
  try {
    const id = await db.leads.add( {
      expo_Year: lead.value.expo_Year,
      attendee_Id: lead.value.attendee_Id,
      scan_Company_Id: lead.value.scan_Company_Id,
      name_First: lead.value.name_First,
      name_Last: lead.value.name_Last,
      email: lead.value.email,
      phone: lead.value.phone,
      employer: lead.value.employer,
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

let leadsList = ref()
let lead = ref(
  {
    expo_Year: expoYear,
    attendee_Id: null,
    scan_Company_Id: activeCompId,
    name_First: 'Clara',
    name_Last: 'Mooney',
    title: 'Developer',
    email: 'claire@iami411.org',
    phone: '6066066066',
    employer: 'IAMI',
    score: 5,
    comment: 'I would do anything for her.'
  }
)

async function resetLeadVal() {
  lead.value.expo_Year = expoYear
  lead.value.attendee_Id = null
  lead.value.scan_Company_Id = activeCompId
  lead.value.name_First = null
  lead.value.name_Last = null
  lead.value.title = null
  lead.value.email = null
  lead.value.phone = null
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
    return l.scan_Company_Id === activeCompId.value
  } )
}

async function createLead( l ) {
  console.log( 'Create lead: ', l.name_First )
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

/*-| Hooks |-*/
/*---+----+---+----+---+----+---+----+---*/
onBeforeMount( () => {
    getAllLeads( leadsList )
  }
)

</script>

<style scoped></style>
