<template>
  <!--  <div>-->
  <div v-if="visible"
       class="modal-backdrop">
    <div class="modal-wrapper">
      <div
        class="modal-content col-12-300">
        <h2>Badge Edit</h2>
        <div id="details"
             class="col-12-300">
          <div class="row-12-300">
            <label>
              First Name
              <input id="name_First"
                     v-model="attendeeFName"/>
            </label>
            <label>
              Last Name
              <input id="name_Last"
                     v-model="attendeeLName"/>
            </label>
          </div>
          <label>
            Title
            <input id="title"
                   v-model="attendeeTitle">
          </label>
          <label>
            Company
            <input id="company"
                   v-model="attendeeContact_Employer">
          </label>
        </div>
        <div id="contact"
             class="col-12-300">
          <label>
            <span><i class="bi-chat-left-dots --p-r-2"/> Email</span>
            <input id="email"
                   v-model="attendeeContact_Email"/>
          </label>
          <label>
            <span><i class="bi-telephone-outbound --p-r-2"/> Phone</span>
            <input id="phone"
                   v-model="attendeeContact_Phone"/>
          </label>
          <label class="row-12-300">
            <span class="--flex-basis-100">Your Address</span>
            <input
              v-model="attendeeAddress.address_Line1"
              autocomplete="address-line1"
              class="--w-45"
              name="address"
              placeholder="Address"
              type="text"/>
            <input
              v-model="attendeeAddress.address_Line2"
              autocomplete="address-line2"
              class="--w-45"
              name="address"
              placeholder="Apt, Suite, etc"
              type="text"/>
            <input
              v-model="attendeeAddress.address_City"
              autocomplete="address-level2"
              name="city"
              placeholder="City"
              type="text"/>
            <input
              v-model="attendeeAddress.address_State"
              autocomplete="address-level1"
              name="state"
              placeholder="State/Province"
              type="text"/>
            <input
              v-model="attendeeAddress.address_Zip"
              autocomplete="postal-code"
              name="zip"
              placeholder="Zip/Postal Code"
              type="text"/>
            <select id="selectCountry"
                    v-model="attendeeAddress.address_Country"
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
                {{c}}
              </option>
            </select>
          </label>
        </div>
        <div class="row-12-300 --place-content-space-between --place-items-space-between --p-t-6-clamp">
          <button class="col-12-300 col-6-500 col-5-800"
                  @click="$emit('showModal')">Cancel
          </button>
          <button class="--primary--invert col-12-300 col-6-500 col-5-800"
                  @click="updateAttendee(); $emit('showModal')">
            Save Changes
          </button>
        </div>

      </div>
    </div>
  </div>
</template>
<script lang="ts"
        setup>
import { defineProps, computed, defineEmits, ref, onBeforeMount } from "vue";
import { updateAttendee_Service } from "@/services/AttendeeDataService.ts";
import { countries } from "@/services/addresses/AddressForm_Countries.ts";

const emit = defineEmits(["showModal"]);

const props = defineProps({
  attendee: {
    type: Object, default: () => {
    }
  },
  visible: {type: Boolean, default: false},
})

const attendeeLocal = ref(props.attendee)
const attendeeFName = ref(props.attendee.name_First)
const attendeeLName = ref(props.attendee.name_Last)
const attendeeContact_Email = ref(props.attendee.contact_Email)
const attendeeContact_Phone = ref(props.attendee.contact_Phone)
const attendeeContact_Employer = ref(props.attendee.contact_Employer)
const attendeeAddress = ref({
  address_Line1: props.attendee.address_Line1,
  address_Line2: props.attendee.address_Line2,
  address_City: props.attendee.address_City,
  address_State: props.attendee.address_State,
  address_Zip: props.attendee.address_Zip,
  address_Country: props.attendee.address_Country,
})
const attendeeTitle = ref(props.attendee.title)

async function updateAttendee() {
  let data = {
    name_First: attendeeFName.value,
    name_Last: attendeeLName.value,
    contact_Email: attendeeContact_Email.value,
    contact_Phone: attendeeContact_Phone.value,
    contact_Employer: attendeeContact_Employer.value,
    address: attendeeAddress.value,
    address_Line1: attendeeAddress.value.address_Line1,
    address_Line2: attendeeAddress.value.address_Line2,
    address_City: attendeeAddress.value.address_City,
    address_State: attendeeAddress.value.address_State,
    address_Zip: attendeeAddress.value.address_Zip,
    address_Country: attendeeAddress.value.address_Country,
    title: attendeeTitle.value,
  }
  await updateAttendee_Service(attendeeLocal.value.id, data)
}

</script>
