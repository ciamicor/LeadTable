<template>
  <div class="container --place-content-start">
    <div class="row-12-300  --p-6">
      <RouterLink
        :to="{name:'Dashboard'}"
        active-class="--success--invert"
        class="button"
      >
        Dashboard
      </RouterLink>
      <RouterLink
        :to="{name:'Manage Expo'}"
        active-class="--success--invert"
        class="button"
      >
        Manage Expo
      </RouterLink>
      <!--      <RouterLink
              :to="{name:'Badges'}"
              active-class="&#45;&#45;secondary&#45;&#45;invert"
              class="button"
            >
              Badges
            </RouterLink>-->
      <div class="--flex-grow-1"></div>
      <RouterLink
        :to="{name:'Users'}"
        active-class="--success--invert"
        class="button --justify-self-end"
      >
        Users
      </RouterLink>
    </div>
    <RouterView/>
  </div>
</template>

<script lang="ts"
        setup>

</script>
