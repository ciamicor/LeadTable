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
    <label class="--flex-grow-0"
           for="name">
      Client Name
      <select id="select-client"
              v-model="eventStore.expo_Client"
              name="select-client"
              @change="updateAdminOptions"
      >
        <option
          selected
          value="CSIFT">CSIFT
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
    <label class="--flex-grow-0"
           for="expo-year">
      Expo Year
      <select id="select-client"
              v-model="eventStore.expo_Year"
              name="select-client"
              @change="updateAdminOptions"
      >
        <option
          selected
          value="2026">2026
        </option>
        <option
          value="2025">2025
        </option>
      </select>
    </label>
    <button id="search-expo"
            :class="searchUpdated ? '--primary--invert' : ''"
            @click="getAttendees"
            @keydown.enter="getAttendees">
      Search
    </button>
    <span class="--flex-grow-1"/>
    <span v-if="attendeeList"
          class="--m-r-4">Total Attendees: {{ attendeeList.length }}</span>
    <button class="--secondary--invert --justify-self-end"
            @click="exportAttendees">
      Export Attendees
    </button>
  </div>
  <div id="scroller-box"
       class="table-scroll-wrapper"
  >
    <!--       @scroll="handleScroll($event)">-->
    <!--    <div
          :style="`height:${topPad}px;`"/>-->
    <table class="attendee-table">
      <tbody>
      <tr>
        <th></th>
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
          :rowNum="index"
          @delete-attendee="deleteAttendee(attendee.id, `${attendee.name_First} ${attendee.name_Last}`)"
        />
      </tr>
      </tbody>
    </table>
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

const attendeeList = ref()
const displayList = ref()
const eventStore = useEventLocalStore()
const statusStore = useStatusStore()
const searchUpdated = ref(false)

const windowH = ref(window.innerHeight - 100)
const rowH = ref(55)

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
  statusStore.status = "Loading..."
  const d = await db.adminOptions.get(1)
  // Check if local admin options exist, then set or add.
  if (d) {
    db.adminOptions.get(1)
    console.log(db.adminOptions.get(1))
    eventStore.expo_Client = d.clientSelected
    eventStore.expo_Year = d.yearSelected
    await getAttendees()
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
  }
  // console.log(attendeeList.value)
  statusStore.$reset()
  displayList.value = attendeeList.value
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
  statusStore.status = "Loading..."
  attendeeList.value = await getExpoAttendees_Service(eventStore.expo_Client, eventStore.expo_Year)
  displayList.value = attendeeList.value
  customFields.value = await getCustomFields_Service(eventStore.eventId)
  statusStore.$reset()
  searchUpdated.value = false
}

async function deleteAttendee(i: number, n: string) {
  statusStore.status = "Deleting..."
  if (window.confirm(`Are you sure you'd like to delete ${n}? This cannot be undone.`)) {
    await deleteAttendee_Service(i)
    attendeeList.value = attendeeList.value.filter(a => a.id !== i)
    displayList.value = attendeeList.value
  }
  else {
    console.log("I won't delete that then.")
  }
  statusStore.$reset()
}

// Declare a flatten function that takes
// object as parameter and returns the
// flatten object
const flattenObj = (ob: object) => {

  // The object which contains the
  // final result
  let result = {};

  // loop through the object "ob"
  for (const i in ob) {

    // We check the type of the i using
    // typeof() function and recursively
    // call the function again
    if ((typeof ob[i]) === "object" && !Array.isArray(ob[i])) {
      const temp = flattenObj(ob[i]);
      for (const j in temp) {

        // Store temp in result
        result[i + "." + j] = temp[j];
      }
    }

    // Else store ob[i] in result directly
    else {
      result[i] = ob[i];
    }
  }
  return result;
};

/*-|===!===!===!===!===!===!===!===!===!===!===!===!===!===!===!===
-| TODO - PAUSED: Flattening Attendee object for export to sheet!!
-|===!===!===!===!===!===!===!===!===!===!===!===!===!===!===/*/
function iterateList() {
  const l = () => {
    for (let key in attendeeList.value
      ) {
      if (attendeeList.value.hasOwnProperty(key)) {
        flattenObj(attendeeList.value)
      }
    }
  }
  return l
}

async function exportAttendees() {
  console.log(typeof attendeeList.value)
  let test = iterateList()
  console.log(test)
  const formattedLeads = attendeeList.value
    .map(({
      id,
      expo_Client,
      expo_Year,
      updatedAt,
      upload_Id,
      createdAt,
      techSessions,
      ...item
    }) => item)
  console.log(formattedLeads)
  const worksheet = utils.json_to_sheet(formattedLeads)
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
  /*writeFile(workbook,
    `${eventStore.name}-${eventStore.expo_Year}-Expo-Attendees.xlsx`,
    {compression: true})*/
}

</script>
