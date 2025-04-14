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
    <button v-show="attendeeListSelected.length === 0 || attendeeListSelected.length > 1"
            class="--warn"
            @click="printBadges">
      Print {{ attendeeListSelected.length > 0 ? 'Selected' : 'All' }}
    </button>

    <!-- SINGLE BADGE -->
    <!--  TODO Polish Single Badge Code, merge with BadgeCreate or BadgeService  -->
    <button v-show="attendeeListSelected.length === 1"
            class="--warn"
            @click="printBadge(attendeeListSelected[0])">
      Print Single
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
    v-if="attendeeListSelected.length === 1">

  </div>

  <div
    v-if="attendeeListSelected.length !== 1"
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
  <div class="badges-page-container">
    <img id="badge-logo"
         alt="nyift-logo"
         src="../assets/logos/nyift/nyift-vert-rgb.jpeg"
    >
    <QrCode
      id="qr-code"
      :size="215"
      :url-value="attendeeListSelected[0].id"
      class="badge--qr"
    ></QrCode>
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
import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'
import QrCode from '@/components/QrCode.vue'

/*-| Variables |-*/
const attendeeListRenderLength = ref( 5 )
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
  await sortLName_Service( attendeeListSelected.value )
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

/*/===!===!===!===!===!===!===!===!===!===!===!===!===!===!===!===!/*/
/*-| Printing |-*/
/*/===!===!===!===!===!===!===!===!===!===!===!===!===!===!===!/*/

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

/*-| Print Single |-*/
/*/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/*/
const qrData = ref()
const qrLogo = ref()

async function select2Canvas( s, d ) {
  const selector = document.querySelector( s )
  await html2canvas( selector, {
    allowTaint: true,
    useCORS: true
  } ).then( canvas => {
    d.value = canvas.toDataURL(
      'image/png' )
    console.log( canvas )
  } )
}

async function printBadge( a ) {
  console.log( typeof a, 'a: ', a )
  await select2Canvas( '#qr-code', qrData )
  await select2Canvas( '#badge-logo', qrLogo )
  /*-| Store Badge Dimensions, Placement |-*/
  const dim = {
    h: 3,
    w: 4,
    p: 0.1875,
    imgW: 1.875,
    imgH: 1.125,
    rot: 0
  }
  /*-| Declare Badge |-*/
  const badgePdf = new jsPDF( {
    orientation: 'landscape',
    unit: 'in',
    format: [ dim.w, dim.h ]
  } )

  /*-| Boundary |-*/
  badgePdf.setLineWidth( .001 )
  /*-| Add QR Code |-*/
  badgePdf.addImage( qrData.value, 'PNG', dim.p, dim.h - dim.imgH - dim.p, dim.imgH, dim.imgH, 'qr', 'FAST', dim.rot )
  /*-| Add Logo |-*/
  badgePdf.addImage( qrLogo.value, 'PNG', dim.w - dim.imgW - dim.p, dim.h - dim.imgH - dim.p, dim.imgW, dim.imgH, 'logo', 'FAST', dim.rot )
  /*-| Text |-*/
  badgePdf.setFontSize( 18 )
  badgePdf.text( a.contact_Employer.toLowerCase(), dim.p, 0.4125, null, dim.rot )
  badgePdf.setFontSize( 22 )
  badgePdf.text( `${ a.name_First } ${ a.name_Last }`, dim.p, .875, dim.rot )
  badgePdf.setFontSize( 18 )
  badgePdf.text( a.title.toLowerCase(), dim.p, 1.3125, dim.rot )
  setTimeout( () => {
    badgePdf.output( 'dataurlnewwindow' )
  }, 300 )
}

</script>
