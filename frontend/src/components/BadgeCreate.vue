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
          <option value="1">Yes</option>
          <option value="0">No</option>
        </select>
      </label>

      <button v-if="!showQr"
              class="--success --m-t-12"
              @click="createAttendee(attendee)">
        Submit Registration
      </button>
      <button v-if="showQr"
              class="--secondary"
              @click="handlePrint">
        Print
      </button>
    </div>

    <div ref="componentRef"
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
import { useVueToPrint } from 'vue-to-print'
import QrCode from '@/components/QrCode.vue'
import { onBeforeMount, ref } from 'vue'
import { createAttendee_Service } from '@/services/AttendeeDataService.ts'
import { useCompanyLocalStore } from '@/main.js'

const companyLocalData = useCompanyLocalStore()

/*-| Print Component |-*/
const componentRef = ref()

/*-| Attendees |-*/
/*/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/*/
const showQr = ref( false )
const attendeeId = ref()
const attendee = ref( {
  expo_Year: companyLocalData.expo_Year,
  expo_Client: companyLocalData.expo_Client,
  name_First: '',
  name_Last: '',
  contact_Email: '',
  contact_Phone: '',
  contact_Employer: '',
  title: '',
  reg_Type: '',
  tech_Sem: ''
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
const { handlePrint } = useVueToPrint( {
  content: componentRef,
  documentTitle: 'Badges'
} )


</script>
