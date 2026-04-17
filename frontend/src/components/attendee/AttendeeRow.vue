<template>
  <AttendeeEditModal :attendee="attendee"
                     :visible="modalVisible"
                     @show-modal="toggleModal"
  />
  <div class="table-edit-buttons">
    <button
      class="--p-4"
      title="Edit attendee"
      @click="toggleModal">
      <i class="bi-pencil"></i>
    </button>
    <button
      class="--p-4"
      title="Resend confirmation email"
      @click="resendConfirmation">
      <i class="bi-envelope"></i>
    </button>
    <button
      class="--p-4 --warn--invert"
      title="Delete attendee"
      @click="$emit('deleteAttendee')">
      <i class="bi-trash3"></i>
    </button>
  </div>

  <td>{{ rowNum }}</td>
  <td :title="attendee.createdAt">{{
      new Date(attendee.createdAt)
        .toLocaleTimeString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "numeric",
          minute: "2-digit"
        })
                                  }}
  </td>
  <td :title="attendee.id">{{ attendee.id }}</td>
  <td :title="attendee.expo_Year">{{ attendee.expo_Year }}</td>
  <td :title="attendee.expo_Client">{{ attendee.expo_Client }}</td>
  <td :title="attendee.name_First">{{ attendee.name_First }}</td>
  <td :title="attendee.name_Last">{{ attendee.name_Last }}</td>
  <td :title="attendee.contact_Email">{{ attendee.contact_Email }}</td>
  <td :title="attendee.contact_Phone">{{ attendee.contact_Phone }}</td>
  <td :title="attendee.title">{{ attendee.title }}</td>
  <td :title="attendee.contact_Employer">{{ attendee.contact_Employer }}</td>
  <td :title="attendee.address_Line1">{{ attendee.address_Line1 }}</td>
  <td :title="attendee.address_Line2">{{ attendee.address_Line2 }}</td>
  <td :title="attendee.address_City">{{ attendee.address_City }}</td>
  <td :title="attendee.address_State">{{ attendee.address_State }}</td>
  <td :title="attendee.address_Zip">{{ attendee.address_Zip }}</td>
  <td :title="attendee.address_Country">{{ attendee.address_Country }}</td>
  <td v-for="(c, index) in customFields"
      :key="index"
  >
    {{ formatCustomFields(c, attendee.customFields) }}
  </td>
</template>

<script lang="ts"
        setup>
import { ref, defineEmits } from "vue"
import { sendRegConfirmEmail_Service } from "@/services/emails/RegistrationEmailService.ts"
import AttendeeEditModal from "@/components/attendee/AttendeeEditModal.vue"
import { useStatusStore } from "@/stores/status.ts"

const props = defineProps({
  attendee: {type: Object, default: () => ({}), required: true},
  event: {type: Object, default: () => ({}), required: true},
  rowNum: {type: Number, default: 0},
  customFields: {type: Object, default: () => ({}), required: true},
  toggleModal: {}
})

defineEmits(["deleteAttendee"])
const modalVisible = ref(false)

const statusStore = useStatusStore()
const formattedField = ref()

function toggleModal() {
  modalVisible.value = !modalVisible.value
}

// Runs once for each custom field related to the event.
// If no custom fields match, it returns null.
function formatCustomFields(c: { displayTitle: string }, a: any) {
  let output = ""
  // if no field values, quit this function.
  if (!a) {
    return
  }
  const attendeeKeys = Object.keys(a)
  const title = c.displayTitle
  for (let i = 0; i < attendeeKeys.length; i++) {
    // If Attendee has values for this field, format them into a string.
    if (title === attendeeKeys[i]) {
      const values = Object.values(a[title])
      for (let x = 0; values.length > x && values[x] !== false; x++) {
        // if only one item, or last item
        if (values.length === 1 || x === values.length - 1) {
          output += values[x]
        }
        // for middle items
        else {
          output += values[x] + ", "
        }
      }
    }
    else {
      output += ""
    }
  }
  // console.log("Formatted Output: " + output)
  formattedField.value = output
  return output
}

/*-| Resend Confirmation Email
==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/*/
async function resendConfirmation() {
  statusStore.statusGlobal = `Sending confirmation email to ${props.attendee.contact_Email}...`
  if (window.confirm(`Resend confirmation email to ${props.attendee.name_First} at ${props.attendee.contact_Email}?`)) {
    await sendRegConfirmEmail_Service(props.attendee, props.event)
  }
  else {
    console.log("Nevermind, I won't send that confirmation email.")
  }
  statusStore.$reset()
}

</script>
