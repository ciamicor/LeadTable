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
  <td v-for="(a, index) in attendee.customFields"
      :key="index"
      :title="formattedField">
    {{ formatCustomFields(a) }}
  </td>
</template>

<script lang="ts"
        setup>
import { ref, defineEmits, onBeforeMount } from "vue"
import AttendeeEditModal from "@/components/attendee/AttendeeEditModal.vue"

const props = defineProps({
  attendee: {type: Object, default: () => ({}), required: true},
  rowNum: {type: Number, default: 0},
  toggleModal: {}
})

defineEmits(["deleteAttendee"])
const modalVisible = ref(false)

function toggleModal() {
  modalVisible.value = !modalVisible.value
}

const formattedField = ref()

onBeforeMount(() => {})

function formatCustomFields(o: object) {
  let array = Object.values(o)
  let output = ""
  let x = 0
  while (array.length > x) {
    // if only one item
    if (array.length === 1) {
      output += array[x] + " "
    }
    // for last item
    else if (x === array.length - 1) {
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

</script>
