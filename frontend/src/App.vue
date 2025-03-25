<template>
  <div class="row">
    <h1>Lead Table</h1>
  </div>
  <nav class="row">
    <div class="col-4">
      <router-link class="button"
                   to="/leads-list">Leads List
      </router-link>
    </div>
    <div class="col-4">
      <router-link class="button"
                   to="/lead-edit">Edit Lead
      </router-link>
    </div>
    <div class="col-4">
      <router-link class="button"
                   to="/add-lead">Add Lead
      </router-link>
    </div>
  </nav>

  <div class="">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {},
}
</script>

<style>
@import "styles/main.css";
</style>
