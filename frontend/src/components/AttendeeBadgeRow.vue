<template>
  <div class="badge-select-wrap">
    <div class="select-toggle">
      <button :class="!badgeSelected ? 'bi-x-lg bi-circle' :  'bi-check-lg --success --invert'"
              class=""
              @click="selectBadge(attendee)">
        <!--        {{ attendee.id }}-->
      </button>
    </div>
    <div class="col-10-300">
      <h3>
        {{ attendee.name_First }}
        {{ attendee.name_Last }}
      </h3>
      <p>
        {{ attendee.contact_Employer }}
      </p>
      <p>
        {{ attendee.title }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits( [ 'addBadge', 'removeBadge' ] )
const prop = defineProps( {
  attendee: Object,
  showBadge: { type: Boolean, default: true }
} )

const badgeSelected = ref( false )

function selectBadge( i ) {
  badgeSelected.value = !badgeSelected.value
  if ( badgeSelected.value ) {
    console.log( 'add' )
    emit( 'addBadge', i )
  } else if ( !badgeSelected.value ) {
    console.log( 'remove' )
    emit( 'removeBadge', i.id )
  }
}

</script>
