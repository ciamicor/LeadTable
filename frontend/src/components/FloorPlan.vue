<script lang="ts"
        setup>
const link = "https://2025NYIFTExpo.expofp.com?allowConsent=false"

</script>

<template>
  <iframe :src="link"
          allow="clipboard-read; clipboard-write"
          class="view-floor-plan"
          style="
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            width:100%;
            height:100%"
  >
  </iframe>

  <div class="view-floor-plan">
    <iframe :src="link"
            allow="clipboard-read; clipboard-write"
            style="
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            width:100%;
            height:100%"
    >
    </iframe>
  </div>
</template>

<style scoped>

</style>
