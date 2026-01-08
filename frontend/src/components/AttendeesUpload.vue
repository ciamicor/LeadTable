<template>

  <div class="row-12-300 --place-content-center">
    <div class="col-12-300 --align-items-start --gap-12 --max-w-600">
      <h1>Upload Attendees</h1>
      <div class="col-12-300">
        <h4>For {{ expoLocal.expo_Client }} {{ expoLocal.expo_Year }} Supplier's Day</h4>
        <button class="--p-h-4 --p-v-2 --secondary --align-self-start"
                @click="downloadTemplate()">
          <i class="bi-download --m-r-4"/>
          Download Template
        </button>
        <p>Add attendee data that was registered on another service.
           Uploaded .xlsx
           file must
           match the template.</p>
      </div>
      <div class="col-12-300">
        <label>
          Upload Title
          <input id="title"
                 v-model="uploadTitle"
                 name="title"
                 type="text">
        </label>
        <label>
          Upload Sheet
          <input id="input_dom_element"
                 class="--flex-grow"
                 type="file"
                 @change="handleFileAsync($event)"
          >
        </label>
        <!--        <button class="&#45;&#45;success &#45;&#45;flex-grow">
                  <i class="bi-upload &#45;&#45;m-r-4"/>
                  Upload
                </button>-->
      </div>
    </div>
  </div>
</template>

<script lang="ts"
        setup>
import { ref } from "vue";
import { read, utils, writeFile } from 'xlsx'
import { createAttendee_Service } from '@/services/AttendeeDataService.ts'
import { useExpoLocalStore, useExhibitorLocalStore } from "@/stores.ts";
import { createUpload_Service, getAttendeeUploads_Service } from '@/services/UploadDataService.ts'

const companyLocal = useExhibitorLocalStore()
const expoLocal = useExpoLocalStore()
const currentUpload = ref()
const status = ref(false)
const uploadTitle = ref(new Date().toLocaleString())

/*-| Create Upload |-*/
async function createUpload(client: any, year: any, title: string) {
  currentUpload.value = await createUpload_Service(client, year, title)
}

/*-| Upload Attendees |-*/
/*---+----+---+----+---+----+---+----+---*/
async function handleFileAsync(e: any) {
  status.value = true
  const file = e.target.files[0]
  console.log(file, e)
  const data = await file.arrayBuffer()
  const workbook = read(data)
  const worksheet = workbook.Sheets[workbook.SheetNames[0]]
  const jsonData = utils.sheet_to_json(worksheet)

  console.log(jsonData)

  await createUpload(expoLocal.expo_Client, expoLocal.expo_Year, uploadTitle.value)

  jsonData.forEach(e => {
    createAttendee_Service(e, expoLocal.expo_Client, expoLocal.expo_Year, currentUpload.value.id)
  })
  status.value = false
}

/*-| Download Template |-*/
/*---+----+---+----+---+----+---+----+---*/
async function downloadTemplate() {
  const formattedLeads = [
    {
      "": "",
      "": "",
      "": "",
      "": "",
      "": "",
      "": "",
      "": "",
      "": "",
      "": "",
      "": "",
      "": "",
      "": "",
      "": "",
      "": "",
    }
  ]
  const worksheet = utils.json_to_sheet(formattedLeads)
  const workbook = utils.book_new()
  utils.book_append_sheet(workbook, worksheet, `Upload Template`)
  utils.sheet_add_aoa(worksheet, [
    [
      'name_First',
      'name_Last',
      'title',
      'contact_Email',
      'contact_Phone',
      'contact_Employer',
      'regType',
      'techSessions',
      'address_Line1',
      'address_Line2',
      'address_City',
      'address_State',
      'address_Zip',
      'address_Country',
    ]
  ], {origin: 'A1'})
  writeFile(workbook, 'leadtable-upload-template.xlsx', {compression: true})
}
</script>
