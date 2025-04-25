<template>

  <div class="row-12-300 --gap-24 --place-content-center --p-4">
    <form
      class="col-12-300 col-10-600 col-8-900 --p-b-24 --p-t-12"
      @submit.prevent="createAttendee(attendee)"
    >
      <h4 class="--m-0">{{ expoLocalData.expo_Client }} {{ expoLocalData.expo_Year }} Supplier's
                        Day</h4>
      <h1 id="attendee-reg">Attendee Registration</h1>
      <p>All fields are required.</p>
      <div class="row-12-300 --items">
        <label>
          First Name
          <input
            v-model="attendee.name_First"
            name="name-first"
            placeholder="First Name"
            required
            type="text">

        </label>
        <label>
          Last Name
          <input
            v-model="attendee.name_Last"
            name="name-last"
            placeholder="Last Name"
            required
            type="text">

        </label>
      </div>
      <div class="row-12-300 --items">
        <label>
          Employer
          <input
            v-model="attendee.contact_Employer"
            name="employer"
            placeholder="Employer"
            required
            type="text"></label>

        <label>
          Position/Title
          <input
            v-model="attendee.title"
            name="title"
            placeholder="Position/Title"
            required
            type="text">

        </label>
      </div>
      <div class="row-12-300 --items">
        <label>
          Email Address
          <input
            v-model="attendee.contact_Email"
            name="title"
            placeholder="Email Address"
            required
            type="email"/>

        </label>
        <label>
          Phone Number
          <input
            v-model="attendee.contact_Phone"
            name="phone"
            placeholder="Phone Number"
            required
            type="tel"/>

        </label>
      </div>
      <div class="row-12-300 --items">
        <label>
          Your Address
          <input
            v-model="attendee.address"
            name="address"
            placeholder="Enter your address"
            required
            type="text"/>

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
        <!--              type="submit"-->
        Submit Registration
      </button>
      <button
        v-if="showQr"
        class="--secondary"
        @click="printBadge_Portrait3x4(attendee)">
        Print {{ attendee.name_First }}'s Badge
      </button>
    </form>

    <div class="badges-page-container">
      <img id="badge-logo"
           :alt="`${companyLocalData.name}-logo`"
           :src="host + '/src/assets/logos/'+ expoLocalData.expo_Client.toLowerCase() + '/' + expoLocalData.expo_Client.toLowerCase() + '-vert-rgb.jpeg'"
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
import { useCompanyLocalStore, useExpoLocalStore } from '@/stores.js'
import { toTitleCase_Service } from '@/services/TextContentService.js'
import { getUrlHost } from "@/services/functions/UrlFunc.js";

const host = getUrlHost()
const companyLocalData = useCompanyLocalStore()
const expoLocalData = useExpoLocalStore()

/*-| Print Component |-*/
/*-| Attendees |-*/
/*/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/*/
const showQr = ref( false )
const attendeeId = ref()
const attendee = ref( {
  expo_Year: expoLocalData.expo_Year,
  expo_Client: expoLocalData.expo_Client,
  name_First: '',
  name_Last: '',
  contact_Email: '',
  contact_Phone: '',
  contact_Employer: '',
  address: '',
  title: '',
  reg_Type: 'Attendee',
  tech_Sem: 'Attending'
} )

async function createAttendee( a ) {
  await createAttendee_Service( a, expoLocalData.expo_Client, expoLocalData.expo_Year )
  attendeeId.value = attendee.value.id.toString()
  console.log( 'New Attendee\'s ID is: ', typeof attendeeId.value, attendeeId.value )
  showQr.value = true
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
  badgePdf.text( toTitleCase_Service( `${ a.name_First } ${ a.name_Last }` ), dim.p * 4, dim.w - dim.p, dim.rot )
  badgePdf.setFontSize( 18 )
  badgePdf.text( toTitleCase_Service( a.title ), dim.p * 6, dim.w - dim.p, dim.rot )

  /*-| Add QR Code |-*/
  badgePdf.addImage( qrData.value, 'PNG', dim.h - dim.p, dim.w - dim.imgH - dim.p, dim.imgH, dim.imgH, 'qr', 'FAST', dim.rot )
  /*-| Add Logo |-*/
  badgePdf.addImage( qrLogo.value, 'PNG', dim.h - dim.p, dim.p * 4, dim.imgW, dim.imgH, 'logo', 'FAST', dim.rot )

  setTimeout( () => {
    badgePdf.output( 'dataurlnewwindow' )
  }, 300 )
}


</script>
