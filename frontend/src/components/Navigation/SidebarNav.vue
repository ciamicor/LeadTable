<template>
  <div :class="props.toggled ? ' ' : ' hide '"
       class="sidebar--page-wrapper">
    <div class="sidebar--content-container">

      <span>{{ expoLocalData.expo_Client }} {{ expoLocalData.expo_Year }} Suppliers' Day</span>
      <h4 v-if="companyLocalData.name"> Hello, {{ companyLocalData.name }}</h4>

      <nav class="sidebar--nav-menu-wrapper">
        <div class="nav-buttons-grid--wrapper">
          <router-link
            :to="`/${expoLocalData.expo_Client}/${expoLocalData.expo_Year}/create-badge`"
            active-class="--secondary--invert"
            class="button --stacked"
            @click="$emit('closeNav')">
            <i class="bi-person-vcard-fill"/>
            Create Badge
          </router-link>

          <router-link
            :to="`/${expoLocalData.expo_Client}/${expoLocalData.expo_Year}/floor-plan`"
            active-class="--secondary--invert"
            class="button --stacked"
            @click="$emit('closeNav')">
            <i class="bi-geo-alt-fill"/>
            Map
          </router-link>

          <router-link
            :to="`/${expoLocalData.expo_Client}/${expoLocalData.expo_Year}/leads-list`"
            active-class="--secondary--invert"
            class="button --stacked"
            @click="$emit('closeNav')">
            <i class="bi-person-circle"/>
            Leads
          </router-link>

          <router-link
            :to="`/${expoLocalData.expo_Client}/${expoLocalData.expo_Year}/profile`"
            active-class="--secondary--invert"
            class="button --stacked"
            @click="$emit('closeNav')">
            <i class="bi-gear-fill"/>
            Profile
          </router-link>
        </div>

      </nav>
      <router-link
        v-if="authSession.data"
        :to="`/admin-dashboard`"
        active-class="--secondary--invert"
        class="button"
        @click="$emit('closeNav')">
        Admin Dashboard
      </router-link>
      <button v-if="authSession.data"
              class="--warn"
              @click="authClientSignOut">Sign Out
      </button>
    </div>
  </div>
</template>

<script lang="ts"
        setup>
import { useExpoLocalStore, useCompanyLocalStore, useSessionStore } from '@/stores.ts'
import { authClient } from "@/lib/auth-client.ts"; //import the auth client
import { authSignOut } from "@/services/functions/BetterAuthFunc.ts";

const authSession = authClient.useSession()

const sessionStore = useSessionStore()
const companyLocalData = useCompanyLocalStore()
const expoLocalData = useExpoLocalStore()

const props = defineProps({
  toggled: {type: Boolean, default: false}
})

async function authClientSignOut() {
  await authSignOut()
  loginEmail.value = ""
  loginPass.value = ""
  loginUser_Name.value = ""
}

</script>
