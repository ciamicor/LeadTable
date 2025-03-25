<template>
  <div class="submit-form row">
    <div v-if="!submitted"
         class="col-6">
      <div class="form-group">
        <label for="title">Title</label>
        <input
          id="title"
          v-model="lead.title"
          class="form-control"
          name="title"
          required
          type="text"
        />
      </div>

      <div class="form-group">
        <label for="title">Description</label>
        <input
          id="description"
          v-model="lead.description"
          class="form-control"
          name="description"
          required
          type="text"
        />
      </div>

      <button class="--success"
              @click="saveLead">Create Lead
      </button>
    </div>

    <div v-else>
      <h4>Lead successfully added.</h4>
      <button class="--secondary"
              @click="newLead"></button>
    </div>
  </div>
</template>

<script setup>
import LeadDataService from "@/services/LeadDataService.js";
import { ref } from "vue";

/*-| Variables |-*/
/*---+----+---+----+---+----+---+----+---*/
let lead = ref(
  {
    id: null,
    title: '',
    description: '',
    published: false,
  }
)

let submitted = false

/*-| Functions |-*/
/*---+----+---+----+---+----+---+----+---*/

function saveLead() {
  let data = {
    title: lead.value.title,
    description: lead.value.description,
  }

  LeadDataService.create( data )
    .then( ( response ) => {
      this.lead.id = response.data.id
      console.log( response.data )
      this.submitted = true
    } )
    .catch( ( e ) => {
      console.log( e )
    } )
}

function newLead() {
  this.submitted = false
  this.lead = {}
}
</script>

<style scoped></style>
