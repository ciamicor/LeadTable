<template>

  <div class="row">
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
import { read, utils, writeFile } from 'xlsx'
import { createAttendee_Service } from '@/services/AttendeeDataService.ts'

async function handleFileAsync(e: any) {
  const file = e.target.files[0]
  console.log(file, e)
  const data = await file.arrayBuffer()
  const workbook = read(data)
  const worksheet = workbook.Sheets[workbook.SheetNames[0]]
  const jsonData = utils.sheet_to_json(worksheet)

  console.log(jsonData)

  jsonData.forEach(e => {
    createAttendee_Service(e)
  })
}


</script>
