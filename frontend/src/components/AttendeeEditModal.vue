<template>
  <!--  <div>-->
  <div v-show="visible"
       class="modal-backdrop">
    <div class="modal-wrapper">
      <div
        class="modal-content col-12-300">
        <h2>Editing {{ `${attendeeLocal.name_First} ${attendeeLocal.name_Last}` }}</h2>
        <div class="row-12-300">
          <span>ID# {{ attendeeLocal.id }}</span>
          <span>{{ attendee.createdAt }}</span>
        </div>
        <div id="details"
             class="col-12-300">
          <div class="row-12-300">
            <label>
              First Name
              <input id="name_First"
                     v-model="attendeeLocal.name_First"
              />
            </label>
            <label>
              Last Name
              <input id="name_Last"
                     v-model="attendeeLocal.name_Last"/>
            </label>
          </div>
          <label>
            Title
            <input id="title"
                   v-model="attendeeLocal.title">
          </label>
          <label>
            Company
            <input id="company"
                   v-model="attendeeLocal.contact_Employer">
          </label>
        </div>
        <div id="contact"
             class="col-12-300">
          <label>
            <span><i class="bi-chat-left-dots --p-r-2"/> Email</span>
            <input id="email"
                   v-model="attendeeLocal.contact_Email"/>
          </label>
          <label>
            <span><i class="bi-telephone-outbound --p-r-2"/> Phone</span>
            <input id="phone"
                   v-model="attendeeLocal.contact_Phone"/>
          </label>
          <label class="row-12-300">
            <span class="--flex-basis-100">Your Address</span>
            <input
              v-model="attendeeLocal.address_Line1"
              autocomplete="address-line1"
              class="--w-45"
              name="address"
              placeholder="Address"
              type="text"/>
            <input
              v-model="attendeeLocal.address_Line2"
              autocomplete="address-line2"
              class="--w-45"
              name="address"
              placeholder="Apt, Suite, etc"
              type="text"/>
            <input
              v-model="attendeeLocal.address_City"
              autocomplete="address-level2"
              name="city"
              placeholder="City"
              type="text"/>
            <input
              v-model="attendeeLocal.address_State"
              autocomplete="address-level1"
              name="state"
              placeholder="State/Province"
              type="text"/>
            <input
              v-model="attendeeLocal.address_Zip"
              autocomplete="postal-code"
              name="zip"
              placeholder="Zip/Postal Code"
              type="text"/>
            <select id="selectCountry"
                    v-model="attendeeLocal.address_Country"
                    autocomplete="country-name"
                    name="selectCountry">
              <option disabled
                      selected
                      value="">Select Country
              </option>
              <option v-for="(c, index) in countryCodes"
                      :key="index"
                      :value="c.code"
              >
                {{ c.name }}
              </option>
            </select>
          </label>
        </div>
        <div class="row-12-300 --place-content-space-between --place-items-space-between --p-t-6-clamp">
          <button class="col-12-300 col-6-500 col-5-800"
                  @click="cancelEdit()">Cancel
          </button>
          <button class="--primary--invert col-12-300 col-6-500 col-5-800"
                  @click="updateAttendee()">
            Save Changes
          </button>
        </div>

      </div>
    </div>
  </div>
</template>
<script lang="ts"
        setup>
import { defineProps, defineEmits, ref, onBeforeMount, reactive, watch } from "vue";
import { updateAttendee_Service } from "@/services/AttendeeDataService.ts";
import { countryCodes } from "@/services/addresses/AddressForm_Countries.ts";

const emit = defineEmits(["showModal", "update:attendee"]);
const props = defineProps({
  attendee: {type: Object, default: () => {}},
  visible: {type: Boolean, default: false}
})
const attendeeLocal = reactive(
  {
    id: props.attendee.id,
    name_First: props.attendee.name_First,
    name_Last: props.attendee.name_Last,
    contact_Email: props.attendee.contact_Email,
    contact_Phone: props.attendee.contact_Phone,
    title: props.attendee.title,
    contact_Employer: props.attendee.contact_Employer,
    address_Line1: props.attendee.address_Line1,
    address_Line2: props.attendee.address_Line2,
    address_City: props.attendee.address_City,
    address_State: props.attendee.address_State,
    address_Zip: props.attendee.address_Zip,
    address_Country: props.attendee.address_Country
  }
);

async function updateAttendee() {
  emit("showModal")
  props.attendee.name_First = attendeeLocal.name_First
  props.attendee.name_Last = attendeeLocal.name_Last
  props.attendee.contact_Email = attendeeLocal.contact_Email
  props.attendee.contact_Phone = attendeeLocal.contact_Phone
  props.attendee.title = attendeeLocal.title
  props.attendee.contact_Employer = attendeeLocal.contact_Employer
  props.attendee.address_Line1 = attendeeLocal.address_Line1
  props.attendee.address_Line2 = attendeeLocal.address_Line2
  props.attendee.address_City = attendeeLocal.address_City
  props.attendee.address_State = attendeeLocal.address_State
  props.attendee.address_Zip = attendeeLocal.address_Zip
  props.attendee.address_Country = attendeeLocal.address_Country
  await updateAttendee_Service(attendeeLocal.id, attendeeLocal)
}

function cancelEdit() {
  emit("showModal")
  attendeeLocal.name_First = props.attendee.name_First
  attendeeLocal.name_Last = props.attendee.name_Last
  attendeeLocal.contact_Email = props.attendee.contact_Email
  attendeeLocal.contact_Phone = props.attendee.contact_Phone
  attendeeLocal.title = props.attendee.title
  attendeeLocal.contact_Employer = props.attendee.contact_Employer
  attendeeLocal.address_Line1 = props.attendee.address_Line1
  attendeeLocal.address_Line2 = props.attendee.address_Line2
  attendeeLocal.address_City = props.attendee.address_City
  attendeeLocal.address_State = props.attendee.address_State
  attendeeLocal.address_Zip = props.attendee.address_Zip
  attendeeLocal.address_Country = props.attendee.address_Country
}

</script>
