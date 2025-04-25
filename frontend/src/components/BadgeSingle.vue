<template>
  <!--  <div
      v-show="showBadge">
    >-->
  <div class="--attendee-info-container">
    <p class="--employer"
       style="width: 100%">
      {{ attendee.contact_Employer }}
    </p>
    <h1 class="--name">
      {{ attendee.name_First }}
      {{ attendee.name_Last }}
    </h1>
    <p class="--title">
      {{ attendee.title }}
    </p>
  </div>
  <div class="badge--images-container">
    <QrCode
      :size="215"
      :url-value="attendee.id.toString()"
      class="badge--qr"
    ></QrCode>
    <img :src="getImageUrl(`${expoLocalData.expo_Client.toString().toLowerCase()}-vert-rgb`)"
         alt=""
    >
  </div>
  <!--  </div>-->
</template>
<script setup>
import QrCode from '@/components/QrCode.vue'
import { useExpoLocalStore } from "@/stores.js";

const expoLocalData = useExpoLocalStore();

function getImageUrl( name ) {
  return new URL( `../../public/logos/${ expoLocalData.expo_Client.toString().toLowerCase() }/${ name }.jpeg`, import.meta.url ).href
}

defineProps( {
  attendee: Object,
  showBadge: { type: Boolean, default: true }
} )

</script>
