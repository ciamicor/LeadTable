<template>

  <!-- Visible Container, Components -->
  <div class="container --align-content-start">
    <div class="--p-v-4 --p-h-6 row-12-300">
      <div
        class="search-wrap --place-self-center">
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

      <div class="row-8-300 --flex-grow --justify-content-end --align-content-center">
        <button v-show="attendeeListSelected.length === 0 || attendeeListSelected.length > 1"
                class="--secondary --p-4"
                @click="printBadges">
          Print {{ attendeeListSelected.length > 0 ? attendeeListSelected.length : 'All' }} Badges
        </button>
        <button
          v-show="attendeeListSelected.length === 1"
          class="--success--invert --p-4"
          @click="badgeToPDF(attendeeListSelected[0])">
          Print Single
        </button>
        <router-link
          class="button --success --p-4"
          to="upload-attendees">
          <i class="bi-upload --m-r-4"/>Upload Attendees
        </router-link>
        <router-link
          :to="`/${expoLocal.expo_Client}/${expoLocal.expo_Year}/admin/create-badge`"
          class="button --primary --p-4">
          <i class="bi-plus-lg --m-r-4"/>New Badge
        </router-link>
      </div>
      <div class="row-12-300 --align-items-center --gap-3">
        <span class="">View upload:</span>
        <button
          v-for="(upload, i) in uploadsList"
          :key="i"
          class="--p-4 --font-size-14 --place-self-center"
          @click="getAttendees_SelectedUpload(upload.id)"
        >
          {{ upload.createdAt.slice( 0, 10 ) }}
        </button>
        <button
          class="--p-2 --p-h-4 --primary --font-size-14"
          @click="refreshAttendees(expoLocal.expo_Client, expoLocal.expo_Year, attendeeList)"
        >
          <i class="bi-arrow-clockwise --font-size-20 --m-r-3"></i>
          Reset
        </button>
      </div>
    </div>

    <div class="row-12-300">
      <LoadingHolder :status="loading"/>
      <div
        v-show="!loading"
        class="badge-select-grid"
      >
        <!-- TODO: Change list to use Map       -->
        <!--          v-for="[key, attendee] in mapList"-->
        <AttendeeCard
          v-for="(attendee, key) in attendeeList"
          v-show="mergeSearchTerm(attendee.name_First, attendee.name_Last)"
          :key="key"
          :attendee="attendee"
          class="badge-select-wrap"
          @add-badge="addBadge"
          @remove-badge="removeBadge"
        />
      </div>
    </div>
  </div>

  <!--  TODO Polish Single Badge Code, merge with BadgeCreate or BadgeService  -->
  <!-- ===!===!===!===!===!===!===!===!===!===!===!===!===!===!===!===!
  Hidden, Printing Components
  ===!===!===!===!===!===!===!===!===!===!===!===!===!===!===! -->
  <div
    v-if="attendeeListSelected.length !== 1"
    ref="printComponent"
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
          :attendee="attendee"/>
      </div>
    </div>
  </div>
  <div class="badges-page-container">
    <img id="badge-logo"
         :alt="`${expoLocal.expo_Client}-logo`"
         :src="getImageUrl(`${expoLocal.expo_Client.toLowerCase()}-vert-rgb`)"
    >
    <QrCode
      v-if="attendeeListSelected.length === 1"
      id="qr-code"
      :size="215"
      :url-value="attendeeListSelected.length === 1 ? attendeeListSelected[0].id.toString() : ''"
      class="badge--qr"
    ></QrCode>
  </div>
</template>

<script lang="js"
        setup>
import { useExpoLocalStore } from "@/stores.ts";
import { getUrlHost } from "@/services/functions/UrlService.ts";
import { jsPDF } from 'jspdf'
import { scaleFont } from "@/services/functions/TextManipulationService.ts";
import QrCode from '@/components/QrCode.vue'
import html2canvas from 'html2canvas'
import BadgeSingle from '@/components/BadgeSingle.vue'
import AttendeeCard from '@/components/AttendeeCard.vue'
import { useVueToPrint } from 'vue-to-print'
import { onMounted, ref } from 'vue'
import {
  getExpoAttendees_Service,
  getAttendeesUploadId_Service
} from '@/services/AttendeeDataService.ts'
import { getAttendeeUploads_Service } from '@/services/UploadDataService.ts'
import { sortLName_Service } from '@/services/SortService.ts'
import LoadingHolder from "@/components/LoadingHolder.vue";

/*-| States |-*/
/*---+----+---+----+---+----+---+----+---*/
const expoLocal = useExpoLocalStore()

/*-| Uploads |-*/
const uploadsList = ref()
const selectedUploadId = ref()
/*-| Variables |-*/
const host = getUrlHost()
const loading = ref( false )
const attendeeList = ref( {} )
const attendeeListSelected = ref( [] )
const attendeeListGrouped = ref( [] )
const searchTerm = ref( '' )
const printComponent = ref() // for Print component

/*-| Get Image |-*/
/*---+----+---+----+---+----+---+----+---*/
function getImageUrl( name ) {
  return new URL( `../../../public/logos/${ expoLocal.expo_Client.toString()
    .toLowerCase() }/${ name }.jpeg`, import.meta.url ).href
}

/*-| Hooks |-*/
/*/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/*/
/*-| WAIT for App.vue to get the expo info |-*/
onMounted( () => {
  loading.value = true
  setTimeout(
    () => {
      console.log( expoLocal )
      getAllAttendees( expoLocal.expo_Client, expoLocal.expo_Year )
      getAllAttendeeUploads( expoLocal.expo_Client )
    }, 600
  )
  setTimeout( () => {
    loading.value = false
    makeMap()
  }, 1200 )
} )

/*-| Attendees |-*/
/*/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/*/
const mapList = ref()

async function makeMap() {
  mapList.value = new Map( Object.entries( attendeeList.value ) )
  console.log( "List", mapList )
}

/*-| Get by Upload |-*/
async function getAllAttendeeUploads( client ) {
  uploadsList.value = await getAttendeeUploads_Service( client )
  console.log( "uploads list: ", uploadsList.value )
}

/*-| Get Selected Upload |-*/
async function getAttendees_SelectedUpload( id ) {
  selectedUploadId.value = id
  console.log( "Selected upload: ", selectedUploadId.value )
  attendeeList.value = await getAttendeesUploadId_Service( id )
  await sortLName_Service( attendeeList.value )
  console.log( attendeeList.value )
}

async function refreshAttendees( client, year ) {
  window.location.reload()
  attendeeList.value = await getAllAttendees( client, year )
  console.log( attendeeList.value )
}

/*-| Get All |-*/
async function getAllAttendees( client, year ) {
  attendeeList.value = await getExpoAttendees_Service( client, year )
  await sortLName_Service( attendeeList.value )
  // console.log( 'Attendees: ', o, typeof o )
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
  return fullName.replace( ' ', '' )
    .toUpperCase()
    .includes( searchTerm.value.replace( ' ', '' ).toUpperCase() )
}

/*-| List Functions |-*/
/*/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/*/
/*-| Add badge to printing list |-*/
async function addBadge( i ) {
  attendeeListSelected.value.push( i )
  await sortLName_Service( attendeeListSelected.value )
  await chunkObject( attendeeListSelected )
}

/*-| Remove badge from printing list |-*/
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

/*/===!===!===!===!===!===!===!===!===!===!===!===!===!===!===!===!
Printing
===!===!===!===!===!===!===!===!===!===!===!===!===!===!===!/*/

// TODO Use VueToPrint to generate single badge PDF for printing
const { handlePrint } = useVueToPrint( {
  content: printComponent,
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

/*-| Print Single Badge
/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/*/
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

/*-| Store Badge Dimensions, Placement |-*/
const dim = {
  h: 3,
  w: 4,
  p: 0.1875,
  imgW: 1.9375,
  imgH: 1.1875,
  rot: 0
}
const pt2in = 0.0138888889

// TODO merge with code from BadgeCreate, then add to service file.
async function badgeToPDF( a ) {
  console.log( "Creating badge for: " + a.name_First )
  await select2Canvas( '#qr-code', qrData )
  await select2Canvas( '#badge-logo', qrLogo )

  /*-| Declare Badge |-*/
  const badgePdf = new jsPDF( {
    orientation: 'landscape',
    unit: 'in',
    format: [ dim.w, dim.h ],
    putOnlyUsedFonts: true
  } )

  /*-| Add Elements
  ---+----+---+----+---+----+---+----+---*/
  const nameSize = scaleFont( a.name_First + a.name_Last, 400 )
  const titleSize = scaleFont( a.title, 400, 14, 20 )
  const employSize = scaleFont( a.contact_Employer, 400, 16, 20 )

  // Name
  badgePdf.setFont( 'Helvetica', 'normal', 'bold' );
  badgePdf.setFontSize( nameSize )
  badgePdf.text( `${ a.name_First } ${ a.name_Last }`,
    dim.p,
    ((employSize * pt2in) / 3) + ((nameSize + employSize) * pt2in) + (dim.p / 2),
    { align: 'left' } )

  // Title
  badgePdf.setFont( 'Helvetica', 'italic' );
  badgePdf.setFontSize( titleSize )
  badgePdf.text(
    a.title,
    dim.p,
    +((nameSize * pt2in) / 3) + ((nameSize + employSize + titleSize) * pt2in) + dim.p,
    { align: 'left' } )

  // Employer
  badgePdf.setFont( 'Helvetica', 'normal' );
  badgePdf.setFontSize( employSize )
  badgePdf.text(
    a.contact_Employer,
    dim.p,
    dim.p * 2,
    { align: 'left' } )

  /*-| Add QR Code |-*/
  badgePdf.addImage(
    qrData.value,
    'PNG',
    dim.p,
    dim.h - dim.imgH - dim.p,
    dim.imgH,
    dim.imgH,
    'qr',
    'FAST',
    dim.rot )

  /*-| Add Logo |-*/
  badgePdf.addImage(
    qrLogo.value,
    'PNG',
    dim.w - dim.p - dim.imgW,
    dim.h - dim.imgH - dim.p,
    dim.imgW,
    dim.imgH,
    'logo',
    'FAST',
    dim.rot )

  setTimeout( () => {
    badgePdf.output( 'dataurlnewwindow' )
  }, 300 )
}
</script>
