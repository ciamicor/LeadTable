<template>
  <!--  <div
      style="
  position: fixed;
  top: 0;
  padding: 12px;
  background: #ffffff;
  z-index: 999999999999"
    >
      listLn : {{ listLn }}
      windowSize : {{ windowH }},
      scrollTop : {{ scrollTop }},
      startIndex : {{ startIndex }},
      endIndex : {{ endIndex }},
      rowDisplayNum : {{ rowDisplayAmount }},
      topPad : {{ topPad }}
      bottomPad : {{ bottomPad }}
    </div>-->
  <div class="row-12-300 --align-items-center --m-h-10-clamp --p-b-4-clamp">
    <label class="--flex-grow-0 --m-0"
           for="name">
      <select id="select-client"
              v-model="eventStore.expo_Client"
              name="select-client"
              @change="updateAdminOptions"
      >
        <option
          selected
          value="ASIFT">ASIFT
        </option>
        <option
          selected
          value="CSIFT">CSIFT
        </option>
        <option
          selected
          value="LEIFT">LEIFT
        </option>
        <option
          selected
          value="MNIFT">MNIFT
        </option>
        <option
          value="MWSCC">MWSCC
        </option>
        <option
          value="NYIFT">NYIFT
        </option>
        <option
          value="WNYIFT">WNYIFT
        </option>
      </select>
    </label>
    <label class="--flex-grow-0 --m-0"
           for="expo-year">
      <select id="select-client"
              v-model="eventStore.expo_Year"
              name="select-client"
              @change="updateAdminOptions"
      >
        <option
          selected
          value="2026">2026
        </option>
      </select>
    </label>
    <button id="search-expo"
            :class="searchUpdated ? ' --primary--invert ' : ' --color-grey-7 '"
            @click="getAttendees"
            @keydown.enter="getAttendees">
      Search
    </button>
    <button
      @click="getAttendees"
    >
      <i class="bi-arrow-counterclockwise"></i>
    </button>
    <span class="--flex-grow-1"/>
    <span v-if="attendeeList"
          class="--m-r-4">Total Attendees: {{ attendeeList.length }}</span>
    <button class="--secondary--invert --justify-self-end"
            @click="exportAttendees">
      Export All
    </button>
  </div>
  <div id="scroller-box"
       class="table-scroll-wrapper"
  >
    <!--       @scroll="handleScroll($event)">-->
    <!--    <div
          :style="`height:${topPad}px;`"/>-->
    <table
      v-if="displayList && displayList.length !== 0"
      class="attendee-table">
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
        <th v-for="(f, index) in customFields"
            :key="index">
          {{ f.displayTitle }}
        </th>
      </tr>
      <tr v-for="(attendee, index) in displayList"
          :key="index"
          class="table-attendee-row">
        <AttendeeRow
          :attendee="attendee"
          :custom-fields="customFields"
          :rowNum="index + 1"
          @delete-attendee="deleteAttendee(attendee.id, `${attendee.name_First} ${attendee.name_Last}`)"
        />
      </tr>
      </tbody>
    </table>
    <div v-else-if="statusStore.statusGlobal === '' && displayList"
         class="row-12-300 --place-content-center">
      <p>No attendees are registered for this expo yet.</p>
    </div>
    <!--    <div
          :style="`height:${bottomPad}px;`"/>-->
  </div>
</template>

<script lang="ts"
        setup>
import { onMounted, ref, computed, watch } from "vue";
import { deleteAttendee_Service, getExpoAttendees_Service } from "@/services/AttendeeDataService.ts"
import { useEventLocalStore } from "@/stores/event.ts"
import { useStatusStore } from "@/stores/status.ts"
import { utils, writeFile } from "xlsx"
import AttendeeRow from "@/components/attendee/AttendeeRow.vue"
import { db } from "@/db.ts"
import { getCustomFields_Service } from "@/services/CustomFieldsDataService.ts"
import { getExpo_Service } from "@/services/EventDataService.ts"
import { object } from "better-auth"

const attendeeList = ref()
const displayList = ref()
const eventStore = useEventLocalStore()
const statusStore = useStatusStore()
const searchUpdated = ref(false)

/*const windowH = ref(window.innerHeight - 100)
const rowH = ref(55)*/

const customFields = ref()

/*-|===!===!===!===!===!===!===!===!===!===!===!===!===!===!===!===
-| Virtual Scrolling
// https://dev.to/anishkumar/150-lines-or-less-implementing-virtual-scroll-for-web-from-scratch-4363
-|===!===!===!===!===!===!===!===!===!===!===!===!===!===!===/*/
/*
const scrollTop = ref(0)
const listLn = ref()
const rowDisplayAmount = computed(() => {
  return Math.floor(windowH.value / rowH.value)
})
const scrollBuffer = computed(() => {
  return Math.floor(rowDisplayAmount.value)
})
const startIndex = computed(() => {
  return Math.max(0,
    // Math.floor((scrollTop.value - (scrollBuffer.value * rowH.value)) / rowH.value))
    Math.floor(scrollTop.value / rowH.value))
})
const endIndex = computed(() => {
  return Math.min(listLn.value - 1,
    // Math.floor(startIndex.value + scrollBuffer.value + rowDisplayAmount.value))
    Math.floor(startIndex.value + rowDisplayAmount.value))
})
const topPad = computed(() => {
  return startIndex.value * rowH.value
})
const bottomPad = computed(() => {
  const totalHeight = listLn.value * rowH.value;
  const renderedHeight = (endIndex.value - startIndex.value + 1) * rowH.value;
  return totalHeight - (renderedHeight + topPad.value)
})
// Watch attendee list length
watch(attendeeList, () => {
  listLn.value = attendeeList.value.length
})
// Watch for slice attendee list
watch(startIndex, () => {
  // const a: number = startIndex.value + rowDisplayAmount.value
  displayList.value = attendeeList.value.filter((a: any, index: number) => index > startIndex.value && index < endIndex.value)
})

// On Scroll
function handleScroll(e: any) {
  e.preventDefault();
  setTimeout(() => {scrollTop.value = e.target.scrollTop;}, 100)
  //scrollTop.value = e.target.scrollTop;
  console.log("handled!")
}*/

/*-| Lifecycle
==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/*/
onMounted(async () => {
  statusStore.statusGlobal = "Loading..."
  const d = await db.adminOptions.get(1)
  // Check if local admin options exist, then set or add.
  if (d) {
    db.adminOptions.get(1)
    console.log(db.adminOptions.get(1))
    eventStore.expo_Client = d.clientSelected
    eventStore.expo_Year = d.yearSelected
    await getExpo_Service(eventStore.expo_Client, eventStore.expo_Year, eventStore)
  }
  else if (d === undefined) {
    eventStore.expo_Client = "CSIFT"
    eventStore.expo_Year = 2026
    await db.adminOptions.add({
      id: 1,
      clientSelected: eventStore.expo_Client,
      yearSelected: eventStore.expo_Year,
      lastView: ""
    })
    await getExpo_Service(eventStore.expo_Client, eventStore.expo_Year, eventStore)
  }
  await getAttendees()
  // console.log(attendeeList.value)
  displayList.value = attendeeList.value
  statusStore.$reset()
})

/*-| Admin Functions
==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/*/
async function updateAdminOptions() {
  await db.adminOptions.put({
    id: 1,
    clientSelected: eventStore.expo_Client,
    yearSelected: eventStore.expo_Year,
    lastView: ""
  })
  await getExpo_Service(eventStore.expo_Client, eventStore.expo_Year, eventStore)
  searchUpdated.value = true
  const sButton = document.getElementById("search-expo")
  sButton!.focus();
}

/*-| Attendees Functions
==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/*/
async function getAttendees() {
  try {
    statusStore.statusGlobal = "Loading..."
    customFields.value = await getCustomFields_Service(eventStore.eventId)
    console.log(customFields.value)
    attendeeList.value = await getExpoAttendees_Service(eventStore.expo_Client, eventStore.expo_Year)
    console.log("got attendee list.")
    displayList.value = attendeeList.value
    console.log("updated display list.")
    statusStore.$reset()
    console.log("reset status.")
    searchUpdated.value = false
    console.log(attendeeList.value)
  } catch (e) {
    console.log("I wasn't able to get those attendees.")
  }
}

async function deleteAttendee(i: number, n: string) {
  statusStore.statusGlobal = "Deleting..."
  if (window.confirm(`Are you sure you'd like to delete ${n}? This cannot be undone.`)) {
    await deleteAttendee_Service(i)
    attendeeList.value = attendeeList.value.filter((a: { id: number }) => a.id !== i)
    displayList.value = attendeeList.value
  }
  else {
    console.log("I won't delete that then.")
  }
  statusStore.$reset()
}

/*-| Custom Fields
==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/*/
function flattenCustomFields(obj: any) {
  let flat: any = {}
  // Loop through attendee obj
  Object.keys(obj).forEach((key) => {
    // Loop through keys with objects, like custom fields.
    if (key === "customFields" || typeof obj[key] === "object" && obj[key] !== null) {
      let cFields = obj[key]
      Object.keys(cFields).forEach(key => {
        let fieldTitle = key
        let fieldObject = cFields[key]
        let fieldValues = Object.values(fieldObject)
        let fieldHold = ""
        let x = 0
        while (fieldValues.length > x && fieldValues[x] !== false) {
          // if only one item, or last item
          if (fieldValues.length === 1 || x === fieldValues.length - 1) {
            fieldHold += fieldValues[x]
          }
          // for middle items
          else {
            fieldHold += fieldValues[x] + ", "
          }
          x++
        }
        flat[fieldTitle] = fieldHold
      })
    }
    else if (typeof obj[key] !== "object" && obj[key] !== null) {
      flat[key] = obj[key]
    }
  })
  return flat
}

async function exportAttendees() {
  console.log(typeof attendeeList.value)
  let flatList: any = []
  attendeeList.value.forEach((attendee: object) => {
    flatList.push(flattenCustomFields(attendee))
  })
  console.log(flatList)
  const sheetFormatLeads = flatList
    .map(({
      // @ts-ignore
      id,
      // @ts-ignore
      expo_Client,
      // @ts-ignore
      expo_Year,
      // @ts-ignore
      updatedAt,
      // @ts-ignore
      upload_Id,
      // @ts-ignore
      createdAt,
      // @ts-ignore
      techSessions,
      // @ts-ignore
      customFields,
      ...item
    }) => item)
  console.log(sheetFormatLeads)
  const worksheet = utils.json_to_sheet(sheetFormatLeads)
  const workbook = utils.book_new()
  utils.book_append_sheet(workbook, worksheet, `Attendees`)
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
    `${eventStore.expo_Client}-${eventStore.expo_Year}-Expo-Attendees.xlsx`,
    {compression: true})
}

</script>
