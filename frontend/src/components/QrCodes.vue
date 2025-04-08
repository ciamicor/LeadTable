<template>
  <div class="row --gap-24">
    <div
      v-for="(lead, index) in attendeeList"
      :key="index"
      class="col-1"
    >
      <QrCode
        :size="215"
        :url-value="lead.id.toString()"
      ></QrCode>
      <span class="row --items">
        <p>{{ lead.name_First }}
        {{ lead.name_Last }}</p>
      </span>
    </div>
  </div>
</template>


<script lang="ts"
        setup>
import QrCode from '@/components/QrCode.vue'
import { onBeforeMount, ref } from 'vue'
import { getAllAttendees_Service } from '@/services/AttendeeDataService.ts'

const attendeeList = ref()

async function getAllAttendees(l: object) {
  await getAllAttendees_Service(l)
  console.log('attendees', l)
}

onBeforeMount(() => {
  getAllAttendees(attendeeList)
})

</script>
