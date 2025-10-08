<template>
  <div v-if="!scanConfirm"
       class="scanner-camera-container">
    <div class="scan-placement-container"></div>
    <qrcode-stream
      class="scanner-camera-wrap"
      @detect="getQrId($event)"
      @camera-on="scanTarget = 'Scanning'"
    ></qrcode-stream>
    <div class="row --items qr-float-container">
      <span class="col-10-300 qr-float-target-text">{{ scanTarget }}</span>

      <div v-show="scanCodeFound"
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
  <div v-if="scanConfirm"
       class="row">
    <div
      class="col-12-300 --m-h-8 --m-v-12">
      <h1>Confirm Lead</h1>
      <span>Name: </span>
      <p class=" --m-b-8">{{ attendee.name_First }} {{ attendee.name_Last }}</p>
      <div class="row-12-300 --m-b-8">
        <div class="col-6-300">
          <span>Email: </span>
          <p>{{ attendee.contact_Email }}</p>
        </div>
        <div class="col-6-300">
          <span>Phone: </span>
          <p>{{ attendee.contact_Phone }}</p>
        </div>
      </div>
      <div class="row-12-300 --m-b-8">
        <div class="col-6-300">
          <span>Employer: </span>
          <p>{{ attendee.contact_Employer }}</p>
        </div>
        <div class="col-6-300">
          <span>Title: </span>
          <p>{{ attendee.title }}</p>
        </div>
      </div>
      <span>Address: </span>
      <div>
        <p>{{ `${ attendee.address_Line1 }, ${ attendee.address_Line2 }` }}</p>
        <p>{{ ` ${ attendee.address_City }, ${ attendee.address_State } ${ attendee.address_Zip }`
           }}
        </p>
        <p>{{ `${ attendee.address_Country }` }}</p>
      </div>


      <form action=""
            class="col-12-300">
        <fieldset class="--m-t-12">
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
        <label class="--m-t-16"
               for="comment">Comments</label>
        <textarea v-model="commentRef"
                  name="comment"
                  rows="3"
                  @change="updateComment( commentRef )">
                  name="leadComments"></textarea>
      </form>
      <div class="row-12-300 --items --m-t-16">
        <button
          class="--primary--invert --flex-basis-100"
          @click="createLead(lead); router.push('/:client/:year/leads-list')">
          Add {{ lead.name_First }}
        </button>
        <button
          class="--warn"
          @click="resetScanning">
          Go Back
        </button>
        <button
          class="--success"
          @click="createLead(lead)">Add & Scan Another
        </button>
      </div>
    </div>
  </div>
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
import router from '@/router.js'
import { useCompanyLocalStore } from '@/stores.js'

/*-| Variables |-*/
/*---+----+---+----+---+----+---+----+---*/
const debug = false

const companyLocalData = useCompanyLocalStore()

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
    expo_Year: companyLocalData.expo_Year,
    expo_Client: companyLocalData.expo_Client,
    name_First: '',
    name_Last: '',
    contact_Email: '',
    contact_Phone: '',
    contact_Employer: '',
    title: '',
    reg_Type: '',
    tech_Sem: '',
    address_Line1: '',
    address_Line2: '',
    address_City: '',
    address_State: '',
    address_Zip: '',
    address_Country: '',
  }
)

/*-| Company Service |-*/
let company = ref(
  {
    id: companyLocalData.id,
    expo_Year: companyLocalData.expo_Year,
    company_Name: companyLocalData.name
  }
)

/*-| Scan Service |-*/
let lead = ref(
  {
    id: null,
    expo_Year: companyLocalData.expo_Year,
    expo_Client: companyLocalData.expo_Client,
    attendee_Id: attendee.value.id,
    scan_Company_Id: companyLocalData.id,
    name_First: attendee.value.name_First,
    name_Last: attendee.value.name_Last,
    email: attendee.value.contact_Email,
    phone: attendee.value.contact_Phone,
    employer: attendee.value.contact_Employer,
    address_Line1: attendee.value.address_Line1,
    address_Line2: attendee.value.address_Line2,
    address_City: attendee.value.address_City,
    address_State: attendee.value.address_State,
    address_Zip: attendee.value.address_Zip,
    address_Country: attendee.value.address_Country,
    title: attendee.value.title,
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
  lead.value.title = null
  lead.value.address_Line1 = null
  lead.value.address_Line2 = null
  lead.value.address_City = null
  lead.value.address_State = null
  lead.value.address_Zip = null
  lead.value.address_Country = null
  lead.value.comment = null
}

async function loadLead() {
  lead.value.attendee_Id = attendee.value.id
  lead.value.scan_Company_Id = company.value.id
  lead.value.name_First = attendee.value.name_First
  lead.value.name_Last = attendee.value.name_Last
  lead.value.email = attendee.value.contact_Email
  lead.value.phone = attendee.value.contact_Phone
  lead.value.employer = attendee.value.contact_Employer
  lead.value.title = attendee.value.title
  lead.value.address_Line1 = attendee.value.address_Line1
  lead.value.address_Line2 = attendee.value.address_Line2
  lead.value.address_City = attendee.value.address_City
  lead.value.address_State = attendee.value.address_State
  lead.value.address_Zip = attendee.value.address_Zip
  lead.value.address_Country = attendee.value.address_Country
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
}
</script>
