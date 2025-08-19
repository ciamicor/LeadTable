<template>
  <div class="sidebar--nav-wrapper">
    <nav class="sidebar--nav">
      <h4 v-if="companyLocalData.name"> Hello, {{ companyLocalData.name }}</h4>
      <router-link
        :to="`/${expoLocalData.expo_Client}/${expoLocalData.expo_Year}/floor-plan`"
        active-class="--secondary--invert"
        class="button --p-8"
        @click="$emit('closeNav')">
        <i class="bi-geo-alt-fill --m-r-4"/>
        Map
      </router-link>
      <router-link
        :to="`/${expoLocalData.expo_Client}/${expoLocalData.expo_Year}/leads-list`"
        active-class="--secondary--invert"
        class="button --p-8"
        @click="$emit('closeNav')">
        <i class="bi-person-circle --m-r-4"/>
        Leads
      </router-link>
      <router-link
        :to="`/${expoLocalData.expo_Client}/${expoLocalData.expo_Year}/profile`"
        active-class="--secondary--invert"
        class="button --p-8"
        @click="$emit('closeNav')">
        <i class="bi-gear-fill --m-r-4"/>
        Profile
      </router-link>
      <button
        v-if="sessionStore.logged_In"
        id="sign-out"
        class="--warn"
        @click="$emit('closeNav')">
        Sign Out
      </button>
      <button v-if="!sessionStore.logged_In"
              id="sign-in"
      >
        Sign In
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
