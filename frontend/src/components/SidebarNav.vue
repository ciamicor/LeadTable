<template>
  <div class="sidebar--nav-wrapper">
    <nav class="sidebar--nav">
      <h4> Hello, {{ companyLocalData.name }}</h4>
      <button v-if="!sessionStore.logged_In"
              class="">Sign In
      </button>
      <router-link
        :to="`/${expoLocalData.expo_Client}/${expoLocalData.expo_Year}/floor-plan`"
        active-class="--secondary"
        class="button --p-8">
        <i class="bi-geo-alt-fill --m-r-4"/>
        Map
      </router-link>
      <router-link
        :to="`/${expoLocalData.expo_Client}/${expoLocalData.expo_Year}/leads-list`"
        active-class="--secondary"
        class="button --p-8">
        <i class="bi-person-circle --m-r-4"/>
        Leads
      </router-link>
      <router-link
        :to="`/${expoLocalData.expo_Client}/${expoLocalData.expo_Year}/profile`"
        active-class="--secondary"
        class="button --p-8">
        <i class="bi-gear-fill --m-r-4"/>
        Profile
      </router-link>
      <button v-if="sessionStore.logged_In"
              class="--warn">Log Out
      </button>
    </nav>
  </div>
</template>

<script lang="ts"
        setup>
import {useExpoLocalStore, useCompanyLocalStore, useSessionStore} from '@/stores.js'
import {ref} from "vue";

const sessionStore = useSessionStore()
const companyLocalData = useCompanyLocalStore()
const expoLocalData = useExpoLocalStore()


</script>
