<template>

  <div class="row-12-300 --gap-24 --place-content-center --p-4">
    <form
      v-show="!showQr"
      class="col-12-300 col-10-600 col-8-900 --p-b-0 --p-t-12"
      @submit.prevent="createAttendee(attendee)"
    >
      <h4 class="--m-0">
        {{ expoLocal.expo_Client }}
        {{ expoLocal.expo_Year }}
        Suppliers' Day
      </h4>
      <h1 id="attendee-reg">Badge Registration</h1>
      <p>Register to attend the expo or create booth personnel badges.</p>
      <div class="row-12-300 --no-space">
        <label>
          First Name
          <input
            v-model="attendee.name_First"
            autocomplete="given-name"
            name="name-first"
            placeholder="First Name"
            required
            type="text">
        </label>
        <label>
          Last Name
          <input
            v-model="attendee.name_Last"
            autocomplete="family-name"
            name="name-last"
            placeholder="Last Name"
            required
            type="text">
        </label>
      </div>
      <div class="row-12-300 --no-space">
        <label>
          Employer
          <input
            v-model="attendee.contact_Employer"
            autocomplete="organization"
            name="employer"
            placeholder="Employer"
            required
            type="text"></label>
        <label>
          Position/Title
          <input
            v-model="attendee.title"
            autocomplete="organization-title"
            name="title"
            placeholder="Position/Title"
            required
            type="text">
        </label>
      </div>
      <div class="row-12-300 --no-space">
        <label>
          Email Address
          <input
            v-model="attendee.contact_Email"
            autocomplete="email"
            name="title"
            placeholder="Email Address"
            required
            type="email"/>
        </label>
        <label>
          Phone Number
          <input
            v-model="attendee.contact_Phone"
            autocomplete="tel"
            name="phone"
            placeholder="Phone Number"
            required
            type="tel"/>
        </label>
      </div>
      <div class="row-12-300 --no-space">
        <label class="row-12-300">
          <span class="--flex-basis-100">Your Address</span>
          <input
            v-model="attendee.address_Line1"
            autocomplete="address-line1"
            class="--w-45"
            name="address"
            placeholder="Address"
            type="text"/>
          <input
            v-model="attendee.address_Line2"
            autocomplete="address-line2"
            class="--w-45"
            name="address"
            placeholder="Apt, Suite, etc"
            type="text"/>
          <input
            v-model="attendee.address_City"
            autocomplete="address-level2"
            name="city"
            placeholder="City"
            type="text"/>
          <input
            v-model="attendee.address_State"
            autocomplete="address-level1"
            name="state"
            placeholder="State/Province"
            type="text"/>
          <input
            v-model="attendee.address_Zip"
            autocomplete="postal-code"
            name="zip"
            placeholder="Zip/Postal Code"
            type="text"/>
          <select id="selectCountry"
                  v-model="attendee.address_Country"
                  autocomplete="country-name"
                  name="selectCountry">
            <option disabled
                    selected
                    value="">Select Country
            </option>
            <option v-for="c in countries"
                    :key="c"
                    :value="c"
            >
              {{ c }}
            </option>
          </select>
        </label>
      </div>
      <label>
        Choose Registration Type
        <select
          v-model="attendee.reg_Type"
          name="reg-type"
          required
        >
          <option value="Attendee">Attendee</option>
          <option value="Exhibitor">Exhibitor</option>
          <option value="Both">Both</option>
        </select>
      </label>
      <!--      <label>
              Choose Tech Seminars
              <select
                v-model="attendee.tech_Sem"
                name="reg-type"
              >
                <option value="Attending">Yes</option>
                <option value="">No</option>
              </select>
            </label>-->
      <button v-if="!showQr"
              class="--success --m-t-12"
              type="submit"
      >
        Submit Registration
      </button>
    </form>
    <div v-show="showQr"
         class="row-10-300 --justify-content-center --align-content-start">
      <p class="--flex-basis-100 --place-self-center">
        Thanks for registering for the {{ expoLocal.expo_Year }}
        {{ expoLocal.expo_Client }} Suppliers' Day, {{ attendee.name_First }}.
      </p>
      <button
        v-if="urlData.view === 'admin'"
        class="--secondary --flex-grow"
        @click="printBadge_Portrait3x4(attendee)">
        Print {{ attendee.name_First }}'s Badge
      </button>
      <button
        class="--success --flex-grow"
        @click="resetForm">
        Register Another Badge
      </button>
    </div>
    <div class="badges-page-container">
      <img id="badge-logo"
           :alt="`${companyLocal.name}-logo`"
           :src="getImageUrl(`${expoLocal.expo_Client.toString().toLowerCase()}-vert-rgb`)"
      >
      <QrCode
        v-if="showQr"
        id="qr-code"
        :size="215"
        :url-value="attendeeId"
        class="badge--qr"
      ></QrCode>
    </div>
  </div>
</template>

<script lang="js"
        setup>
// TODO Convert to TS
import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas'
import QrCode from '@/components/QrCode.vue'
import { ref } from 'vue'
import { createAttendee_Service } from '@/services/AttendeeDataService.ts'
import { useExhibitorLocalStore, useExpoLocalStore } from '@/stores.js'
import { toTitleCase_Service } from '@/services/functions/TextManipulationService.ts'
import { getUrlHost, getUrl_ClientYear } from "@/services/functions/UrlService.ts";

import { countries } from "@/services/addresses/AddressForm_Countries.js";

const urlData = ref( getUrl_ClientYear() )
const host = getUrlHost()
const companyLocal = useExhibitorLocalStore()
const expoLocal = useExpoLocalStore()

function getImageUrl( name ) {
  return new URL( `../../public/logos/${ expoLocal.expo_Client.toString()
    .toLowerCase() }/${ name }.jpeg`, import.meta.url ).href
}

/*-| Print Component |-*/
/*-| Attendees |-*/
/*/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/*/
const showQr = ref( false )
const attendeeId = ref()
const attendee = ref( {
  expo_Year: expoLocal.expo_Year,
  expo_Client: expoLocal.expo_Client,
  name_First: '',
  name_Last: '',
  contact_Email: '',
  contact_Phone: '',
  contact_Employer: '',
  address_Line1: '',
  address_Line2: '',
  address_City: '',
  address_State: '',
  address_Zip: '',
  address_Country: '',
  title: '',
  reg_Type: 'Attendee',
  tech_Sem: ''
} )

async function createAttendee( a ) {
  await createAttendee_Service( a, expoLocal.expo_Client, expoLocal.expo_Year )
  attendeeId.value = attendee.value.id.toString()
  console.log( 'New Attendee\'s ID is: ', typeof attendeeId.value, attendeeId.value )
  showQr.value = true
}

function resetForm() {
  showQr.value = false
  attendee.value = {
    expo_Year: expoLocal.expo_Year,
    expo_Client: expoLocal.expo_Client,
    name_First: '',
    name_Last: '',
    contact_Email: '',
    contact_Phone: '',
    contact_Employer: '',
    address_Line1: '',
    address_Line2: '',
    address_City: '',
    address_State: '',
    address_Zip: '',
    address_Country: '',
    title: '',
    reg_Type: '',
    tech_Sem: ''
  }
}

/*-| Printing |-*/
/*/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/*/
const qrData = ref()
const qrLogo = ref()

async function select2Canvas( s, d ) {
  const selector = document.querySelector( s )
  await html2canvas( selector, {
    allowTaint: true,
    useCORS: true
  } ).then( canvas => {
    d.value = canvas.toDataURL(
      'image/png' )
    console.log( canvas )
  } )
}

async function printBadge_Portrait3x4( a ) {
  console.log( a.id )
  await select2Canvas( '#qr-code', qrData )
  await select2Canvas( '#badge-logo', qrLogo )
  /*-| Store Badge Dimensions, Placement |-*/
  const dim = {
    h: 3,
    w: 4,
    p: 0.1875,
    imgW: 1.875,
    imgH: 1.125,
    rot: 90
  }
  /*-| Declare Badge |-*/
  const badgePdf = new jsPDF( {
    orientation: 'portrait',
    unit: 'in',
    format: [ dim.w, dim.h ]
  } )

  /*-| Text |-*/
  badgePdf.setFontSize( 18 )
  badgePdf.text( a.contact_Employer, dim.p * 2, dim.w - dim.p, null, dim.rot )
  badgePdf.setFontSize( 22 )
  badgePdf.text( toTitleCase_Service( `${ a.name_First } ${ a.name_Last }` ),
    dim.p * 4,
    dim.w - dim.p,
    dim.rot )
  badgePdf.setFontSize( 18 )
  badgePdf.text( toTitleCase_Service( a.title ), dim.p * 6, dim.w - dim.p, dim.rot )

  /*-| Add QR Code |-*/
  badgePdf.addImage( qrData.value,
    'PNG',
    dim.h - dim.p,
    dim.w - dim.imgH - dim.p,
    dim.imgH,
    dim.imgH,
    'qr',
    'FAST',
    dim.rot )
  /*-| Add Logo |-*/
  badgePdf.addImage( qrLogo.value,
    'PNG',
    dim.h - dim.p,
    dim.p * 4,
    dim.imgW,
    dim.imgH,
    'logo',
    'FAST',
    dim.rot )

  setTimeout( () => {
    badgePdf.output( 'dataurlnewwindow' )
  }, 300 )
}


</script>
