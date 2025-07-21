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
import {logOut_Exhibitor} from "@/services/functions/LoginLogout.ts";

const sessionStore = useSessionStore()
const companyLocalData = useCompanyLocalStore()
const expoLocalData = useExpoLocalStore()

const props = defineProps(
  {
    css_classes: {type: String, default: ""}
  }
)

async function logOut() {
  await logOut_Exhibitor()
}
</script>
