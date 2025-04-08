<template>
  <button v-if="loggedIn"
          class="--float --top-r --warn"
          @click="signOut">
    Sign Out
  </button>

  <iframe
    v-if="loginIdMatch && extraMatch"
    :src="'https://app.expofp.com' + loginUrl"
    allow="clipboard-read; clipboard-write"
    class="view-floor-plan"
  >
  </iframe>
  <div v-else
       class="row">

    <div class="col-12">
      <h2>Lead Retrieval Login</h2>
      <!--      <label for="searchExhib">Find your Company</label>
            <input id="searchExhib"
                   v-model.trim="exSearchObj.name"
                   list="searchList"
                   name="searchExhib"
                   placeholder="Type Your Company Name"
                   type="text"
                   @change="updateSearch($event)"
                   @input="searchExhib()">
            <datalist id="searchList">
              <option v-for="(s, i) in exList"
                      :key="i"
                      :data-exid="s.id"
                      :value="s.name"
              >
                {{ s.name }}
              </option>
            </datalist>-->
    </div>

    <div
      class="col-12">
      <label
        for="profileUrl">
        Login ID
      </label>
      <input id="loginId"
             v-model="loginId"
             name="loginId"
             placeholder="Enter your login ID"
             type="text">
      <button class="--success"
              @click="login()">
        Portal Login
      </button>
    </div>
    <p>{{ selectedCompanyData ? selectedCompanyData.id : null }}</p>
    <p>{{ loginUrl }}</p>
  </div>

  <!--
    <div v-if="(loginIdMatch === false) && loginId && selectedCompanyData"
         class="row">
      <p>Incorrect URL. You can find your exhibitor portal URL in the confirmation email from
         ExpoFP.</p>
    </div>

    <div v-if="!extraMatch && loginIdMatch"
         class="row">
      <p>You'll need to purchase lead retrieval to access. Purchase in your ExpoFP exhibitor
         profile.</p>
    </div>
  -->

  <div v-if="debug"
       class="row">
    <div class="col-12">
      <div class="row">
        <p class="col-12">{{ exSearchObj }}</p>
        <p class="col-5">Link match: {{ loginIdMatch }}</p>
        <p class="col-5">Lead retrieval: {{ extraMatch }}</p>
      </div>
      <h2>Login Id</h2>
      <p>{{ loginId }}</p>
      <p>{{ selectedCompanyData ? selectedCompanyData.id : null }}</p>
      <h2>Extras</h2>
      {{ companyExtras }}
      <h2>exData</h2>
      {{ selectedCompanyData }}
    </div>
    {{ companyProfileData }}
  </div>
</template>

<script lang="ts"
        setup>
import {
  getAllExhibitors,
  getExhibitor,
  getExhibExtras
} from '../services/ExpoFpDataService.ts'
import { createCompany_Service } from '@/services/CompanyDataService.ts'
import { onBeforeMount, ref } from 'vue'
import { db } from '@/db.ts'

/*-| Variables |-*/
/*/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/*/
const debug = ref(false)

const exList = ref()
const exSearchObj = ref({
  name: '',
  id: ''
})

const searchListHold = ref()

const searchResult = ref()
const selectedCompanyData = ref()
const companyExtras = ref()
const loginIdMatch = ref(false)
const extraMatch = ref(false)
const expoYear = ref()
const companyProfileData = ref()

const loginId = ref('')
const loginUrl = ref('')
const loggedIn = ref(false)

/*-| Lifecycle |-*/
/*/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/*/
onBeforeMount(() => {
    getProfile()
    getAllEx()
    // searchExhib()
  }
)

/*-| DB |-*/
/*/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/*/
const status = ref()

async function getProfile() {
  companyProfileData.value = await db.profile.get(1)
  console.log('profile data ', companyProfileData.value)
  exSearchObj.value.name = companyProfileData.value.name
  exSearchObj.value.id = companyProfileData.value.ex_Id
  loginId.value = companyProfileData.value.ex_Id
  loginUrl.value = companyProfileData.value.login_Url

  console.log('profile loginUrl: ', loginUrl.value)

  if (companyProfileData.value) {
    loginIdMatch.value = true
    extraMatch.value = true
    loggedIn.value = true
  }
}

async function saveDbLogin() {
  try {
    const id = await db.profile.add({
      ex_Id: selectedCompanyData.value.id,
      name: selectedCompanyData.value.name,
      login_Url: selectedCompanyData.value.autoLoginUrl,
      lead_Ret: !!extraMatch.value,
      expo_Year: expoYear.value
    })
    status.value = `${selectedCompanyData.value.name}
          successfully added. Got id ${id}`
  } catch (error) {
    status.value = `Failed to add
          ${selectedCompanyData.value.name}: ${error}`
  }
}

async function signOut() {
  db.delete({ disableAutoOpen: false })
  loginIdMatch.value = false
  extraMatch.value = false
  loggedIn.value = false
  // window.location.reload();
}

/*-| Function |-*/
/*/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/*/
function matchUrlParams(u: string) {
  return u.match(/(\?uid)(.*)(&token)/g)
}

async function getAllEx() {
  const hold = await getAllExhibitors()
  exList.value = hold.filter((c: any) => {
    return c.booths.length > 0
  }).sort()
  console.log('exList: ', exList.value)
  // return fp.getAllExhibitors(exList)
}

async function getEx(id: any) {
  selectedCompanyData.value = await getExhibitor(id)
  console.log('exData: ', selectedCompanyData.value)
}

async function getExtras(id: any) {
  companyExtras.value = await getExhibExtras(id)
  console.log('Extras: ', companyExtras.value)
}

async function checkExLink(li: number) {
  console.log('checking link')
  let l: any = matchUrlParams(loginId.value)
  let d: any = matchUrlParams(li.toString())
  console.log('l:', l, 'd:', d)
  if (l === d) {
    console.log('linkmatch!')
    loginIdMatch.value = true
  }
}

async function checkLeadExtra() {
  console.log('checking lead retrieval purchase')
  extraMatch.value = await companyExtras.value.some((e: any) =>
    e.name.toLowerCase().includes('lead retrieval')
  )
  console.log('lead retrieval purchased: ', extraMatch.value)
}

async function searchExhib() {
  exSearchObj.value.id = ''
  searchListHold.value = exList.value.filter((e: any) =>
    e.name.toLowerCase().includes(exSearchObj.value.name.toLowerCase())
  )
  console.log('S HOLD: ', searchListHold.value)
  setTimeout(() => {
    searchResult.value = searchListHold.value
    console.log('search: ', searchResult.value)
    return searchResult.value
  }, 500)
}

async function getSelectedId(e: any) {
  /*let id = e.target.getAttribute('data-exid')
  console.log('selected ID:', id) // 1*/
  let list: any
  list = document.getElementById('searchList')
  for (let i = 0; i < list.childElementCount; i++) {
    console.log(list.children[i].attributes['data-exid'].value)
    exSearchObj.value.id = list.children[i].attributes['data-exid'].value
  }
}

async function updateSearch(e: any) {
  await getSelectedId(e)
  if (exSearchObj.value.name) {
  }
  await getEx(exSearchObj.value.id)
  await getExtras(exSearchObj.value.id)
  await checkExLink(selectedCompanyData.value.id)
  await checkLeadExtra()

  // TODO Add better global pull

  console.log(expoYear.value)

  console.log(extraMatch.value)
  if (extraMatch.value && loginIdMatch.value) {
  }
}

async function login() {
  await getEx(loginId.value)
  console.log('company login is: ', selectedCompanyData.value.autoLoginUrl)

  loginUrl.value = selectedCompanyData.value.autoLoginUrl

  console.log('loginURL: ', loginUrl.value)

  loginIdMatch.value = true
  extraMatch.value = true

  expoYear.value = parseInt(selectedCompanyData.value.updatedAt.slice(0, 4))
  await checkExLink(selectedCompanyData.value.id)
  await saveDbLogin()
  // await checkLeadExtra()
  await createCompany_Service(selectedCompanyData, expoYear.value)
  loggedIn.value = true

  window.location.reload()
}
</script>
