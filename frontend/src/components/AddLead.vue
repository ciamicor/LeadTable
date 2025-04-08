<template>
  <div v-if="!scanConfirm"
       class="scanner-camera-container">
    <div class="scan-placement-container"></div>
    <qrcode-stream
      class="scanner-camera-wrap"
      @detect="getQrId($event)"
      @paused="scanCodeFound"
      @camera-on="scanTarget = 'Scanning'"
    ></qrcode-stream>
    <div class="row --items qr-float-container">
      <span class="col-10 qr-float-target-text">{{ scanTarget }}</span>

      <div v-if="scanCodeFound"
           class="row --justify-content-center">
        <button
          class="--warn qr-float-cancel"
          @click="resetScanning"
        >Reset
        </button>
        <button
          class="qr-float-confirm --primary"
          @click="scanConfirm = true">
          Continue
        </button>
      </div>
    </div>
  </div>
  <div class="row">

    <div v-if="scanConfirm"
         class="col-12">
      <h1>Confirm Lead</h1>
      <p><span>Company: </span>{{ activeCompName }}, {{ lead.scan_Company_Id }}</p>
      <p><span>Year: </span>{{ attendee.expo_Year }}</p>
      <p><span>Name: </span>{{ attendee.name_First }} {{ attendee.name_Last }}</p>
      <p><span>Email: </span>{{ attendee.contact_Email }}</p>
      <p><span>Phone: </span>{{ attendee.contact_Phone }}</p>
      <p><span>Employer: </span>{{ attendee.contact_Employer }}</p>
      <form action=""
            class="col-6">
        <fieldset>
          <legend>Rating</legend>
          <div
            v-for="(rating, index) in ratings"
            :key="index"
          >
            <input
              :id="'r-'+ rating"
              :name="'r-'+ rating"
              type="radio"
              @change="updateScore(rating)"
            />
            <label :for="'r-'+ rating">{{ rating }}</label>
          </div>
        </fieldset>
        <label for="comment">Comments</label>
        <textarea v-model="commentRef"
                  name="comment"
                  @change="updateComment( commentRef )">
                  name="leadComments"></textarea>
      </form>
      <div class="row --items">
        <button
          class="--warn"
          @click="resetScanning">
          Go Back
        </button>
        <button
          class="--success"
          @click="createLead(lead)">Add {{ lead.name_First }}
        </button>
      </div>
    </div>
  </div>
  {{ scanConfirm }} {{ scanCodeFound }}

  <button @click="scanConfirm = !scanConfirm">Swap View</button>

  <div v-if="debug"
       class="row">
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
import { QrcodeStream } from 'vue-qrcode-reader'
import { createLead_Service } from '@/services/LeadDataService.js'
import AttendeeDataService from '@/services/AttendeeDataService.ts'
import { inject, onBeforeMount, onMounted, ref } from 'vue'

/*-| Variables |-*/
/*---+----+---+----+---+----+---+----+---*/
const debug = false
const expoYear = inject( 'expoYear_Global' )
const activeCompId = inject( 'activeCompId_Global' )
const activeCompName = inject( 'activeCompName_Global' )

/*-| Scanning |-*/
const scanConfirm = ref( false )
const scanCodeFound = ref( false )
const scanTarget = ref( 'Loading' )

/*-| General |-*/
let ratings = [ 1, 2, 3, 4, 5 ]
const commentRef = ref( null )

/*-| Lead Service |-*/
const attendeeService = new AttendeeDataService()
let attendee = ref(
  {
    expo_Year: expoYear,
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
    id: activeCompId,
    expo_Year: expoYear,
    company_Name: activeCompName
  }
)

/*-| Scan Service |-*/
let lead = ref(
  {
    id: null,
    expo_Year: expoYear,
    attendee_Id: attendee.value.id,
    scan_Company_Id: activeCompId,
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
} )

/*-| Manage Related Data |-*/
/*---+----+---+----+---+----+---+----+---*/
async function getAttendee( id ) {
  await attendeeService.get( id )
    .then( ( response ) => {
      attendee.value = response.data
      console.log( 'attendee: ', attendee.value )
    } )
    .catch( ( e ) => {
      console.log( e )
    } )
  await loadLead()
}

/*-| Manage Scan Data |-*/
/*---+----+---+----+---+----+---+----+---*/
function updateComment( c ) {
  lead.value.comment = c
}

function updateScore( r ) {
  lead.value.score = r
}

/*-| Manage Lead Data |-*/
/*---+----+---+----+---+----+---+----+---*/
function resetScanning() {
  scanTarget.value = 'Scanning'
  scanConfirm.value = false
  scanCodeFound.value = false
}

async function resetLead() {
  lead.value.attendee_Id = null
  lead.value.name_First = null
  lead.value.name_Last = null
  lead.value.email = null
  lead.value.phone = null
  lead.value.employer = null
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

/*-| Get ID from QR Code |-*/
async function getQrId( e ) {
  let url = e[0].rawValue
  let id = new URL( url ).searchParams.get( 'id' )
  console.log( 'id scanned is: ', id )
  if ( id ) {
    await getAttendee( id )
    scanCodeFound.value = true
    scanTarget.value = attendee.value.name_First + ' ' + attendee.value.name_Last
  }
}

/*-| Create Lead |-*/
async function createLead( l ) {
  await createLead_Service( l )
  await resetLead()
  resetScanning()
  console.log( 'Lead reset to: ', lead.value )
}

</script>
