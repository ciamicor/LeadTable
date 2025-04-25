<template>

  <div class="row-12-300 --place-content-center">
    <div class="col-12-300 col-8-600 col-6-800">
      <h1>Upload Attendees</h1>
      <p>Add attendee data that was registered on another service.</p>
      <p>.xlsx file must match the template provided.</p>
      <input id="input_dom_element"
             type="file"
             @change="handleFileAsync($event)">
    </div>
  </div>
</template>

<script lang="ts"
        setup>
import {ref} from "vue";
import {read, utils, writeFile} from 'xlsx'
import {createAttendee_Service} from '@/services/AttendeeDataService.ts'
import {useExpoLocalStore} from "@/stores.ts";

const expoLocalData = useExpoLocalStore()
const status = ref(false)

async function handleFileAsync(e: any) {
  status.value = true
  const file = e.target.files[0]
  console.log(file, e)
  const data = await file.arrayBuffer()
  const workbook = read(data)
  const worksheet = workbook.Sheets[workbook.SheetNames[0]]
  const jsonData = utils.sheet_to_json(worksheet)

  console.log(jsonData)

  jsonData.forEach(e => {
    createAttendee_Service(e, expoLocalData.expo_Client, expoLocalData.expo_Client)
  })
  status.value = false
}
</script>
