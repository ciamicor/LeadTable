<template>
  <div :class="props.toggled ? ' ' : ' hide '"
       class="sidebar--page-wrapper">
    <div class="sidebar--content-container">

      <span>{{ expoLocal.expo_Client }} {{ expoLocal.expo_Year }} Suppliers' Day</span>
      <h4 v-if="exhibitorLocal.name"> Hello, {{ exhibitorLocal.name }}</h4>

      <nav class="sidebar--nav-menu-wrapper">
        <div class="nav-buttons-grid--wrapper">
          <router-link
            :to="`/${expoLocal.expo_Client}/${expoLocal.expo_Year}/create-badge`"
            active-class="--secondary--invert"
            class="button"
            @click="$emit('closeNav')">
            <i class="bi-person-vcard-fill"/>
            Create Badge
          </router-link>

          <router-link
            :to="`/${expoLocal.expo_Client}/${expoLocal.expo_Year}/floor-plan`"
            active-class="--secondary--invert"
            class="button"
            @click="$emit('closeNav')">
            <i class="bi-geo-alt-fill"/>
            Map
          </router-link>

          <router-link
            :to="`/${expoLocal.expo_Client}/${expoLocal.expo_Year}/leads-list`"
            active-class="--secondary--invert"
            class="button"
            @click="$emit('closeNav')">
            <i class="bi-person-circle"/>
            Leads
          </router-link>

          <router-link
            :to="`/${expoLocal.expo_Client}/${expoLocal.expo_Year}/profile`"
            active-class="--secondary--invert"
            class="button"
            @click="$emit('closeNav')">
            <i class="bi-gear-fill"/>
            Profile
          </router-link>

          <a v-if="exhibitorLocal.login_Url"
             :href="'https://app.expofp.com' + exhibitorLocal.login_Url"
             class="button"
             target="_blank">
            <i class="bi-arrow-up-right-square"></i>
            ExpoFP Profile
          </a>
        </div>
      </nav>
      <router-link
        v-if="authSession.data"
        :to="`admin`"
        class="button"
        @click="$emit('closeNav')">
        Admin Dashboard
      </router-link>
      <ButtonSignOut/>
    </div>
  </div>
</template>

<script lang="ts"
        setup>
import { useExpoLocalStore, useExhibitorLocalStore, useSessionStore } from '@/stores.ts'
import { authClient } from "@/lib/auth-client.ts"; //import the auth client
import { authSignOut } from "@/services/functions/BetterAuthFunc.ts";
import ButtonSignOut from '../Button_SignOut.vue'

const authSession = authClient.useSession()

const sessionStore = useSessionStore()
const exhibitorLocal = useExhibitorLocalStore()
const expoLocal = useExpoLocalStore()

const props = defineProps({
  toggled: {type: Boolean, default: false}
})

async function authClientSignOut() {
  await authSignOut()
}

</script>
