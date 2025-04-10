<template>
  <div
    class="badge-wrapper"
  >
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
      <img alt=""
           src="../assets/logos/nyift/nyift-vert-rgb.jpeg">
    </div>
  </div>
</template>
<script setup>
import QrCode from '@/components/QrCode.vue'

defineProps( {
  attendee: Object
} )

</script>
