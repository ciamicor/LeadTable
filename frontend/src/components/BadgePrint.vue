<template>

  <div class="--p-4 row --pos-fixed --bg-blur-8 --top-0 --top-r --right-0 --left-0">
    <span>{{ expoLocalData }}</span>
    <span>{{ companyLocalData }}</span>
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

    <!-- SINGLE BADGE -->
    <!--  TODO Polish Single Badge Code, merge with BadgeCreate or BadgeService  -->
    <div class="row-12-300 row-6-600 --justify-content-end --align-items-center">
      <button v-show="attendeeListSelected.length === 0 || attendeeListSelected.length > 1"
              class="--secondary --p-4"
              @click="printBadges">
        Print {{ attendeeListSelected.length > 0 ? attendeeListSelected.length : 'All' }} Badges
      </button>
      <button
        v-show="attendeeListSelected.length === 1"
        class="--secondary --p-4"
        @click="printBadge_Brother4300(attendeeListSelected[0])">
        Print 1: Brother 4300
      </button>
      <button
        v-show="attendeeListSelected.length === 1"
        class="--secondary --p-4"
        @click="printBadge2(attendeeListSelected[0])">
        Print 1: Other
      </button>
      <router-link
        class="button --primary --p-4"
        to="/:client/:year/create-badge">
        New Badge
      </router-link>
    </div>

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
          :attendee="attendee"/>
      </div>
    </div>
  </div>
  <div class="badges-page-container">
    <img id="badge-logo"
         :alt="`${expoLocalData.expo_Client}-logo`"
         :src="host + '/src/assets/logos/'+ expoLocalData.expo_Client.toLowerCase() + '/' + expoLocalData.expo_Client.toLowerCase() + '-vert-rgb.jpeg'"
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


<script lang="ts"
        setup>
import {useExpoLocalStore, useCompanyLocalStore} from "@/stores.js";
import {getUrlHost} from "@/services/functions/UrlFunc.js";
import {jsPDF} from 'jspdf'
import QrCode from '@/components/QrCode.vue'
import html2canvas from 'html2canvas'
import BadgeSingle from '@/components/BadgeSingle.vue'
import AttendeeBadgeRow from '@/components/AttendeeBadgeRow.vue'
import {useVueToPrint} from 'vue-to-print'
import {onBeforeMount, onMounted, ref} from 'vue'
import {getExpoAttendees_Service} from '@/services/AttendeeDataService.ts'
import {sortLName_Service} from '@/services/SortService.js'
import {toTitleCase_Service} from '@/services/TextContentService.js'

const host = getUrlHost()
const expoLocalData = useExpoLocalStore()
const companyLocalData = useCompanyLocalStore()

/*-| Variables |-*/
const attendeeListRenderLength = ref(5)
const attendeeList = ref({})
const attendeeListSelected = ref([])
const attendeeListGrouped = ref([])
const searchTerm = ref('')
/*-| Print Component |-*/
const componentRef = ref()

/*-| Hooks |-*/
/*/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/*/
onBeforeMount(async () => {
  await console.log(expoLocalData)
})
setTimeout(
  () => {
    getAllAttendees(expoLocalData.expo_Client, expoLocalData.year, attendeeList)
  }, 300
)

/*-| Attendees |-*/
/*/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/*/
/*-| Get All |-*/
async function getAllAttendees(client, year, o) {
  await getExpoAttendees_Service(client, year, o)
  await sortLName_Service(o.value)
  // console.log( 'Attendees: ', o, typeof o )
  // await chunkObject( o )
}

/*-| Search |-*/
async function resetSearch() {
  searchTerm.value = ''
}

/*-| Chunk array for printing |-*/
async function chunkObject(a) {
  let countPushTotal = 0
  let indexCount = 0
  const groupSize = 6
  let tempGroup = []
  attendeeListGrouped.value = []
  const attendeeNum = Object.keys(a.value).length
  while (indexCount < attendeeNum) {
    while (countPushTotal < groupSize) {
      if (a.value[countPushTotal + indexCount] !== undefined) {
        tempGroup.push(await a.value[countPushTotal + indexCount])
      }
      countPushTotal++
    }
    attendeeListGrouped.value.push(tempGroup)
    tempGroup = []
    indexCount += groupSize
    countPushTotal = 0
  }
}

function mergeSearchTerm(f, l) {
  let fullName = f + l
  return fullName.replace(' ', '').toUpperCase().includes(searchTerm.value.replace(' ', '').toUpperCase())

}

/*-| List Functions |-*/
/*/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/*/
/*-| Add badge to printing list |-*/
async function addBadge(i) {
  attendeeListSelected.value.push(i)
  await sortLName_Service(attendeeListSelected.value)
  await chunkObject(attendeeListSelected)
}

/*-| Remove badge from printing list |-*/
async function removeBadge(i) {
  attendeeListGrouped.value.forEach((g) => {
    let sliceGrouped = g.findIndex(a => a.id === i)
    if (sliceGrouped > -1) {
      return g.splice(sliceGrouped, 1)
    }
  })
  let sliceSelected = attendeeListSelected.value.findIndex((a) => {
    return a.id === i
  })
  if (sliceSelected > -1) {
    return attendeeListSelected.value.splice(sliceSelected, 1)
  }
}

/*/===!===!===!===!===!===!===!===!===!===!===!===!===!===!===!===!/*/
/*-| Printing |-*/
/*/===!===!===!===!===!===!===!===!===!===!===!===!===!===!===!/*/

const {handlePrint} = useVueToPrint({
  content: componentRef,
  documentTitle: 'Badges'
})

async function printBadges() {
  if (attendeeListSelected.value.length === 0) {
    attendeeListSelected.value = attendeeList.value
  }
  await chunkObject(attendeeListSelected)
  handlePrint()
  attendeeListSelected.value = []
}

/*-| Print Single |-*/
/*/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/*/
const qrData = ref()
const qrLogo = ref()

async function select2Canvas(s, d) {
  const selector = document.querySelector(s)
  await html2canvas(selector, {
    allowTaint: true,
    useCORS: true
  }).then(canvas => {
    d.value = canvas.toDataURL(
      'image/png')
    console.log(canvas)
  })
}

async function printBadge_Brother4300(a) {
  console.log(attendeeListSelected.value)
  console.log(a.id)
  await select2Canvas('#qr-code', qrData)
  await select2Canvas('#badge-logo', qrLogo)
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
  const badgePdf = new jsPDF({
    orientation: 'portrait',
    unit: 'in',
    format: [dim.w, dim.h]
  })

  /*-| Text |-*/
  badgePdf.setFontSize(18)
  badgePdf.text(toTitleCase_Service(a.contact_Employer), dim.p * 2, dim.w - dim.p, null, dim.rot)
  badgePdf.setFontSize(22)
  badgePdf.text(toTitleCase_Service(`${a.name_First} ${a.name_Last}`), dim.p * 4, dim.w - dim.p, dim.rot)
  badgePdf.setFontSize(18)
  badgePdf.text(toTitleCase_Service(a.title), dim.p * 6, dim.w - dim.p, dim.rot)

  /*-| Add QR Code |-*/
  badgePdf.addImage(qrData.value, 'PNG', dim.h - dim.p, dim.w - dim.imgH - dim.p, dim.imgH, dim.imgH, 'qr', 'FAST', dim.rot)
  /*-| Add Logo |-*/
  badgePdf.addImage(qrLogo.value, 'PNG', dim.h - dim.p, dim.p * 4, dim.imgW, dim.imgH, 'logo', 'FAST', dim.rot)

  setTimeout(() => {
    badgePdf.output('dataurlnewwindow')
  }, 300)
}

async function printBadge2(a) {
  console.log(attendeeListSelected.value)
  console.log(a.id)
  await select2Canvas('#qr-code', qrData)
  await select2Canvas('#badge-logo', qrLogo)
  /*-| Store Badge Dimensions, Placement |-*/
  const dim = {
    h: 4,
    w: 3,
    p: 0.1875,
    imgW: 1.875,
    imgH: 1.125,
    rot: 90
  }
  /*-| Declare Badge |-*/
  const badgePdf = new jsPDF({
    orientation: 'portrait',
    unit: 'in',
    format: [dim.w, dim.h]
  })

  /*-| Text |-*/
  badgePdf.setFontSize(18)
  badgePdf.text(toTitleCase_Service(a.contact_Employer), dim.p * 2, dim.h - dim.p, null, dim.rot)
  badgePdf.setFontSize(22)
  badgePdf.text(toTitleCase_Service(`${a.name_First} ${a.name_Last}`), dim.p * 4, dim.h - dim.p, dim.rot)
  badgePdf.setFontSize(18)
  badgePdf.text(toTitleCase_Service(a.title), dim.p * 6, dim.h - dim.p, dim.rot)

  /*-| Add QR Code |-*/
  badgePdf.addImage(qrData.value, 'PNG', dim.w - dim.p, dim.h - dim.imgH - dim.p, dim.imgH, dim.imgH, 'qr', 'FAST', dim.rot)
  /*-| Add Logo |-*/
  badgePdf.addImage(qrLogo.value, 'PNG', dim.w - dim.p, dim.p * 4, dim.imgW, dim.imgH, 'logo', 'FAST', dim.rot)

  setTimeout(() => {
    badgePdf.output('dataurlnewwindow')
  }, 300)
}

</script>
