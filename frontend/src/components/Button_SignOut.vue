<template>
  <button v-if="sessionStore.logged_In === true"
          :class="props.css_classes + '--warn--invert'"
          @click="logOut">
    Sign Out
  </button>
</template>

<script lang="ts"
        setup>
import { db } from "@/db.ts";
import { useCompanyLocalStore, useSessionStore } from "@/stores.ts";

const sessionStore = useSessionStore()
const companyLocalData = useCompanyLocalStore()

const props = defineProps(
  {
    css_classes: {type: String, default: ""},
    loginIdMatch: {type: Boolean, default: undefined},
    extraMatch: {type: Boolean, default: undefined}
  }
)

async function logOut() {
  console.log("Company local:", companyLocalData.name)
  console.log("loginId match:", props.loginIdMatch)
  console.log("extras match:", props.extraMatch)
  db.profile.delete(1)
  sessionStore.logged_In = false
  companyLocalData.$reset()
  console.log("Company local:", companyLocalData.name)
  console.log("loginId match:", props.loginIdMatch)
  console.log("extras match:", props.extraMatch)
}

</script>
