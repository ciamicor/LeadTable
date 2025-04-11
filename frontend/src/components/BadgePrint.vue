<template>

  <div class="--p-4 row --pos-fixed --bg-blur-8 --top-0 --top-r --right-0 --left-0">
    <div class="search-wrap --place-self-center">
      <button
        v-show="searchTerm !== ''"
        class="--square"
        @click="resetSearch">
        <i class="bi-x-lg"></i>
      </button>
      <input id="searchAttendees"
             v-model="searchTerm"
             class="search"
             name="searchAttendees"
             placeholder="Search Attendees"
             type="text">
    </div>
    <button class="--warn"
            @click="printBadges">
      Print {{ attendeeListSelected.length > 0 ? 'Selected' : 'All' }}
    </button>
    <router-link
      class="button --primary"
      to="/create-badge">
      Create
    </router-link>
  </div>

  <div class="row">
    <div
      class="badge-select-grid"
    >
      <AttendeeBadgeRow
        v-for="(attendee, ind) in attendeeList"
        v-show="mergeSearchTerm(attendee.name_First, attendee.name_Last)"
        :key="ind"
        :attendee="attendee"
        class="badge-select-wrap"
        @add-badge="addBadge"
        @remove-badge="removeBadge"
      />
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
        class="badge-wrap"
      >
        <BadgeSingle
          :attendee="attendee" />
      </div>
    </div>
  </div>
</template>


<script lang="js"
        setup>
// TODO Convert to TS
import BadgeSingle from '@/components/BadgeSingle.vue'
import AttendeeBadgeRow from '@/components/AttendeeBadgeRow.vue'
import { useVueToPrint } from 'vue-to-print'
import { onBeforeMount, ref } from 'vue'
import { getAllAttendees_Service } from '@/services/AttendeeDataService.ts'
import { sortLName_Service } from '@/services/SortService.js'

/*-| Variables |-*/
const attendeeList = ref( {} )
const attendeeListSelected = ref( [] )
const attendeeListGrouped = ref( [] )
const searchTerm = ref( '' )
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
  await sortLName_Service( o.value )
  console.log( 'Attendees: ', o, typeof o )
  // await chunkObject( o )
}

/*-| Search |-*/
async function resetSearch() {
  searchTerm.value = ''
}

/*-| Chunk array for printing |-*/
async function chunkObject( a ) {
  let countPushTotal = 0
  let indexCount = 0
  const groupSize = 6
  let tempGroup = []
  attendeeListGrouped.value = []
  const attendeeNum = Object.keys( a.value ).length
  while ( indexCount < attendeeNum ) {
    while ( countPushTotal < groupSize ) {
      if ( a.value[countPushTotal + indexCount] !== undefined ) {
        tempGroup.push( await a.value[countPushTotal + indexCount] )
      }
      countPushTotal++
    }
    attendeeListGrouped.value.push( tempGroup )
    tempGroup = []
    indexCount += groupSize
    countPushTotal = 0
  }
}

function mergeSearchTerm( f, l ) {
  let fullName = f + l
  return fullName.replace( ' ', '' ).toUpperCase().includes( searchTerm.value.replace( ' ', '' ).toUpperCase() )

}

/*-| List Functions |-*/
/*/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/*/
async function addBadge( i ) {
  attendeeListSelected.value.push( i )
  await sortFName_Service( attendeeListSelected.value )
  await chunkObject( attendeeListSelected )
}

async function removeBadge( i ) {
  attendeeListGrouped.value.forEach( ( g ) => {
    let sliceGrouped = g.findIndex( a => a.id === i )
    if ( sliceGrouped > -1 ) {
      return g.splice( sliceGrouped, 1 )
    }
  } )
  let sliceSelected = attendeeListSelected.value.findIndex( ( a ) => {
    return a.id === i
  } )
  if ( sliceSelected > -1 ) {
    return attendeeListSelected.value.splice( sliceSelected, 1 )
  }
}

/*-| Printing |-*/
/*/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/*/
const { handlePrint } = useVueToPrint( {
  content: componentRef,
  documentTitle: 'Badges'
} )

async function printBadges() {
  if ( attendeeListSelected.value.length === 0 ) {
    attendeeListSelected.value = attendeeList.value
  }
  await chunkObject( attendeeListSelected )
  handlePrint()
  attendeeListSelected.value = []
}


</script>
