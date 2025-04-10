<template>
  <div class="row --gap-24">
    <div class="row">
      <button class="--warn"
              @click="handlePrint">Print All Badges
      </button>
      <router-link
        class="button --primary"
        to="/create-badge">
        Create Badge
      </router-link>
    </div>
    <div ref="componentRef">
      <div v-for="(group, i) in attendeeListGrouped"
           :key="i"
           class="badges-grid-container"
      >
        <div v-for="(attendee, ind) in group"
             :key="ind"
             class="badge-wrapper"
        >
          <div class="--attendee-info-container">
            <p class="--employer"
               style="width: 100%">
              {{ attendee.contact_Employer }}
            </p>
            <h1 class="--name">
              {{ attendee.name_First }}
              {{ attendee.name_Last }}
            </h1>
            <p class="--title">
              {{ attendee.title }}
            </p>
          </div>
          <div class="badge--images-container">
            <QrCode
              :size="215"
              :url-value="attendee.id.toString()"
              class="badge--qr"
            ></QrCode>
            <img alt=""
                 src="../assets/logos/nyift/nyift-vert-rgb.jpeg">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script lang="js"
        setup>
// TODO Convert to TS
import { useVueToPrint } from 'vue-to-print'
import QrCode from '@/components/QrCode.vue'
import { onBeforeMount, ref } from 'vue'
import { getAllAttendees_Service } from '@/services/AttendeeDataService.ts'

const attendeeList = ref( {} )
const attendeeListGrouped = ref( [] )

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
async function getAllAttendees( l ) {
  await getAllAttendees_Service( l )
  console.log( 'attendees', l )
  await chunkArray()
}

/*-| Chunk array for printing |-*/
let countPushTotal = 0
let indexCount = 0
const groupSize = 6
let tempGroup = []

async function chunkArray() {
  // console.log( typeof attendeeList )
  const attendeeNum = Object.keys( attendeeList.value ).length
  // console.log( 'Attendee amount', attendeeNum )
  // console.log( 'Attendee #1', attendeeList.value[0] )

  while ( indexCount < attendeeNum ) {
    while ( countPushTotal < groupSize ) {
      // console.log( 'pushed: ', countPushTotal + indexCount )
      if ( attendeeList.value[countPushTotal + indexCount] !== undefined ) {
        // console.log( 'value found!' )
        tempGroup.push( await attendeeList.value[countPushTotal + indexCount] )
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
  // console.log( attendeeListGrouped.value )
}

/*-| Printing |-*/
/*/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/*/
const { handlePrint } = useVueToPrint( {
  content: componentRef,
  documentTitle: 'Badges'
} )


</script>
