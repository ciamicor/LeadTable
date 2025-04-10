<template>
  <div class="row --gap-24">
    <div class="row">
      <router-link
        class="button --primary"
        to="/print-badges">
        View All Badges
      </router-link>
    </div>
    <div ref="componentRef">
      <div
        class="badges-grid-container"
      >
        <div
          class="badge-wrapper"
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

        <div
          class="col-12-300 --p-h-16"
          style="grid-row: span 3;"
        >
          <h2>Attendee Information</h2>
          <p>All fields are required.</p>
          <label for="name-first">
            <input id="name-first "
                   v-model="attendee.name_First"
                   name="name-first"
                   placeholder="First Name"
                   type="text">
          </label>
          <label for="name-last">
            <input id="name-last"
                   v-model="attendee.name_Last"
                   name="name-last"
                   placeholder="Last Name"
                   type="text">
          </label>
          <label for="employer">
            <input id="employer"
                   v-model="attendee.contact_Employer"
                   name="employer"
                   placeholder="Employer"
                   type="text"></label>
          <label for="title">
            <input id="title"
                   v-model="attendee.title"
                   name="title"
                   placeholder="Position/Title"
                   type="text">
          </label>
          <label for="title">
            <input id="title"
                   v-model="attendee.contact_Email"
                   name="title"
                   placeholder="Email Address"
                   type="email">
          </label>
          <label for="phone">
            <input id="phone"
                   v-model="attendee.contact_Phone"
                   name="phone"
                   placeholder="Phone Number"
                   type="tel">
          </label>
          <label for="reg-type">
            <select id="reg-type"
                    v-model="attendee.reg_Type"
                    name="reg-type"
            >
              <option disabled="disabled"
                      selected
                      value="">Choose Registration Type
              </option>
              <option value="Attendee">Attendee</option>
              <option value="Exhibitor">Exhibitor</option>
              <option value="Both">Both</option>
            </select>
          </label>
          <label for="reg-type">
            <select id="reg-type"
                    v-model="attendee.tech_Sem"
                    name="reg-type"
            >
              <option disabled="disabled"
                      selected
                      value="">Chose Tech Seminars
              </option>
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
          </label>

          <button v-if="!showQr"
                  class="--success"
                  @click="createAttendee(attendee)">
            Generate QR Code
          </button>
          <button v-if="showQr"
                  class="--secondary"
                  @click="handlePrint">
            Print
          </button>
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
