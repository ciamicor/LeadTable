<template>
  <div class="row">

    <div class="row">
      <div class="col-6">
        <h1>Add a Lead</h1>
        <p><span>Name: </span>{{ lead.name_First }} {{ lead.name_Last }}</p>
        <p><span>Email: </span>{{ lead.contact_Email }}</p>
        <p><span>Phone: </span>{{ lead.contact_Phone }}</p>
        <p><span>Employer: </span>{{ company.company_Name }}</p>
        <form action=""
              class="col-6">
          <p>Rating</p>
          <span v-for="(rating, index ) in ratings"
                :key="index">
              <label :for="'r-'+ rating">{{ rating }}
              <input :id="'r-'+ rating"
                     v-model="scan.lead_Score"
                     :name="'r-'+ rating"
                     :value="rating"
                     type="radio">
              </label>
            </span>
          <textarea v-model="scan.company_Comments">
                  name="scanComments"></textarea>
        </form>
        <button @click="createScan( scan )">Submit Lead</button>
      </div>
    </div>

  </div>
  <div class="row">
    <div class="col-6">
      <h3>Lead</h3>
      <p>{{ lead }}</p>
      <h3>Company</h3>
      <p>{{ company }}</p>
      <h3>Scan</h3>
      <p>{{ scan }}</p>
    </div>
  </div>
</template>

<script setup>
import LeadDataService from "@/services/LeadDataService.js";
import ScanDataService from "@/services/ScanDataService.js";
import { onBeforeMount, onMounted, ref } from "vue";
import CompanyDataService from "@/services/CompanyDataService.js";

/*-| Variables |-*/
/*---+----+---+----+---+----+---+----+---*/
/*-| General |-*/
let ratings = [ 1, 2, 3, 4, 5 ];

/*-| URL |-*/
let paramTestUrl = new URL(
  "http://localhost:8081/add-lead/?first=Jonathan&last=Smith&email=js@yahoo.com&phone=645865485"
).searchParams;
let getParam = new URL( location.href ).searchParams;
const getUrlId = new URL( location.href ).searchParams.get( 'id' )

/*-| Lead Service |-*/
const leadService = new LeadDataService()
let lead = ref(
  {
    expo_Year: 2025,
    name_First: null,
    name_Last: null,
    contact_Email: null,
    contact_Phone: null,
    contact_Employer: null
  }
)

/*-| Company Service |-*/
const companyService = new CompanyDataService()
let company = ref(
  {
    expo_Year: 2025,
    company_Name: null,
    company_Email: null,
    company_Web: null,
    company_Phone: null
  }
)

/*-| Scan Service |-*/
const scanService = new ScanDataService()
let scan = ref(
  {
    expo_Year: 2025,
    company_Id: 1,
    lead_Id: getUrlId,
    lead_Score: 1,
    company_Comments: null
  }
)

/*-| Lifecycle |-*/
/*---+----+---+----+---+----+---+----+---*/
onBeforeMount( () => {
  getLead( getUrlId )
} )

onMounted( () => {
  getCompany( 2 )
  // getCompany( lead.value.contact_Employer )
} )

/*-| Functions |-*/
/*---+----+---+----+---+----+---+----+---*/
async function getCompany( id ) {
  await companyService.get( id )
    .then( ( response ) => {
      company.value = response.data
      console.log( company.value )
    } )
    .catch( ( e ) => {
      console.log( e )
    } )
}

async function getLead( id ) {
  await leadService.get( id )
    .then( ( response ) => {
      lead.value = response.data
      console.log( lead.value )
    } )
    .catch( ( e ) => {
      console.log( e )
    } )
}

async function createScan( scan ) {
  const data = {
    expo_Year: scan.expo_Year,
    company_Id: scan.company_Id,
    lead_Id: scan.lead_Id,
    lead_Score: scan.lead_Score,
    company_Comments: scan.company_Comments
  }
  await scanService.create( data )
    .then( ( response ) => {
      scan.value.id = response.data.id
      console.log( response.data )
      this.scan = null
    } )
    .catch( ( e ) => {
      console.log( e )
    } )

}

</script>
