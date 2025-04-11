<template>
  <div class="row --gap-24">
    <!--    <div class="col-12-300 &#45;&#45;place-items-center">
          <router-link
            class="button &#45;&#45;primary"
            to="/print-badges">
            View All Badges
          </router-link>
        </div>-->
    <div
      class="col-12-300 col-10-600 col-8-900 --p-b-24 --p-t-12"
    >
      <h1>Attendee Registration</h1>
      <p>Register for the {{ companyLocalData.expo_Client }} {{ companyLocalData.expo_Year }}
         Supplier's Day. All fields are required.</p>

      <QrCode
        id="qr-code"
        :size="215"
        :url-value="'5442'"
        class="badge--qr"
      ></QrCode>

      <div class="row --items">
        <label>
          First Name
          <input
            v-model="attendee.name_First"
            name="name-first"
            placeholder="First Name"
            type="text">
        </label>
        <label>
          Last Name
          <input
            v-model="attendee.name_Last"
            aria-required="true"
            name="name-last"
            placeholder="Last Name"
            required
            type="text">
        </label>
      </div>
      <div class="row --items">
        <label>
          Employer
          <input
            v-model="attendee.contact_Employer"
            name="employer"
            placeholder="Employer"
            type="text"></label>
        <label>
          Position/Title
          <input
            v-model="attendee.title"
            name="title"
            placeholder="Position/Title"
            type="text">
        </label>
      </div>
      <div class="row --items">
        <label>
          Email Address
          <input
            v-model="attendee.contact_Email"
            name="title"
            placeholder="Email Address"
            type="email">
        </label>
        <label>
          Phone Number
          <input
            v-model="attendee.contact_Phone"
            name="phone"
            placeholder="Phone Number"
            type="tel">
        </label>
      </div>
      <div class="row --items">
        <label>
          Your Address
          <input
            v-model="attendee.address"
            name="address"
            placeholder="Enter your address"
            type="text">
        </label>
      </div>
      <label>
        Choose Registration Type
        <select
          v-model="attendee.reg_Type"
          name="reg-type"
        >
          <option value="Attendee">Attendee</option>
          <option value="Exhibitor">Exhibitor</option>
          <option value="Both">Both</option>
        </select>
      </label>
      <label>
        Choose Tech Seminars
        <select
          v-model="attendee.tech_Sem"
          name="reg-type"
        >
          <option value="Attending">Yes</option>
          <option value="">No</option>
        </select>
      </label>

      <button v-if="!showQr"
              class="--success --m-t-12"
              @click="createAttendee(attendee)">
        Submit Registration
      </button>
      <button v-if="showQr"
              class="--secondary"
              @click="">
        Print
      </button>
      <button
        class="--secondary"
        @click="printBadge">
        printBadge
      </button>
    </div>

    <div ref=""
         class="badges-page-container">
      <div
        class="badge-grid-container"
      >
        <div
          class="badge-wrap"
        >
          <div class="--attendee-info-container">
            <div class="--attendee-info-container">
              <p class="--employer"
                 style="width: 100%">
                {{ attendee.contact_Employer }}
              </p>
              <h1 class="--name">
                {{ attendee.name_First }}
                {{ attendee.name_Last }}
              </h1>
              <p class="--title">
                {{ attendee.title }}
              </p>
            </div>
          </div>
          <div class="badge--images-container">
            <div
              v-if="!showQr"
              class="badge--qr"
            ></div>
            <QrCode
              v-if="showQr"
              id="qr-code"
              :size="215"
              :url-value="attendeeId"
              class="badge--qr"
            ></QrCode>
            <img alt=""
                 src="../assets/logos/nyift/nyift-vert-rgb.jpeg">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="js"
        setup>
// TODO Convert to TS
// import { useVueToPrint } from 'vue-to-print'
import { jsPDF } from 'jspdf'
import QrCode from '@/components/QrCode.vue'
import { ref } from 'vue'
import { createAttendee_Service } from '@/services/AttendeeDataService.ts'
import { useCompanyLocalStore } from '@/main.js'

const companyLocalData = useCompanyLocalStore()

/*-| Print Component |-*/


/*-| Attendees |-*/
/*/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/*/
const showQr = ref( false )
const attendeeId = ref()
const attendee = ref( {
  expo_Year: companyLocalData.expo_Year,
  expo_Client: companyLocalData.expo_Client,
  name_First: 'Claire Test',
  name_Last: 'Claire Test',
  contact_Email: 'Claire Test',
  contact_Phone: 'Claire Test',
  contact_Employer: 'Claire Test',
  address: 'Claire Test',
  title: 'Claire Test',
  reg_Type: 'Attendee',
  tech_Sem: 'Attending'
} )

async function createAttendee( a ) {
  await createAttendee_Service( a )
  console.log( attendee )
  attendeeId.value = attendee.value.id.toString()
  console.log( typeof attendeeId.value )
  showQr.value = true
}

/*-| Printing |-*/
/*/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/*/
const badgePdf = new jsPDF( {
  orientation: 'landscape',
  unit: 'in',
  format: [ 4, 3 ]
} )

async function printBadge() {
  let qrInner = document.getElementById( 'qr-code' ).innerHTML.toString()
  let qrOuter = document.getElementById( 'qr-code' ).cloneNode( false ).outerHTML

  console.log( qrOuter )
  console.log( qrInner )

  let svgConcat = '<rect width="100%" height="100%" fill="#ffffff"></rect><path fill="#000000" d="M0 0h7v1H0zM8 0h1v1H8zM11 0h2v1H11zM14 0h2v1H14zM19 0h1v1H19zM21 0h1v1H21zM23 0h1v1H23zM26,0 h7v1H26zM0 1h1v1H0zM6 1h1v1H6zM9 1h2v1H9zM13 1h3v1H13zM20 1h2v1H20zM26 1h1v1H26zM32,1 h1v1H32zM0 2h1v1H0zM2 2h3v1H2zM6 2h1v1H6zM10 2h4v1H10zM18 2h1v1H18zM21 2h2v1H21zM24 2h1v1H24zM26 2h1v1H26zM28 2h3v1H28zM32,2 h1v1H32zM0 3h1v1H0zM2 3h3v1H2zM6 3h1v1H6zM14 3h1v1H14zM17 3h4v1H17zM22 3h1v1H22zM24 3h1v1H24zM26 3h1v1H26zM28 3h3v1H28zM32,3 h1v1H32zM0 4h1v1H0zM2 4h3v1H2zM6 4h1v1H6zM8 4h2v1H8zM11 4h6v1H11zM19 4h1v1H19zM21 4h1v1H21zM23 4h1v1H23zM26 4h1v1H26zM28 4h3v1H28zM32,4 h1v1H32zM0 5h1v1H0zM6 5h1v1H6zM8 5h3v1H8zM13 5h1v1H13zM16 5h1v1H16zM26 5h1v1H26zM32,5 h1v1H32zM0 6h7v1H0zM8 6h1v1H8zM10 6h1v1H10zM12 6h1v1H12zM14 6h1v1H14zM16 6h1v1H16zM18 6h1v1H18zM20 6h1v1H20zM22 6h1v1H22zM24 6h1v1H24zM26,6 h7v1H26zM10 7h2v1H10zM13 7h2v1H13zM18 7h1v1H18zM20 7h2v1H20zM1 8h7v1H1zM9 8h4v1H9zM14 8h2v1H14zM17 8h2v1H17zM22 8h1v1H22zM24 8h1v1H24zM27 8h2v1H27zM32,8 h1v1H32zM0 9h3v1H0zM4 9h2v1H4zM7 9h8v1H7zM16 9h1v1H16zM19 9h3v1H19zM23 9h1v1H23zM26 9h1v1H26zM29 9h2v1H29zM32,9 h1v1H32zM0 10h2v1H0zM5 10h3v1H5zM9 10h3v1H9zM13 10h1v1H13zM16 10h3v1H16zM20 10h3v1H20zM24 10h1v1H24zM28 10h1v1H28zM30 10h2v1H30zM1 11h3v1H1zM5 11h1v1H5zM7 11h1v1H7zM9 11h1v1H9zM11 11h1v1H11zM13 11h1v1H13zM18 11h1v1H18zM20 11h2v1H20zM25 11h2v1H25zM28 11h3v1H28zM32,11 h1v1H32zM0 12h1v1H0zM3 12h2v1H3zM6 12h2v1H6zM9 12h1v1H9zM11 12h6v1H11zM18 12h3v1H18zM24 12h2v1H24zM27 12h3v1H27zM31,12 h2v1H31zM0 13h1v1H0zM3 13h1v1H3zM5 13h1v1H5zM7 13h1v1H7zM9 13h3v1H9zM13 13h2v1H13zM17 13h3v1H17zM22 13h2v1H22zM26 13h1v1H26zM29 13h1v1H29zM31,13 h2v1H31zM1 14h4v1H1zM6 14h2v1H6zM10 14h2v1H10zM16 14h3v1H16zM20 14h3v1H20zM24 14h3v1H24zM28 14h2v1H28zM31 14h1v1H31zM1 15h1v1H1zM7 15h2v1H7zM10 15h1v1H10zM13 15h1v1H13zM15 15h1v1H15zM18 15h1v1H18zM20 15h2v1H20zM27 15h1v1H27zM29 15h2v1H29zM0 16h1v1H0zM2 16h2v1H2zM5 16h3v1H5zM9 16h2v1H9zM13 16h6v1H13zM22 16h2v1H22zM25 16h1v1H25zM27 16h3v1H27zM32,16 h1v1H32zM0 17h4v1H0zM8 17h1v1H8zM10 17h1v1H10zM13 17h1v1H13zM19 17h2v1H19zM23 17h1v1H23zM26 17h2v1H26zM29 17h2v1H29zM32,17 h1v1H32zM2 18h5v1H2zM8 18h1v1H8zM10 18h1v1H10zM12 18h1v1H12zM17 18h1v1H17zM20 18h1v1H20zM22 18h1v1H22zM24 18h1v1H24zM28 18h1v1H28zM30 18h1v1H30zM0 19h1v1H0zM5 19h1v1H5zM7 19h2v1H7zM11 19h2v1H11zM14 19h1v1H14zM17 19h1v1H17zM21 19h2v1H21zM25 19h1v1H25zM28 19h4v1H28zM0 20h1v1H0zM2 20h1v1H2zM4 20h1v1H4zM6 20h1v1H6zM8 20h2v1H8zM15 20h1v1H15zM17 20h2v1H17zM20 20h1v1H20zM22 20h1v1H22zM24 20h2v1H24zM28 20h2v1H28zM0 21h2v1H0zM3 21h1v1H3zM10 21h1v1H10zM13 21h3v1H13zM17 21h3v1H17zM21 21h1v1H21zM23 21h1v1H23zM26 21h1v1H26zM30 21h1v1H30zM32,21 h1v1H32zM0 22h1v1H0zM4 22h6v1H4zM11 22h1v1H11zM13 22h6v1H13zM20 22h3v1H20zM25 22h1v1H25zM28 22h1v1H28zM31 22h1v1H31zM0 23h1v1H0zM4 23h1v1H4zM7 23h4v1H7zM12 23h1v1H12zM14 23h4v1H14zM20 23h3v1H20zM25 23h1v1H25zM28 23h3v1H28zM32,23 h1v1H32zM0 24h1v1H0zM2 24h3v1H2zM6 24h4v1H6zM13 24h7v1H13zM23 24h6v1H23zM31,24 h2v1H31zM8 25h1v1H8zM10 25h1v1H10zM14 25h1v1H14zM19 25h2v1H19zM24 25h1v1H24zM28 25h1v1H28zM30,25 h3v1H30zM0 26h7v1H0zM8 26h1v1H8zM10 26h3v1H10zM17 26h2v1H17zM20 26h2v1H20zM23 26h2v1H23zM26 26h1v1H26zM28 26h1v1H28zM30 26h1v1H30zM0 27h1v1H0zM6 27h1v1H6zM8 27h1v1H8zM11 27h2v1H11zM17 27h1v1H17zM21 27h4v1H21zM28 27h1v1H28zM30 27h2v1H30zM0 28h1v1H0zM2 28h3v1H2zM6 28h1v1H6zM8 28h1v1H8zM10 28h1v1H10zM13 28h2v1H13zM16 28h5v1H16zM22 28h1v1H22zM24 28h6v1H24zM0 29h1v1H0zM2 29h3v1H2zM6 29h1v1H6zM8 29h2v1H8zM14 29h1v1H14zM16 29h1v1H16zM18 29h2v1H18zM23 29h3v1H23zM27 29h4v1H27zM32,29 h1v1H32zM0 30h1v1H0zM2 30h3v1H2zM6 30h1v1H6zM8 30h4v1H8zM13 30h1v1H13zM15 30h2v1H15zM18 30h1v1H18zM22 30h1v1H22zM24 30h1v1H24zM26 30h2v1H26zM29 30h1v1H29zM0 31h1v1H0zM6 31h1v1H6zM8 31h1v1H8zM11 31h2v1H11zM16 31h3v1H16zM20 31h2v1H20zM25 31h4v1H25zM30 31h1v1H30zM0 32h7v1H0zM9 32h4v1H9zM16 32h3v1H16zM22 32h1v1H22zM24 32h1v1H24zM26 32h3v1H26zM31 32h1v1H31z"></path>'
  // let svgConcat = '<svg  xmlns = \'http://www.w3.org/2000/svg\' viewBox = \'0 0 33 33\'>' + qrInner + '</svg>'

  console.log( svgConcat )

  // badgePdf.addSvgAsImage( qrInner, 1, 1, 1, 1, 'svgBadge', 'NONE', 0 )
  // badgePdf.rect( 0, 0, 4, 3, 'F' ).setFillColor( '#ffe5e5' )
  badgePdf.text( 'Employer', 0.125, 0.3 )
  badgePdf.text( 'My Name', 0.125, 0.875 )
  badgePdf.text( 'Position', 0.125, 2.875 )
  badgePdf.save( 'two-by-four.pdf' )
}


</script>
