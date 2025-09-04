<template>
  <div :class="props.toggled ? ' ' : ' hide '"
       class="sidebar--nav-wrapper">

    <span>{{ expoLocalData.expo_Client }} {{ expoLocalData.expo_Year }} Suppliers' Day</span>
    <h4 v-if="companyLocalData.name"> Hello, {{ companyLocalData.name }}</h4>

    <nav class="sidebar--nav">
      <div class="nav-buttons-grid--wrapper">
        <router-link
          :to="`/${expoLocalData.expo_Client}/${expoLocalData.expo_Year}/create-badge`"
          active-class="--secondary--invert"
          class="button --stacked"
          @click="$emit('closeNav')">
          <i class="bi-person-circle"/>
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

const sessionStore = useSessionStore()
const companyLocalData = useCompanyLocalStore()
const expoLocalData = useExpoLocalStore()

const props = defineProps({
  toggled: {type: Boolean, default: false}
})

</script>
