<template>

  <!-- Visible Container, Components -->
  <div
    class="container --align-content-start ">
    <div class="--p-v-4 --p-h-6 row-12-300 badge-admin-bar --gap-8 --font-size-14">
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
               placeholder="Search this Page"
               size="85"
               type="text">
      </div>

      <div

        class="row --p-h-6 --gap-2 --p-v-0 --place-content-center --place-items-center">
        <span>Page:</span>
        <button v-for="n in tabNumber"
                :key="n"
                :class="currentPage === n ? '--success' : ''"
                class="--p-h-4 --p-v-2"
                @click="updateTabDisplay(n)">
          {{ n }}
        </button>
      </div>

      <span
        v-show="!printIsRendering && displayIdx_LAST"
        class="--m-h-8 --flex-grow --place-self-center">
        Showing {{ displayIdx_FIRST !== 0 ? displayIdx_FIRST : 1 }}-{{
          displayIdx_LAST
        }} of {{ attendeeListLn }} attendees
      </span>

      <LoadingHolder :message="printProgressMsg"
                     :status="printIsRendering"
                     class="--place-self-center --flex-grow row-1-300 --place-items-center --place-content-center"/>

      <div class="row --p-0 --flex-grow --justify-content-end --align-content-center">
        <button v-show="attendeeListSelected.length === 0 || attendeeListSelected.length > 1"
                class="--secondary --p-4"
                @click="printBadges">
          Print {{ attendeeListSelected.length > 0 ? attendeeListSelected.length : "Page" }}
        </button>
        <button
          v-show="attendeeListSelected.length === 1"
          class="--success--invert --p-4"
          @click="badgeToPDF(attendeeListSelected[0])">
          Print Single
        </button>
        <button
          class="--p-2 --p-h-4 --primary"
          @click="refreshAttendees(expoLocal.expo_Client, expoLocal.expo_Year, attendeeList)"
        >
          <i class="bi-arrow-clockwise --font-size-20"></i>
        </button>
        <!--        <router-link
                  class="button &#45;&#45;success &#45;&#45;p-4"
                  to="upload-attendees">
                  <i class="bi-upload &#45;&#45;m-r-4"/>Upload Attendees
                </router-link>-->
      </div>
      <div v-if="!loading.value"
           class="row-12-300 --p-0 --align-items-center --gap-2 --font-size-14">

        <div class="row --align-items-center --justify-content-start --gap-4">
          <span>Sort by</span>
          <span>DATE:</span>
          <button :class="currentView === 'CreatedDate_Earliest' ? '--success' : ''"
                  class="--p-h-4 --p-v-2"
                  @click="sortCreatedDate_Earliest">Earliest
          </button>
          <button :class="currentView === 'CreatedDate_Latest' ? '--success' : ''"
                  class="--p-h-4 --p-v-2"
                  @click="sortCreatedDate_Latest">Latest
          </button>
          <span>NAME:</span>
          <button :class="currentView === 'FName_First' ? '--success' : ''"
                  class="--p-h-4 --p-v-2"
                  @click="sortFName_First">First
          </button>
          <button :class="currentView === 'LName_Last' ? '--success' : ''"
                  class="--p-h-4 --p-v-2"
                  @click="sortLName_Last">Last
          </button>
        </div>
        <div class="row">
          <div v-if="uploadsList && uploadsList.length > 0"
          >
            <span class="--m-r-3">Group:</span>
            <span
              v-for="(upload, i) in uploadsList"
              :key="i"
              :class="currentView === upload.upload_Title ? '--success' : ''"
              class="button --p-h-4 --p-v-2 --font-size-14 --place-self-center "
              style="display: inline-block"
              @click="getAttendees_SelectedUpload(upload.id, upload.upload_Title)"
            >
          {{ upload.upload_Title }}
        </span>
          </div>
        </div>

      </div>
    </div>

    <div v-if="attendeeList && !loading"
         class="row-12-300">
      <LoadingHolder :status="loading"/>
      <div
        class="badge-select-grid"
      >
        <!-- TODO: Change list to use Map       -->
        <!--          v-for="[key, attendee] in mapList"-->
        <AttendeeCard
          v-for="(attendee, key) in attendeeList"
          v-show="mergeSearchTerm(attendee.name_First, attendee.name_Last)"
          :key="attendee.name_First + key"
          :attendee="attendee"
          :idx="key"
          class="badge-select-wrap"
          @add-badge="addBadge"
          @remove-badge="removeBadge"
          @delete-attendee="removeAttendee_List"
          @update-attendee="updateAttendeeIdx"
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
import QrCode from "@/components/QrCode.vue"
import BadgeSingle from "@/components/BadgeSingle.vue"
import AttendeeCard from "@/components/attendee/AttendeeCard.vue"
import { useVueToPrint } from "vue-to-print"
import { onBeforeMount, ref } from "vue"
import {
  getExpoAttendees_Service,
  getAttendeesUploadId_Service
} from "@/services/AttendeeDataService.ts"
import { getAttendeeUploads_Service } from "@/services/UploadDataService.ts"
import {
  sortCreatedDate_Earliest_Service,
  sortCreatedDate_Latest_Service, sortFName_Service,
  sortLName_Service
} from "@/services/SortService.ts"
import LoadingHolder from "@/components/LoadingHolder.vue";
import { badgeToPDF_Service } from "@/services/badges/badgeToPDF.js";

/*-| States |-*/
/*---+----+---+----+---+----+---+----+---*/
const expoLocal = useExpoLocalStore()

/*-| Uploads |-*/
const uploadsList = ref()
const selectedUploadId = ref()
/*-| Variables |-*/
const host = getUrlHost()
const loading = ref( false )
const printIsRendering = ref( false )
const printProgressMsg = ref( "" )
const attendeeList = ref( {} )
const attendeeListFull = ref( {} )
const attendeeListSelected = ref( [] )
const attendeeListGrouped = ref( [] )
const searchTerm = ref( "" )
const printComponent = ref() // for Print component

const attendeeListLn = ref( 0 )
const pageSize = ref( 750 )
const displayIdx_FIRST = ref( 0 )
const displayIdx_LAST = ref()
const tabNumber = ref( 0 )
const currentPage = ref( 1 )
const currentView = ref( "LName_Last" )

/*-| Get Image |-*/
/*---+----+---+----+---+----+---+----+---*/
function getImageUrl( name ) {
  return new URL( `../../../public/logos/${ expoLocal.expo_Client.toString()
    .toLowerCase() }/${ name }.jpeg`, import.meta.url ).href
}

/*-| Hooks |-*/
/*/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/*/
/*-| WAIT for App.vue to get the expo info |-*/
onBeforeMount( async () => {
  loading.value = true
  console.log( expoLocal )
  await getAllAttendees( expoLocal.expo_Client, expoLocal.expo_Year )
  await updateTabDisplay( currentPage.value )
  await getAllAttendeeUploads( expoLocal.expo_Client )
  await calcTabNumber()
  console.log( attendeeList )
  loading.value = false
  setTimeout(
    () => {
    }, 800
  )
  setTimeout( () => {
    // makeMap()
  }, 850 )
} )

/*-| Pagination
==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/*/
async function calcTabNumber() {
  tabNumber.value = Math.round( attendeeListFull.value.length / pageSize.value )
  if ( attendeeListFull.value.length / pageSize.value > tabNumber.value ) tabNumber.value += 1
  console.log( "page size: ", pageSize.value )
  console.log( "all attendees count: ", attendeeListFull.value.length )
  console.log( "actual tab number: ", attendeeListFull.value.length / pageSize.value )
  console.log( "tab amount: ", tabNumber.value )
}

async function updateTabDisplay( n ) {
  currentPage.value = n
  displayIdx_FIRST.value = 0
  displayIdx_LAST.value = pageSize.value

  displayIdx_LAST.value = displayIdx_LAST.value * n
  displayIdx_FIRST.value = displayIdx_LAST.value - pageSize.value

  if ( attendeeListFull.value.length < pageSize.value ) displayIdx_LAST.value = attendeeListFull.value.length
  if ( displayIdx_LAST.value > attendeeListLn.value ) displayIdx_LAST.value = attendeeListLn.value

  attendeeList.value = attendeeListFull.value.slice( displayIdx_FIRST.value,
    displayIdx_LAST.value )
}

/*-| Attendees |-*/
/*/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/*/
/*const mapList = ref()

async function makeMap() {
  mapList.value = new Map( Object.entries( attendeeList.value ) )
  console.log( "List", mapList )
}*/

/*-| Get All |-*/
async function getAllAttendees( client, year, getAll = false ) {
  attendeeList.value = await getExpoAttendees_Service( client, year )
  attendeeListFull.value = attendeeList.value
  attendeeListLn.value = attendeeList.value.length
  await sortLName_Service( attendeeList.value )
  // console.log( 'Attendees: ', o, typeof o )
  // await chunkObject( o )
  if ( getAll === false ) {
    attendeeList.value = attendeeListFull.value.slice( displayIdx_FIRST.value,
      displayIdx_LAST.value )
  }
}

function updateAttendeeIdx( i, a ) {
  attendeeList.value[i] = a
  console.log( "update! " + i, a )

}

/*-| Get by Upload |-*/
async function getAllAttendeeUploads( client ) {
  uploadsList.value = await getAttendeeUploads_Service( client )
  uploadsList.value = uploadsList.value.filter( u => u.expo_Year === expoLocal.expo_Year )
  console.log( "uploads list: ", uploadsList.value )
}

/*-| Get Selected Upload |-*/
async function getAttendees_SelectedUpload( id, title ) {
  selectedUploadId.value = id
  console.log( "Selected upload: ", selectedUploadId.value )
  attendeeList.value = await getAttendeesUploadId_Service( id )
  await sortLName_Service( attendeeList.value )
  console.log( attendeeList.value )
  currentView.value = title
}

async function refreshAttendees( client, year ) {
  // window.location.reload()
  loading.value = true
  attendeeList.value = []
  attendeeListSelected.value = []
  await getAllAttendees( client, year )
  // attendeeList.value = await getAllAttendees( client, year )
  console.log( attendeeList.value )
  loading.value = false
}

/*-| Search |-*/
async function resetSearch() {
  searchTerm.value = ""
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
  return fullName.replace( " ", "" )
    .toUpperCase()
    .includes( searchTerm.value.replace( " ", "" ).toUpperCase() )
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

function removeAttendee_List( i ) {
  console.log( "deleting" + i )
  attendeeList.value.splice( i, 1 )
  attendeeListLn.value -= 1
}

/*-| Sorting
==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/*/
function sortCreatedDate_Earliest() {
  sortCreatedDate_Earliest_Service( attendeeListFull.value )
  currentView.value = "CreatedDate_Earliest"
  updateTabDisplay( 1 )
  console.log( currentPage )
}

function sortCreatedDate_Latest() {
  sortCreatedDate_Latest_Service( attendeeListFull.value )
  currentView.value = "CreatedDate_Latest"
  updateTabDisplay( 1 )
  console.log( currentPage )
}

function sortFName_First() {
  sortFName_Service( attendeeListFull.value )
  currentView.value = "FName_First"
  updateTabDisplay( 1 )
  console.log( currentPage )
}

function sortLName_Last() {
  sortLName_Service( attendeeListFull.value )
  currentView.value = "LName_Last"
  updateTabDisplay( 1 )
  console.log( currentPage )
}

/*/===!===!===!===!===!===!===!===!===!===!===!===!===!===!===!===!
Printing
===!===!===!===!===!===!===!===!===!===!===!===!===!===!===!/*/

// TODO Use VueToPrint to generate single badge PDF for printing
const { handlePrint } = useVueToPrint( {
  content: printComponent,
  documentTitle: "Badges"
} )

async function printBadges() {
  printIsRendering.value = true
  printProgressMsg.value = "Rendering badges..."
  setTimeout( async () => {
    if ( attendeeListSelected.value.length === 0 ) {
      attendeeListSelected.value = attendeeList.value
    }
    await chunkObject( attendeeListSelected )
    handlePrint()
    attendeeListSelected.value = []
    printProgressMsg.value = ""
    printIsRendering.value = false
  }, 500 )
}

/*-| Print Single Badge
/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/*/
const qrData = ref()
const logoData = ref()

async function badgeToPDF( a ) {
  printIsRendering.value = true
  printProgressMsg.value = "Rendering badge..."
  await badgeToPDF_Service( a, expoLocal, qrData, logoData )
  printProgressMsg.value = ""
  printIsRendering.value = false
}
</script>
