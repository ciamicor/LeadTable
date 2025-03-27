<template>
  <div class="view-mask">
    <div class="view-container">
      <router-view/>
    </div>
  </div>
  <nav class="nav-bar">
    <router-link active-class="--secondary"
                 class="button"
                 to="/leads-list">
      <svg
        fill="none"
        height="24"
        stroke="currentColor"
        stroke-width="1.5"
        viewBox="0 0 24 24"
        width="24"
        xmlns="http://www.w3.org/2000/svg">
        <path d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              stroke-linecap="round"
              stroke-linejoin="round"/>
      </svg>
      Leads
    </router-link>
    <router-link active-class="--secondary"
                 class="button"
                 to="/scan-lead">
      <svg
        fill="none"
        height="24"
        stroke="currentColor"
        stroke-width="1.5"
        viewBox="0 0 24 24"
        width="24"
        xmlns="http://www.w3.org/2000/svg">
        <path d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 3.75 9.375v-4.5ZM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 0 1-1.125-1.125v-4.5ZM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 13.5 9.375v-4.5Z"
              stroke-linecap="round"
              stroke-linejoin="round"/>
        <path d="M6.75 6.75h.75v.75h-.75v-.75ZM6.75 16.5h.75v.75h-.75v-.75ZM16.5 6.75h.75v.75h-.75v-.75ZM13.5 13.5h.75v.75h-.75v-.75ZM13.5 19.5h.75v.75h-.75v-.75ZM19.5 13.5h.75v.75h-.75v-.75ZM19.5 19.5h.75v.75h-.75v-.75ZM16.5 16.5h.75v.75h-.75v-.75Z"
              stroke-linecap="round"
              stroke-linejoin="round"/>
      </svg>
      Scan
    </router-link>
    <router-link active-class="--secondary"
                 class="button"
                 to="/floor-plan">
      <svg
        fill="none"
        height="24"
        stroke="currentColor"
        stroke-width="1.5"
        viewBox="0 0 24 24"
        width="24"
        xmlns="http://www.w3.org/2000/svg">
        <path d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z"
              stroke-linecap="round"
              stroke-linejoin="round"/>
      </svg>
      Map
    </router-link>
  </nav>
</template>

<script setup>
import { ref } from "vue";

const activeView = ref( '' )

function setActiveView( view ) {
  activeView.value = view
}

</script>

<style>
@import "styles/main.css";
</style>
