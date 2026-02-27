<template>
  <AttendeeEditModal :attendee="attendee"
                     :visible="modalVisible"
                     @show-modal="toggleModal"
  />
  <div class="table-edit-buttons">
    <button
      class="--p-4"
      @click="toggleModal">
      <i class="bi-pencil"></i>
    </button>
    <button
      class="--p-4 --warn--invert"
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
      v-if="customFields"
      :key="index"
      :title="formattedField">
    {{ formatCustomFields(c, attendee.customFields) }}
  </td>
</template>

<script lang="ts"
        setup>
import { ref, defineEmits, onBeforeMount } from "vue"
import { getCustomFields_Service } from "@/services/CustomFieldsDataService.ts"
import AttendeeEditModal from "@/components/attendee/AttendeeEditModal.vue"
import { custom } from "better-auth"

const props = defineProps({
  attendee: {type: Object, default: () => ({}), required: true},
  rowNum: {type: Number, default: 0},
  customFields: {type: Object, default: () => ({}), required: true},
  toggleModal: {}
})

defineEmits(["deleteAttendee"])
const modalVisible = ref(false)

function toggleModal() {
  modalVisible.value = !modalVisible.value
}

const formattedField = ref()

onBeforeMount(() => {})

function formatCustomFieldsX(c: object, o: object) {
  let array = Object.values(o)
  let output = ""
  let x = 0
  while (array.length > x) {
    // if only one item, or last item
    if (array.length === 1 || x === array.length - 1) {
      output += array[x]
    }
    // for middle items
    else {
      output += array[x] + ", "
    }
    x++
  }
  formattedField.value = output
  return output
}

// Runs once for each custom field related to the event.
// If no custom fields match, it returns null.
function formatCustomFields(c: object, a: object) {
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
      let x = 0
      while (values.length > x && values[x] !== false) {
        // if only one item, or last item
        if (values.length === 1 || x === values.length - 1) {
          output += values[x]
        }
        // for middle items
        else {
          output += values[x] + ", "
        }
        x++
      }
    }
    else {
      output += ""
    }
  }
  console.log("Formatted Output: " + output)
  formattedField.value = output
  return output
}

</script>
