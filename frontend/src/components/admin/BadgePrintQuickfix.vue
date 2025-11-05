<template>

  <!-- Visible Container, Components -->
  <div class="container --align-content-start">
    <div class="--p-v-4 --p-h-6 row-12-300">
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

      <div class="row-8-300 --flex-grow --justify-content-end --align-content-center">
        <button v-show="attendeeListSelected.length === 0 || attendeeListSelected.length > 1"
                class="--secondary --p-4"
                @click="printBadges">
          Print {{ attendeeListSelected.length > 0 ? attendeeListSelected.length : 'All' }} Badges
        </button>
        <button
          v-show="attendeeListSelected.length === 1"
          class="--success--invert --p-4"
          @click="printBadge_Portrait3x4(attendeeListSelected[0])">
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

    <div class="row-12-300 --place-content-center --place-items-center">
      <span>Page:</span>
      <button v-for="n in tabNumber"
              :key="n"
              @click="updateTabDisplay(n)">{{ n }}
      </button>
      <!--      <input v-model="pageSize">-->
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
const attendeeListFull = ref( [] )
const attendeeListSelected = ref( [] )
const attendeeListGrouped = ref( [] )
const searchTerm = ref( '' )
const printComponent = ref() // for Print component
const displayAmountFirst = ref( 0 )
const pageSize = ref( 750 )
const displayAmountLast = ref( pageSize.value )
const tabNumber = ref()

/*-| Get Image
---+----+---+----+---+----+---+----+---*/
function getImageUrl( name ) {
  let u = new URL( `../../../public/logos/${ expoLocal.expo_Client.toString()
    .toLowerCase() }/${ name }.jpeg`, import.meta.url ).href
  /*console.log( 'Image URL is:' )
  console.log( u )*/
  return u
}

/*-| Hooks
/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/*/
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
    calcTabNumber()
    // makeMap()
  }, 1200 )
} )

/*-| Attendees |-*/
/*/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/*/
const mapList = ref()

// TODO use map to manage badges
async function makeMap() {
  mapList.value = await new Map( Object.entries( attendeeList.value ) )
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
async function getAllAttendees( client, year, getAll = false ) {
  attendeeList.value = await getExpoAttendees_Service( client, year )
  attendeeListFull.value = attendeeList.value
  console.log( 'Attendees' )
  console.log( typeof attendeeList.value )
  // attendeeList.value = attendeeList.value.slice( 0, 10 )
  await sortLName_Service( attendeeList.value )
  if ( getAll === false ) {
    attendeeList.value = attendeeList.value.slice( displayAmountFirst.value,
      displayAmountLast.value )
  }
  // console.log( 'Attendees: ', o, typeof o )
  // await chunkObject( o )
}

/*-| Search |-*/
async function resetSearch() {
  attendeeList.value.slice( displayAmountFirst.value, displayAmountLast.value )
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

async function calcTabNumber() {
  let r = Math.round( attendeeListFull.value.length / pageSize.value )
  console.log( attendeeList.value.length )
  console.log( attendeeListFull.value.length )
  tabNumber.value = r
  console.log( tabNumber.value )
}

async function updateTabDisplay( n ) {
  displayAmountFirst.value = 0
  displayAmountLast.value = pageSize.value

  displayAmountLast.value = displayAmountLast.value * n
  console.log( displayAmountLast.value )
  displayAmountFirst.value = displayAmountLast.value - pageSize.value
  console.log( displayAmountFirst.value )
  await getAllAttendees( expoLocal.expo_Client, expoLocal.expo_Year )
  console.log( '' )
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
    await getAllAttendees( expoLocal.expo_Client, expoLocal.expo_Year, true )
    attendeeListSelected.value = attendeeList.value
  }
  await chunkObject( attendeeListSelected )
  handlePrint()
  attendeeListSelected.value = []
}

/*-| Print Single
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

async function printBadge_Portrait3x4( a ) {
  console.log( "attendee list for print is" )
  console.log( attendeeListSelected.value )
  console.log( typeof a )
  console.log( a.id )
  console.log( a.name_First )
  await select2Canvas( '#qr-code', qrData )
  await select2Canvas( '#badge-logo', qrLogo )
  /*-| Store Badge Dimensions, Placement |-*/
  const dim = {
    h: 3,
    w: 4,
    p: 0.1875,
    imgW: 1.875,
    imgH: 1.125,
    rot: 90
  }
  /*-| Declare Badge |-*/
  const badgePdf = new jsPDF( {
    orientation: 'portrait',
    unit: 'in',
    format: [ dim.w, dim.h ]
  } )

  /*-| Text |-*/
  badgePdf.setFontSize( 18 )
  try {
    badgePdf.text( a.contact_Employer, dim.p * 2, dim.w - dim.p, null, dim.rot )
  } catch ( e ) {
    console.log( 'No employer!' )
  }
  badgePdf.setFontSize( 22 )
  badgePdf.text( `${ a.name_First } ${ a.name_Last }`,
    dim.p * 4,
    dim.w - dim.p,
    dim.rot )
  badgePdf.setFontSize( 18 )
  try {
    badgePdf.text( a.title, dim.p * 6, dim.w - dim.p, dim.rot )
  } catch ( e ) {
    console.log( 'No title!' )
  }

  /*-| Add QR Code |-*/
  badgePdf.addImage( qrData.value,
    'PNG',
    dim.h - dim.p,
    dim.w - dim.imgH - dim.p,
    dim.imgH,
    dim.imgH,
    'qr',
    'FAST',
    dim.rot )
  /*-| Add Logo |-*/
  badgePdf.addImage( qrLogo.value,
    'PNG',
    dim.h - dim.p,
    dim.p * 4,
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
