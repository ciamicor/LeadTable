<template>
  <div class="badge-select-wrap">
    <div class="select-toggle">
      <button :class="!badgeSelected ? 'bi-x-lg bi-circle' :  'bi-check-lg --success --invert'"
              class=""
              @click="selectBadge(attendee)">
      </button>
    </div>
    <div>
      <span class="--font-size-14">{{ formatDateTime( attendee.createdAt ) }}</span>
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

function formatDateTime( dt ) {
  let d = dt.slice( 0, 10 )
  let t = dt.slice( -13, -8 )
  let h = parseInt( t.slice( -5, -3 ) )
  /*-| Get Hour |-*/
  if ( h > 12 ) {
    h = h - 12
    t = h.toString() + t.slice( 2 ) + ' PM'
  } else if ( h <= 12 ) {
    t = t + ' AM'
  }

  return 'Created: ' + d + ' at ' + t
}

</script>
