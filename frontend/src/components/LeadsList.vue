<template>
  <div class="row">
    <div class="table-container">
      <table>
        <thead>
        <tr>
          <th colspan="2">Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Employer</th>
          <th>Expo</th>
          <th>ID</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(lead, index) in leadsList"
            :key="index">
          <td>{{ lead.name_First }}</td>
          <td>{{ lead.name_Last }}</td>
          <td>{{ lead.contact_Email }}</td>
          <td>{{ lead.contact_Phone }}</td>
          <td>{{ lead.contact_Employer }}</td>
          <td>{{ lead.expo_Year }}</td>
          <td>
            <button class="--square --warn"
                    @click="deleteLead(lead.id)">
              <svg
                fill="none"
                height="24"
                stroke="currentColor"
                stroke-width="1.5"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg">
                <path d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      stroke-linecap="round"
                      stroke-linejoin="round"/>
              </svg>
            </button>
          </td>
        </tr>

        <tr>
          <td class="--p-12">
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
            <input v-model="lead.contact_Email"
                   name="email"
                   type="email">
          </td>
          <td>
            <input v-model="lead.contact_Phone"
                   name="phone"
                   type="tel">
          </td>
          <td>
            <input v-model="lead.contact_Employer"
                   name="employer"
                   type="text">
          </td>
          <td>
            <input v-model="lead.expo_Year"
                   name="expo"
                   type="text">
          </td>
          <td>
            <button class="--square --success"
                    @click="createLead(lead)">
              <svg
                fill="none"
                height="24"
                stroke="currentColor"
                stroke-width="1.5"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      stroke-linecap="round"
                      stroke-linejoin="round"/>
              </svg>
            </button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <div class="row --gap-24">
      <button class="col-4"
              @click="getAllLeads()">Refresh Leads
      </button>
      <p class="col-4">{{ lead }}</p>
    </div>

    <QrCode :url-value="'2'"
            class="col-6"/>
  </div>
</template>

<script setup>
import LeadDataService from '../services/LeadDataService.js'
import { onMounted, ref } from "vue";
import QrCode from "@/components/QrCode.vue";

/*-| Variables |-*/
/*---+----+---+----+---+----+---+----+---*/
const leadService = new LeadDataService()
let leadsList = ref( [] )

let lead = ref(
  {
    expo_Year: 2025,
    name_First: "Bella",
    name_Last: "Castellino",
    contact_Email: "bc@yahoo.com",
    contact_Phone: "6066066066",
    contact_Employer: 1
  }
)

/*-| Functions |-*/
/*---+----+---+----+---+----+---+----+---*/
async function getAllLeads() {
  await leadService.getAll()
    .then( ( response ) => {
      leadsList.value = response.data
      console.log( response.data )
    } )
    .catch( ( e ) => {
      console.log( e )
    } )
}

async function createLead( lead ) {
  const data = {
    expo_Year: lead.expo_Year,
    name_First: lead.name_First,
    name_Last: lead.name_Last,
    contact_Email: lead.contact_Email,
    contact_Phone: lead.contact_Phone,
    contact_Employer: lead.contact_Employer
  }
  await leadService.create( data )
    .then( ( response ) => {
      lead.value.id = response.data.id
      console.log( response.data )
    } )
    .catch( ( e ) => {
      console.log( e )
    } )
  await getAllLeads()
}

async function deleteLead( id ) {
  await leadService.delete( id )
    .then( ( response ) => {
      console.log( response.data )
    } )
    .catch( ( e ) => {
      console.log( e )
    } )
  await getAllLeads()
}

onMounted( getAllLeads )

</script>

<style scoped></style>
