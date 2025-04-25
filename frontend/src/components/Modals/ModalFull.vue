<template>
  <div class="modal-wrapper">
    <div class="modal-content col-12-300 col-8-600 col-6-800">
      <h2>This is the title.</h2>
      <p>
        This is some modal text. It tells you something.
      </p>
      <button>
        This is the modal button.
      </button>
    </div>
  </div>
</template>

<script lang="ts"
        setup>
import {useExpoLocalStore, useCompanyLocalStore, useSessionStore} from '@/stores.js'

const sessionStore = useSessionStore()
const companyLocalData = useCompanyLocalStore()
const expoLocalData = useExpoLocalStore()
</script>

