<template>
  <button v-if="sessionStore.logged_In === true"
          :class="props.css_classes"
          class="--float --top-r --warn--invert"
          @click="logOut">
    Sign Out
  </button>
</template>

<script lang="ts"
        setup>
import {db} from "@/db.ts";
import {useCompanyLocalStore, useExpoLocalStore, useSessionStore} from "@/stores.ts";

const sessionStore = useSessionStore()
const companyLocalData = useCompanyLocalStore()
const expoLocalData = useExpoLocalStore()

const props = defineProps(
  {
    css_classes: {type: String, default: ""}
  }
)

async function logOut() {
  // db.delete({ disableAutoOpen: false })
  db.profile.delete(1)
  loginIdMatch.value = false
  extraMatch.value = false
  sessionStore.logged_In = false
  companyLocalData.$reset()
  window.location.reload()
}
</script>
