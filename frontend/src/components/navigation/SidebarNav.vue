<template>
  <div :class="props.toggled ? ' ' : ' hide '"
       class="sidebar--page-wrapper">
    <div class="sidebar--content-container">

      <span>{{ eventStore.clientFull }} {{ eventStore.name }}</span>
      <h4 v-if="companyStore.name"> Hello, {{ companyStore.name }}</h4>

      <nav class="sidebar--nav-menu-wrapper --flex-grow-1">
        <div class="nav-buttons-grid--wrapper">
          <router-link
            :to="`/${eventStore.expo_Client}/${eventStore.expo_Year}/create-badge`"
            active-class="--secondary--invert"
            class="button"
            @click="$emit('closeNav')">
            <i class="bi-person-vcard-fill"/>
            Create Badge
          </router-link>

          <router-link
            :to="`/${eventStore.expo_Client}/${eventStore.expo_Year}/floor-plan`"
            active-class="--secondary--invert"
            class="button"
            @click="$emit('closeNav')">
            <i class="bi-geo-alt-fill"/>
            Floor Map
          </router-link>

          <router-link
            :to="`/${eventStore.expo_Client}/${eventStore.expo_Year}/leads-list`"
            active-class="--secondary--invert"
            class="button"
            @click="$emit('closeNav')">
            <i class="bi-person-circle"/>
            My Leads
          </router-link>

          <router-link
            :to="`/${eventStore.expo_Client}/${eventStore.expo_Year}/profile`"
            active-class="--secondary--invert"
            class="button"
            @click="$emit('closeNav')">
            <i class="bi-gear-fill"/>
            Company Profile
          </router-link>

          <a v-if="companyStore.login_Url"
             :href="'https://app.expofp.com' + companyStore.login_Url"
             class="button"
             target="_blank">
            <i class="bi-arrow-up-right-square"></i>
            ExpoFP Profile
          </a>
        </div>
      </nav>
      <div
        class="col-12-300 --flex-basis-5 --justify-content-end"
        @click="$emit('closeNav')"
      >
        <router-link
          v-if="session.data === null"
          :to="{name: 'Login'}"
          class="button"
        >
          Login
        </router-link>
        <router-link
          v-if="session.data !== null && session.data.user.role === 'admin'"
          :to="{name: 'Manage Attendees'}"
          class="button"
        >
          Admin Dashboard
        </router-link>
        <ButtonSignOut/>
      </div>
    </div>
  </div>
</template>

<script lang="ts"
        setup>
import ButtonSignOut from "../Button_SignOut.vue"
import { useEventLocalStore } from "@/stores/event.ts";
import { useCompanyLocalStore } from "@/stores/company.ts";
import { authClient } from "@/lib/auth-client.ts"

const session = authClient.useSession()

const companyStore = useCompanyLocalStore()
const eventStore = useEventLocalStore()

const props = defineProps({
  toggled: {type: Boolean, default: false}
})
</script>
