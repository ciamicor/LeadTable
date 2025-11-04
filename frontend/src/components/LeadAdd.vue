<template>
  <div v-if="!scanConfirm"
       class="scanner-camera-container">
    <div v-show="!scanCodeFound"
         class="scan-placement-container"></div>
    <qrcode-stream
      v-if="!scanCodeFound"
      class="scanner-camera-wrap"

      @detect="getQrId($event)"
      @camera-on="scanTarget = 'Waiting for QR code...'"
    ></qrcode-stream>
    <div class="row-12-300 --no-space qr-float-container">
      <span class="col-12-300 qr-float-target-text">{{ scanTarget }}</span>
      <div v-show="scanCodeFound"
           class="row-12-300 --flex-grow">
        <button
          class="--warn qr-float-cancel --flex-basis-25"
          @click="resetScanning"
        >Reset
        </button>
        <button
          class="qr-float-confirm --primary --flex-basis-65"
          @click="scanConfirm = true">
          <i class="bi-plus-lg --m-r-4"/> Add Lead
        </button>
      </div>
    </div>
  </div>
  <div v-if="scanConfirm"
       class="row">
    <div
      class="col-12-300 --gap-2 --m-h-8 --m-v-12">
      <h3 class="--m-b-3">Confirm Lead</h3>
      <span class="--color-grey-6">Name: </span>
      <div class="--m-b-2 --m-l-4">
        {{ attendee.name_First }} {{ attendee.name_Last }}
      </div>
      <span class="--color-grey-6">Email: </span>
      <div class="--m-b-2 --m-l-4">{{ attendee.contact_Email }}</div>
      <span class="--color-grey-6">Phone: </span>
      <div class="--m-b-2 --m-l-4">{{ attendee.contact_Phone }}</div>
      <span class="--color-grey-6">Employer: </span>
      <div class="--m-b-2 --m-l-4">{{ attendee.contact_Employer }}</div>
      <span class="--color-grey-6">Title: </span>
      <div class="--m-b-2 --m-l-4">{{ attendee.title }}</div>
      <span class="--color-grey-6">Address: </span>
      <div class="--m-l-4">
        <div>{{ `${ attendee.address_Line1 }, ${ attendee.address_Line2 }` }}</div>
        <div>{{
            ` ${ attendee.address_City }, ${ attendee.address_State } ${ attendee.address_Zip }`
             }}
        </div>
        <div>{{ `${ attendee.address_Country }` }}</div>
      </div>

      <form action=""
            class="col-12-300">
        <fieldset class="--m-t-8">
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
            <label :for="'r-'+ rating"
                   class="--m-t-2">{{ rating }}</label>
          </div>
        </fieldset>
        <label class="--m-t-8"
               for="comment">Comments</label>
        <textarea v-model="commentRef"
                  name="comment"
                  rows="3"
                  @change="updateComment( commentRef )">
                  name="leadComments"></textarea>
      </form>
      <div class="row-12-300 --no-space --m-t-12">
        <button
          class="--primary--invert --flex-basis-100 --p-11"
          @click="createLead(lead); router.push(`/${companyLocal.expo_Client}/${companyLocal.expo_Year}/leads-list`)">
          Add {{ lead.name_First }}
        </button>
        <button
          class="--warn --flex-basis-30 --flex-grow --p-10"
          @click="resetScanning">
          Go Back
        </button>
        <button
          class="--success --flex-basis-65 --flex-grow --p-10"
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
import { useExhibitorLocalStore } from '@/stores.js'

/*-| Variables |-*/
/*---+----+---+----+---+----+---+----+---*/
const debug = false

const companyLocal = useExhibitorLocalStore()

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
    expo_Year: companyLocal.expo_Year,
    expo_Client: companyLocal.expo_Client,
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
    id: companyLocal.id,
    expo_Year: companyLocal.expo_Year,
    company_Name: companyLocal.name
  }
)

/*-| Scan Service |-*/
let lead = ref(
  {
    id: null,
    expo_Year: companyLocal.expo_Year,
    expo_Client: companyLocal.expo_Client,
    attendee_Id: attendee.value.id,
    scan_Company_Id: companyLocal.id,
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
