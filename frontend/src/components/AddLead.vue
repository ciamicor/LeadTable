<template>
  <div class="row">
    <h1>Leads</h1>
  </div>
  <div class="row">
    <div class="row">{{ leadsList }}</div>
    <div class="row">{{ companiesList }}</div>
    <div class="row">{{ scansList }}</div>


    <table>
      <thead>
      <tr>
        <th>ID</th>
        <th colspan="2">Name</th>
        <th>Email</th>
        <th>Phone</th>
        <th>Employer</th>
        <th>Expo</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(lead, index) in leadsList"
          :key="index">
        <td>{{ lead.id }}</td>
        <td>{{ lead.name_First }}</td>
        <td>{{ lead.name_Last }}</td>
        <td>{{ lead.contact_Email }}</td>
        <td>{{ lead.contact_Phone }}</td>
        <td>{{ lead.contact_Employer }}</td>
        <td>{{ lead.expo_Id }}</td>
      </tr>
      </tbody>
    </table>

    <table>
      <thead>
      <tr>
        <th>ID</th>
        <th>Company</th>
        <th>Email</th>
        <th>Website</th>
        <th>Phone</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(company, index) in companiesList"
          :key="index">
        <td>{{ company.id }}</td>
        <td>{{ company.company_Name }}</td>
        <td>{{ company.company_Email }}</td>
        <td>{{ company.company_Web }}</td>
        <td>{{ company.company_Phone }}</td>
      </tr>
      </tbody>
    </table>

    <table>
      <thead>
      <tr>
        <th>ID</th>
        <th>Score</th>
        <th>Comments</th>
        <th>Expo</th>
        <th>Scanned By</th>
        <th>Lead</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(scan, index) in scansList"
          :key="index">
        <td>{{ scan.id }}</td>
        <td>{{ scan.lead_Score }}</td>
        <td>{{ scan.company_Comments }}</td>
        <td>{{ scan.expo_Id }}</td>
        <td>{{ scan.company_Id }}</td>
        <td>{{ scan.lead_Id }}</td>
      </tr>
      </tbody>
    </table>

  </div>
</template>

<script setup>
import LeadDataService from "@/services/LeadDataService.js";
import CompanyDataService from "@/services/CompanyDataService.js";
import ScanDataService from "@/services/ScanDataService.js";
import { onMounted, ref } from "vue";

/*-| Variables |-*/
/*---+----+---+----+---+----+---+----+---*/
let lead = ref(
  {
    id: null,
    expo_Id: null,
    name_First: '',
    name_Last: '',
    contact_Email: '',
    contact_Phone: '',
    contact_Employer: '',
  }
)

let leadsList = ref( [] )
let scansList = ref( [] )
let companiesList = ref( [] )

/*-| Functions |-*/
/*---+----+---+----+---+----+---+----+---*/

const leads = new LeadDataService()
const scans = new ScanDataService()
const companies = new CompanyDataService()

leads.getAll()
  .then( ( response ) => {
    leadsList.value = response.data
    console.log( response.data )
  } )
  .catch( ( e ) => {
    console.log( e )
  } )

companies.getAll()
  .then( ( response ) => {
    companiesList.value = response.data
    console.log( response.data )
  } )
  .catch( ( e ) => {
    console.log( e )
  } )

scans.getAll()
  .then( ( response ) => {
    scansList.value = response.data
    console.log( response.data )
  } )
  .catch( ( e ) => {
    console.log( e )
  } )

</script>

<style scoped></style>
