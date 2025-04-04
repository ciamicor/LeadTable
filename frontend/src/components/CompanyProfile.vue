<template>
  <button v-if="loggedIn"
          class="--float --top-r --warn"
          @click="signOut">
    Sign Out
  </button>

  <iframe
    v-if="linkMatch && extraMatch"
    :src="'https://app.expofp.com' + loginUrl"
    allow="clipboard-read; clipboard-write"
    class="view-floor-plan"
  >
  </iframe>
  <div v-else
       class="row">

    <div class="col-12">
      <h2>Lead Retrieval Login</h2>
      <label for="searchExhib">Select your Company</label>
      <input id="searchExhib"
             v-model.trim="exSearchObj.name"
             list="searchList"
             name="searchExhib"
             placeholder="Enter Company Name"
             type="text"
             @change="updateSearch($event)"
             @input="searchExhib()">
      <datalist id="searchList">
        <option v-for="(s, i) in exSearchResult"
                :key="i"
                :data-exid="s.id"
                :value="s.name"
        >
          {{ s.name }}
        </option>
      </datalist>
    </div>

    <div v-if="exSearchObj.id"
         class="col-12">
      <label
        for="profileUrl">
        Profile Url
      </label>
      <input id="profileUrl"
             v-model="loginUrl"
             name="profileUrl"
             type="text">
      <button class="--success"
              @click="checkExLink(exData.autoLoginUrl); checkLeadExtra()">
        Portal Login
      </button>
    </div>
  </div>

  <div v-if="(linkMatch === false) && loginUrl && exData"
       class="row">
    <p>Incorrect URL. You can find your exhibitor portal URL in the confirmation email from
       ExpoFP.</p>
  </div>

  <div v-if="!extraMatch && linkMatch"
       class="row">
    <p>You'll need to purchase lead retrieval to access. Purchase in your ExpoFP exhibitor
       profile.</p>
  </div>

  <div class="row">
    <div class="col-12">
      <div class="row">
        <p class="col-12">{{ exSearchObj }}</p>
        <p class="col-5">Link match: {{ linkMatch }}</p>
        <p class="col-5">Lead retrieval: {{ extraMatch }}</p>
      </div>
      <h2>Link</h2>
      <p>{{ loginUrl }}</p>
      <p>{{ exData ? exData.autoLoginUrl : null }}</p>
      <h2>Extras</h2>
      {{ exExtras }}
      <h2>exData</h2>
      {{ exData }}
    </div>
  </div>
  {{ exhibProfileData }}
</template>

<script lang="ts"
        setup>
import {
  getAllExhibitors,
  getExhibitor,
  getExhibExtras
} from "../services/ExpoFpDataService.ts"
import {createCompany_Service} from "@/services/CompanyDataService.ts";
import {inject, onBeforeMount, ref} from "vue";
import {liveQuery} from "dexie";
import {db} from "@/db.ts";

/*-| Variables |-*/
/*/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/*/
const exList = ref()
const exSearchObj = ref({
  name: "",
  id: ""
})
const exSearchResult = ref()
const exData = ref()
const exExtras = ref()
const linkMatch = ref(false)
const extraMatch = ref(false)
const expoYearGlobal = inject('expoYear')
const exhibProfileData = ref()

const loginUrl = ref('/exhibitors/details/edit?uid=73accba5-0b60-488c-acde-30f9d295edcb&token=fF7PY%252B1nPloFunSt0DmsGTHw8L1oa6Sf')
const loggedIn = ref(false)

/*-| Lifecycle |-*/
/*/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/*/
onBeforeMount(() => {
    getProfile()
    getAllEx()
  }
)

/*-| DB |-*/
/*/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/*/
const status = ref()

async function getProfile() {
  exhibProfileData.value = await db.profile.get(1)
  console.log("profile data ", exhibProfileData.value)
  exSearchObj.value.name = exhibProfileData.value.name
  exSearchObj.value.id = exhibProfileData.value.ex_Id
  loginUrl.value = exhibProfileData.value.login_Url

  if (exhibProfileData.value) {
    linkMatch.value = true
    extraMatch.value = true
    loggedIn.value = true
  }
}

async function saveDbLogin() {
  try {
    const id = await db.profile.add({
      ex_Id: exData.value.id,
      name: exData.value.name,
      login_Url: exData.value.autoLoginUrl,
      lead_Ret: !!extraMatch.value,
      expo_Year: expoYearGlobal
    });
    status.value = `${exData.value.name}
          successfully added. Got id ${id}`;
  } catch (error) {
    status.value = `Failed to add
          ${exData.value.name}: ${error}`;
  }
}

async function signOut() {
  db.delete({disableAutoOpen: false});
  linkMatch.value = false
  extraMatch.value = false
  loggedIn.value = false
  window.location.reload();
}

/*-| Function |-*/
/*/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/*/
function matchUrlParams(u: string) {
  return u.match(/(\?uid)(.*)(&token)/g)
}

async function getAllEx() {
  exList.value = await getAllExhibitors()
  console.log("exList: ", exList.value)
  // return fp.getAllExhibitors(exList)
}

async function getEx(id: any) {
  exData.value = await getExhibitor(id)
  console.log("exData: ", exData.value)
}

async function getExtras(id: any) {
  exExtras.value = await getExhibExtras(id)
  console.log("Extras: ", exExtras.value)
}

async function checkExLink(li: string) {
  console.log("checking link")
  let l = matchUrlParams(loginUrl.value)
  let d = matchUrlParams(li)
  console.log("l:", l, "d:", d)
  if (l[0] === d[0]) {
    console.log("linkmatch!")
    linkMatch.value = true
  }
}

async function checkLeadExtra() {
  console.log("checking lead retrieval purchase")
  extraMatch.value = await exExtras.value.some((e: any) =>
    e.name.toLowerCase().includes("lead retrieval")
  )
  console.log("lead retrieval purchased: ", extraMatch.value)
}

async function searchExhib() {
  exSearchObj.value.id = ""
  exSearchResult.value = exList.value.filter((e: any) =>
    e.name.toLowerCase().includes(exSearchObj.value.name.toLowerCase())
  ) // console.log("search: ", exSearchResult.value)
  return exSearchResult.value
}

async function getSelectedId(e: any) {
  const list = document.getElementById('searchList')
  for (let i = 0; i < list.childElementCount; i++) {
    console.log(list.children[i].attributes["data-exid"].value)
    exSearchObj.value.id = list.children[i].attributes["data-exid"].value
  }
}

async function updateSearch(e: any) {
  if (exSearchObj.value.name) {
    await getSelectedId(e)
  }
  await getEx(exSearchObj.value.id);
  await getExtras(exSearchObj.value.id);
  await checkExLink(exData.value.autoLoginUrl)
  await checkLeadExtra()

  console.log(extraMatch.value)
  if (extraMatch.value && linkMatch.value) {
    await saveDbLogin()
    await createCompany_Service(exData, expoYearGlobal)
    loggedIn.value = true
  }
}
</script>
