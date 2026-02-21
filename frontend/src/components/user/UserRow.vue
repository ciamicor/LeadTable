<template>
  <!--  <AttendeeEditModal :attendee="attendee"
                       :visible="modalVisible"
                       @show-modal="toggleModal"
    />-->
  <!--  <div class="table-edit-buttons">
      <button
        class="&#45;&#45;p-4"
        @click="toggleModal">
        <i class="bi-pencil"></i>
      </button>
      <button
        class="&#45;&#45;p-4 &#45;&#45;warn&#45;&#45;invert"
        @click="$emit('deleteAttendee')">
        <i class="bi-trash3"></i>
      </button>
    </div>-->

  <!--  <td :title="user.createdAt">{{
        new Date(user.createdAt)
          .toLocaleTimeString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "numeric",
            minute: "2-digit"
          })
                                }}
    </td>-->
  <td :title="user.name">{{ user.name }}</td>
  <td :title="user.email">{{ user.email }}</td>
  <!--  <td v-for="(a, index) in user.customFields"
        :key="index"
        :title="formattedField">
      {{ formatCustomFields(a) }}
    </td>-->
</template>

<script lang="ts"
        setup>
import { ref, defineEmits, onBeforeMount } from "vue"
import AttendeeEditModal from "@/components/attendee/AttendeeEditModal.vue"

const props = defineProps({
  user: {type: Object, default: () => ({}), required: true},
  rowNum: {type: Number, default: 0},
  toggleModal: {}
})

defineEmits(["deleteUser"])
const modalVisible = ref(false)

function toggleModal() {
  modalVisible.value = !modalVisible.value
}

const formattedField = ref()

/*function formatCustomFields(o: object) {
  let array = Object.values(o)
  let output = ""
  let x = 0
  while (array.length > x) {
    output += array[x] + ", "
    x++
  }
  formattedField.value = output
  return output
}*/

</script>
