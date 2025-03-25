<template>
  <div>
    <div class="input-group">
      <input v-model="title"
             class="form-control"
             placeholder="Search by title"
             type="text"/>
      <button class="--outline"
              type="button"
              @click="searchTitle">Search
      </button>
    </div>
  </div>

  <div>
    <h4>Leads List</h4>
    <ul class="list-group">
      <li
        v-for="(lead, index) in leads"
        :key="index"
        :class="{ active: index === currentIndex }"
        class="list-group-item"
        @click="setActiveLead(lead, index)"
      >
        {{ lead.title }}
      </li>
    </ul>
  </div>

  <div>
    <div v-if="currentLead">
      <h4>Lead</h4>
      <div><label for="title">Title</label> {{ currentLead.title }}</div>
      <div><label for="description">Description</label> {{ currentLead.description }}</div>
      <div><label for="published">Published</label> {{ currentLead.published }}</div>

      <router-link :to="'/leads/' + currentLead.id">Edit</router-link>
    </div>
    <div v-else>
      <p>Select a lead for more information.</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import LeadDataService from '../services/LeadDataService.js'

/*-| Variables |-*/
/*---+----+---+----+---+----+---+----+---*/
let leads = ref( [] )
let currentLead = ref( null )
let currentIndex = ref( -1 )
let title = ref( null )

/*-| Functions |-*/
/*---+----+---+----+---+----+---+----+---*/
function retrieveLeads() {
  LeadDataService.getAll()
    .then( ( response ) => {
      this.leads = response.data
      console.log( response.data )
    } )
    .catch( ( e ) => {
      console.log( e )
    } )
}

/*function refreshLeads() {
  retrieveLeads()
  this.currentLead = null
  this.currentIndex = -1
}*/

function setActiveLead( lead, index ) {
  this.currentLead = lead
  this.currentIndex = lead ? index : -1
}

function searchTitle() {
  LeadDataService.findByTitle( this.title )
    .then( ( response ) => {
      this.leads = response.data
      this.setActiveLead( null )
      console.log( response.data )
    } )
    .catch( ( e ) => {
      console.log( e )
    } )
}

onMounted( retrieveLeads() )
</script>

<style scoped></style>
