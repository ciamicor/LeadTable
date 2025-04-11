<template>
  <div class="row --gap-24">
    <div class="col-12-300 --pos-fixed --bg-blur-8 --top-0 --top-r --right-0 --left-0">
      <div class="row --full">
        <div class="search-wrapper --place-self-center">
          <button
            v-show="searchTerm !== ''"
            class="--square"
            @click="resetSearch">
            <i class="bi-x-lg"></i>
          </button>
          <input id="searchAttendees"
                 v-model="searchTerm"
                 class="search --m-h-7"
                 name="searchAttendees"
                 placeholder="Search Attendees"
                 type="text"
                 @change="searchNames(attendeeList, searchTerm, searchResult)">
        </div>
        <button class="--warn"
                @click="handlePrint">Print All Badges
        </button>
        <router-link
          class="button --primary"
          to="/create-badge">
          Create Badge
        </router-link>
      </div>
    </div>
    <div
      ref="componentRef"
      class="badges-page-container">
      <div v-for="(group, i) in attendeeListGrouped"
           :key="i"
           class="badge-grid-container"
      >
        <div
          v-for="(attendee, ind) in group"
          :key="ind"
          class="badge-wrapper"
        >
          <BadgeSingle
            :attendee="attendee" />
        </div>
      </div>
    </div>
  </div>
</template>


<script lang="js"
        setup>
// TODO Convert to TS
import BadgeSingle from '@/components/BadgeSingle.vue'

import { useVueToPrint } from 'vue-to-print'
import { onBeforeMount, ref } from 'vue'
import { getAllAttendees_Service } from '@/services/AttendeeDataService.ts'
import { sortFName_Service } from '@/services/SortService.js'
import { searchAttendeeName_Service } from '@/services/SearchService.js'

/*-| Variables |-*/
const attendeeList = ref( {} )
const attendeeListGrouped = ref( [] )
const searchTerm = ref( '' )
const searchResult = ref( {} )
/*-| Print Component |-*/
const componentRef = ref()

/*-| Hooks |-*/
/*/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/*/
onBeforeMount( () => {
  getAllAttendees( attendeeList )
} )

/*-| Attendees |-*/
/*/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/*/
/*-| Get All |-*/
async function getAllAttendees( o ) {
  await getAllAttendees_Service( o )
  await sortFName_Service( o.value )
  console.log( 'Attendees: ', o, typeof o )
  await chunkObject( o )
}

/*-| Search |-*/
async function searchNames( o, s, r ) {
  await searchAttendeeName_Service( o, s, r )
  console.log( 'Search Result: ', r, typeof r )
  await chunkObject( r )
}

async function resetSearch() {
  searchTerm.value = ''
  await searchNames( attendeeList.value, '', searchResult.value )
}

/*-| Chunk array for printing |-*/
async function chunkObject( a ) {
  let countPushTotal = 0
  let indexCount = 0
  const groupSize = 6
  let tempGroup = []
  attendeeListGrouped.value = []
  // console.log( typeof attendeeList )
  const attendeeNum = Object.keys( a.value ).length
  // console.log( attendeeNum )
  // console.log( 'Attendee amount', attendeeNum )
  // console.log( 'Attendee #1', attendeeList.value[0] )

  while ( indexCount < attendeeNum ) {
    while ( countPushTotal < groupSize ) {
      // console.log( 'pushed: ', countPushTotal + indexCount )
      if ( a.value[countPushTotal + indexCount] !== undefined ) {
        // console.log( 'value found!' )
        tempGroup.push( await a.value[countPushTotal + indexCount] )
      }
      countPushTotal++
      // console.log( tempGroup )
    }
    attendeeListGrouped.value.push( tempGroup )
    tempGroup = []
    indexCount += groupSize
    countPushTotal = 0
    // console.log( indexCount )
  }
  // console.log( 'Grouped List: ', attendeeListGrouped.value )
}

/*-| Printing |-*/
/*/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/*/
const { handlePrint } = useVueToPrint( {
  content: componentRef,
  documentTitle: 'Badges'
} )


</script>
