<template>
  <div class="row">

    <div class="row">
      <div class="col-6">
        <h1>Scan a Lead</h1>
        <p><span>Name: </span>{{ attendee.name_First }} {{ attendee.name_Last }}</p>
        <p><span>Email: </span>{{ attendee.contact_Email }}</p>
        <p><span>Phone: </span>{{ attendee.contact_Phone }}</p>
        <p><span>Employer: </span>{{ attendee.contact_Employer }}</p>
        <form action=""
              class="col-6">
          <p>Rating</p>
          <span v-for="(rating, index) in ratings"
                :key="index">
              <label :for="'r-'+ rating">{{ rating }}
              </label>
              <input :id="'r-'+ rating"
                     :name="'r-'+ rating"
                     type="radio"
                     @change="updateScore(rating)">
            </span>
          <textarea v-model="commentRef"
                    @change="updateComment( commentRef )">
                  name="leadComments"></textarea>
        </form>
        <button @click="createLead(lead)">Submit Lead</button>
      </div>
    </div>

  </div>
  <div class="row">
    <div class="col-6">
      <h3>Lead</h3>
      <p>{{ lead }}</p>
      <h3>Company</h3>
      <p>{{ company }}</p>
      <h3>Attendee</h3>
      <p>{{ attendee }}</p>
    </div>
  </div>
</template>

<script setup>
import { createLead_Service } from "@/services/LeadDataService.js";
import AttendeeDataService from "@/services/AttendeeDataService.ts";
import { inject, onBeforeMount, onMounted, ref } from "vue";
import { getCompanyById_Service } from "@/services/CompanyDataService.js";

/*-| Variables |-*/
/*---+----+---+----+---+----+---+----+---*/
const expoYearGlobal = inject( 'expoYear' )

/*-| General |-*/
let ratings = [ 1, 2, 3, 4, 5 ];
const commentRef = ref( null );

/*-| URL |-*/
let paramTestUrl = new URL(
  "http://localhost:8081/add-lead/?first=Jonathan&last=Smith&email=js@yahoo.com&phone=645865485"
).searchParams;
let getParam = new URL( location.href ).searchParams;
const getUrlId = new URL( location.href ).searchParams.get( 'id' )

/*-| Lead Service |-*/
const attendeeService = new AttendeeDataService()
let attendee = ref(
  {
    expo_Year: expoYearGlobal,
    name_First: null,
    name_Last: null,
    contact_Email: null,
    contact_Phone: null,
    contact_Employer: null,
    reg_Type: null,
    tech_Sem: null
  }
)

/*-| Company Service |-*/
let company = ref(
  {
    id: null,
    expo_Year: expoYearGlobal,
    company_Name: null,
    company_Email: null,
    company_Web: null,
    company_Phone: null
  }
)

/*-| Scan Service |-*/
let lead = ref(
  {
    id: null,
    expo_Year: expoYearGlobal,
    attendee_Id: attendee.value.id,
    scan_Company_Id: company.value.id,
    name_First: attendee.value.name_First,
    name_Last: attendee.value.name_Last,
    email: attendee.value.contact_Email,
    phone: attendee.value.contact_Phone,
    employer: attendee.value.contact_Employer,
    score: 5,
    comment: null
  }
)

/*-| Lifecycle |-*/
/*---+----+---+----+---+----+---+----+---*/
onBeforeMount( () => {
  getAttendee( getUrlId )
  getCompany( 456453, company )
} )

/*-| Functions |-*/
/*---+----+---+----+---+----+---+----+---*/
async function getCompany( id, c ) {
  await getCompanyById_Service( id, c )
}

async function getAttendee( id ) {
  await attendeeService.get( id )
    .then( ( response ) => {
      attendee.value = response.data
      console.log( "attendee: ", attendee.value )
    } )
    .catch( ( e ) => {
      console.log( e )
    } )
  await loadLead()
}

function updateComment( c ) {
  lead.value.comment = c
}

function updateScore( r ) {
  lead.value.score = r
}

async function loadLead() {
  lead.value.attendee_Id = attendee.value.id
  lead.value.scan_Company_Id = company.value.id
  lead.value.name_First = attendee.value.name_First
  lead.value.name_Last = attendee.value.name_Last
  lead.value.email = attendee.value.contact_Email
  lead.value.phone = attendee.value.contact_Phone
  lead.value.employer = attendee.value.contact_Employer
}

async function createLead( l ) {
  await createLead_Service( l )
}

</script>
