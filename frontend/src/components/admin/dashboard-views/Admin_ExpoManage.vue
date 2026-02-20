<template>
  <div class="row-12-300 --align-items-center">
    <label class="--flex-grow-0"
           for="name">
      Client Name
      <input id="name"
             v-model="eventStore.name"
             type="text">
    </label>
    <label class="--flex-grow-0"
           for="expo-year">
      Expo Year
      <input id="expo-year"
             v-model="eventStore.expo_Year"
             type="number">
    </label>
    <button @click="getAttendees">
      Find Attendees
    </button>
    <span class="--flex-grow-1"/>
    <button class="--success--invert --justify-self-end"
            @click="exportAttendees">
      Export Attendees
    </button>
  </div>

  <div class="table-scroll-wrapper">
    <table class="attendee-table">
      <tbody>
      <tr>
        <th></th>
        <th>#</th>
        <th>Registered On</th>
        <th>ID #</th>
        <th>Year</th>
        <th>Client</th>
        <th colspan="2">Name</th>
        <th>Email</th>
        <th>Phone</th>
        <th>Title</th>
        <th>Employer</th>
        <th>Address Line 1</th>
        <th>Address Line 2</th>
        <th>City</th>
        <th>State</th>
        <th>ZIP</th>
        <th>Country</th>
        <th>Custom Fields</th>
      </tr>
      </tbody>
    </table>
  </div>

</template>

<script lang="ts"
        setup>
import { onMounted, ref } from "vue";
import { deleteAttendee_Service, getExpoAttendees_Service } from "@/services/AttendeeDataService.ts"
import { useEventLocalStore } from "@/stores/event.ts"
import { useStatusStore } from "@/stores/status.ts"
import { utils, writeFile } from "xlsx"
import AttendeeRow from "@/components/admin/dashboard-views/AttendeeRow.vue"

const attendeeList = ref()
const eventStore = useEventLocalStore()
const statusStore = useStatusStore()

onMounted(async () => {
  statusStore.status = "Loading..."
  eventStore.name = "CSIFT"
  eventStore.expo_Year = 2026
  await getAttendees()
  console.log(attendeeList.value)
  statusStore.$reset()
})

async function getAttendees() {
  attendeeList.value = await getExpoAttendees_Service(eventStore.name, eventStore.expo_Year)
}

async function deleteAttendee(i: number, n: string) {
  statusStore.status = "Deleting..."
  if (window.confirm(`Are you sure you'd like to delete ${n}? This cannot be undone.`)) {
    await deleteAttendee_Service(i)
    attendeeList.value = attendeeList.value.filter(a => a.id !== i)
  }
  else {
    console.log("I won't delete that then.")
  }
  statusStore.$reset()
}

async function exportAttendees() {
  const formattedLeads = attendeeList.value
    .map(({
      id,
      expo_Client,
      expo_Year,
      updatedAt,
      upload_Id,
      createdAt,
      ...item
    }) => item)
  const worksheet = utils.json_to_sheet(formattedLeads)
  const workbook = utils.book_new()
  utils.book_append_sheet(workbook, worksheet, `2025 Leads`)
  utils.sheet_add_aoa(worksheet,
    [
      [
        "First Name",
        "Last Name",
        "Title",
        "Email",
        "Phone",
        "Employer",
        "Address Line 1",
        "Address Line 2",
        "City",
        "State",
        "ZIP",
        "Country",
        "Registration Type"
      ]
    ],
    {origin: "A1"})
  writeFile(workbook,
    `${eventStore.name}-${eventStore.expo_Year}-Expo-Attendees.xlsx`,
    {compression: true})
}

</script>
