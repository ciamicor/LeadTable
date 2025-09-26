<template>
  <div class="badge-select-wrap"
  >
    <div class="select-toggle ">
      <button :class="!badgeSelected ? 'bi-x-lg bi-circle' :  'bi-check-lg --success --invert'"
              class="--p-4"
              @click.stop="selectBadge(attendee)">
      </button>
      <button class="--justify-self-end --p-4"
              @click.stop="toggleModal"><i class="bi-pencil"/></button>
    </div>

    <AttendeeEditModal :attendee="attendee"
                       :visible="modalVisible"
                       @show-modal="toggleModal"/>
    <div>
      <span class="--font-size-14">{{ formatDateTime( attendee.createdAt ) }}</span>
      <h3 class="--font-size-20">
        {{ attendee.name_First }}
        {{ attendee.name_Last }}
      </h3>
      <p class="--font-size-16">
        {{ attendee.contact_Employer }}
      </p>
      <p class="--font-size-16">
        {{ attendee.title }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import LeadCardModal from "@/components/Elements/LeadEditModal.vue";
import AttendeeEditModal from "@/components/AttendeeEditModal.vue";

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

/*-| Modal
---+----+---+----+---+----+---+----+---*/
const modalVisible = ref( false )

function toggleModal() {
  modalVisible.value = !modalVisible.value
}

/*-| Formatting
---+----+---+----+---+----+---+----+---*/
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
