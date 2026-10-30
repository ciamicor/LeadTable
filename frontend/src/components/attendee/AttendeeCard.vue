<template>
  <div class="badge-select-wrap"
  >
    <div class="select-toggle --gap-2">
      <button :class="!badgeSelected ? 'bi-x-lg bi-circle' :  'bi-check-lg --success --invert'"
              class="--p-3 --font-size-14"
              @click.stop="selectBadge(attendee)">
      </button>
    </div>
    <AttendeeEditModal
      v-if="a"
      :attendee="a"
      :visible="modalVisible"
      @update="(a) => { emit('updateAttendee', idx, a)}"
      @show-modal="toggleModal"/>
    <ModalFull
      :modal-visible="modalDeleteVisible"
      :text="`Deleting ${attendee.name_First} ${attendee.name_Last} from ${makeDate( attendee.createdAt )} is permanent and cannot be undone.`"
      button-confirm-text="Delete Attendee"
      title="Are you sure?"
      @cancel="toggleModal_Delete"
      @confirm="() =>  {toggleModal_Delete(); $emit('deleteAttendee', idx); deleteAttendee(attendee.id)}"
    />
    <div class="row-12-300 --gap-6 --p-0 --align-items-center justify-items-start ">
      <h3 class="--font-size-18">
        {{ attendee.name_First }}
        {{ attendee.name_Last }}
      </h3>
      <p class="--font-size-14 --color-grey-5">
        {{ attendee.contact_Employer }}
      </p>
      <p class="--font-size-14 --color-grey-5">
        {{ attendee.title }}
      </p>
      <span class="--flex-grow --font-size-12 --color-grey-7 --justify-self-end"
            style="text-align: end;">
        {{
          makeDate( attendee.createdAt ).toString().replace( /\:\d\d ([PM|AM])/, " $1" )
        }}
      </span>
    </div>
    <div class="select-toggle --gap-4">
      <button class="--p-3  --p-h-5 --font-size-14"
              @click.stop="toggleModal"><i class="bi-pencil"/></button>
      <button class="--warn --p-3  --font-size-14"
              @click="toggleModal_Delete">
        <i class="bi-trash"/>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue"
import AttendeeEditModal from "@/components/attendee/AttendeeEditModal.vue";
import ModalFull from "@/components/modals/ModalFull.vue";
import { deleteAttendee_Service } from "@/services/AttendeeDataService.ts";

const emit = defineEmits( [ "addBadge", "removeBadge", "updateAttendee" ] )
const prop = defineProps( {
  idx: Number,
  attendee: {
    type: Object, default: () => ({})
  },
  showBadge: { type: Boolean, default: true }
} )

const modalDeleteVisible = ref( false )
const badgeSelected = ref( false )
const a = ref()

function selectBadge( i ) {
  badgeSelected.value = !badgeSelected.value
  if ( badgeSelected.value ) {
    console.log( "add" )
    emit( "addBadge", i )
  } else if ( !badgeSelected.value ) {
    console.log( "remove" )
    emit( "removeBadge", i.id )
  }
}

/*-| Modal |-*/
/*---+----+---+----+---+----+---+----+---*/
const modalVisible = ref( false )

function toggleModal() {
  a.value = prop.attendee
  modalVisible.value = !modalVisible.value
  if ( !modalVisible.value ) {
    // emit( "updateAttendee", prop.idx, a.value )
    // a.value = null
  }
}

function toggleModal_Delete() {
  modalDeleteVisible.value = !modalDeleteVisible.value
}

async function deleteAttendee( i ) {
  try {
    await deleteAttendee_Service( i )
  } catch ( e ) {
    console.log( e )
  }
}

/*-| Formatting |-*/
/*---+----+---+----+---+----+---+----+---*/
/*function convertTZ( date, tzString ) {
  return new Date( (typeof date === "string" ? new Date( date ) : date).toLocaleString( "en-US",
    { timeZone: tzString } ) );
}*/
function makeDate( date ) {
  return new Date( date ).toLocaleString()
}

function formatDateTime( dt ) {
  let d = dt.slice( 0, 10 )
  let t = dt.slice( -13, -8 )
  let h = parseInt( t.slice( -5, -3 ) )
  /*-| Get Hour |-*/
  if ( h > 12 ) {
    h = h - 12
    t = h.toString() + t.slice( 2 ) + " PM"
  } else if ( h <= 12 ) {
    t = t + " AM"
  }

  return "Created: " + d + " at " + t
}

</script>
