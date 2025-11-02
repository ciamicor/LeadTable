<template>
  <div class="modal-backdrop">
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
import { useExpoLocalStore, useExhibitorLocalStore, useSessionStore } from '@/stores.ts'

const sessionStore = useSessionStore()
const exhibitorLocal = useExhibitorLocalStore()
const expoLocal = useExpoLocalStore()
</script>

