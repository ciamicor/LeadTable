<template>
  <div v-if="modalVisible"
       class="modal-backdrop">
    <div class="modal-content col-12-300 col-8-600 col-6-800">
      <h3>{{ title }}</h3>
      <p>
        {{ text }}
      </p>
      <div class="row-12-300 --p-t-7">
        <button class=" --flex-grow"
                @click="$emit('cancel')">
          {{ buttonCancelText }}
        </button>
        <button :class="`--${buttonConfirmColor}--invert --flex-grow`"
                @click="$emit('confirm')">
          {{ buttonConfirmText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts"
        setup>
import { useExpoLocalStore, useExhibitorLocalStore, useSessionStore } from "@/stores.js"

const props = defineProps({
  modalVisible: {type: Boolean, default: false},
  title: {type: String, default: "title"},
  text: {type: String, default: "text"},
  buttonCancelText: {type: String, default: "Cancel"},
  buttonConfirmText: {type: String, default: "Confirm"},
  buttonConfirmColor: {type: String, default: "warn"}
})

const sessionStore = useSessionStore()
const companyLocal = useExhibitorLocalStore()
const expoLocal = useExpoLocalStore()
</script>

