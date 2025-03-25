<template>
  <div class="row">
    <h2 class="col-12">Edit a Lead</h2>
  </div>
  <!--  <div v-if="currentLead">
      <h4>Lead</h4>
      <form action="">
        <div class="form-group">
          <label for="title">Title</label>
          <input
            id="title"
            v-model="currentLead.title"
            class="form-control"
            placeholder="Enter title"
            type="text"
          />
        </div>
        <div class="form-group">
          <label for="description">Description</label>
          <input
            id="description"
            v-model="currentLead.description"
            class="form-control"
            placeholder="Enter description"
            type="text"
          />
        </div>
        <div class="form-group">
          <label for=""></label>
          {{ currentLead.published ? 'published' : 'pending' }}
        </div>
      </form>

      <button class="&#45;&#45;badge &#45;&#45;primary"
              @click="updatePublished(false)">Unpublish
      </button>
      <button class="&#45;&#45;badge &#45;&#45;primary"
              @click="updatePublished(true)">Publish
      </button>
      <button class="&#45;&#45;badge &#45;&#45;danger"
              @click="deleteLead">Delete
      </button>
      <button class="&#45;&#45;badge &#45;&#45;danger"
              @click="updateLead">Update
      </button>
    </div>
    <div v-else>
      <p>Select a lead for more information.</p>
    </div>-->
</template>

<script setup>
import { onMounted, ref } from 'vue'
import LeadDataService from '../services/LeadDataService.js'

/*-| Variables |-*/
/*---+----+---+----+---+----+---+----+---*/
let currentLead = ref( null )
let message = ref( '' )

/*-| Functions |-*/
/*---+----+---+----+---+----+---+----+---*/
function getLead( id ) {
  LeadDataService.get( id )
    .then( ( response ) => {
      currentLead = response.data
      console.log( response.data )
    } )
    .catch( ( e ) => {
      console.log( e )
    } )
}

function updatePublished( status ) {
  let data = {
    id: currentLead.value.id,
    title: currentLead.value.title,
    description: currentLead.value.description,
    published: status,
  }

  LeadDataService.update( currentLead.value.id, data )
    .then( ( response ) => {
      console.log( response.data )
      currentLead.value.published = status
      message.value = 'Status successfully updated'
    } )
    .catch( ( e ) => {
      console.log( e )
    } )
}

function updateLead() {
  LeadDataService.update( currentLead.value.id, currentLead ).then( ( response ) => {
    console.log( response.data )
    message.value = 'Lead successfully updated'
  } )
}

function deleteLead() {
  LeadDataService.delete( currentLead.value.id )
    .then( ( response ) => {
      console.log( response.data )
      this.$router.push( { name: 'leads' } )
    } )
    .catch( ( e ) => {
      console.log( e )
    } )
}

// onMounted( (message.value = ''), getLead( this.$route.params.id ) )
</script>

<style scoped></style>
