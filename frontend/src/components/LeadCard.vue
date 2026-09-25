<template>
  <div class="col-12-300 lead-card--details">
    <div class="row-12-300 --align-items-center --justify-content-space-between">
      <div class="lead-card--name">{{ lead.name_First }} {{ lead.name_Last }}</div>
      <div class="row-2-300 --w-max-content --flex-nowrap">
        <button v-if="lead.synced"
                class="--justify-self-end --p-v-3 --p-h-6"
                @click.stop=" toggleModal_Edit ">
          <i class="bi-pencil"/></button>
        <button v-if="lead.synced"
                class="--warn --justify-self-end --p-3"
                @click.stop="toggleModal_Delete">
          <i class="bi-trash"/>
        </button>

      </div>
      <button v-if="!lead.synced"
              class="--secondary --justify-self-end --p-3"
              @click="attemptSync(lead)">
        <i class="bi-exclamation-triangle --m-r-4"/>Unsynced
      </button>
    </div>
    <LeadEditModal :lead="lead"
                   :visible="modalEditVisible"
                   @show-modal="toggleModal_Edit"/>
    <ModalFull
      :modal-visible="modalDeleteVisible"
      :text="`Deleting ${lead.name_First} ${lead.name_Last} is permanent and cannot be undone.`"
      button-confirm-text="Delete Lead"
      title="Are you sure?"
      @cancel="toggleModal_Delete"
      @confirm="() =>  {toggleModal_Delete(); deleteLead(lead.id)}"
    />
    <div class="row-12-300 --justify-items-start --m-0 --gap-2">
      <span id="employment">{{ lead.title ? lead.title : "" }} </span>
      <span v-if="lead.title && lead.employer">–</span>
      <span id="employment"> {{ lead.employer ? lead.employer : "" }}</span>
    </div>
  </div>
  <div
    class="lead-card--contact">
    <a
      :href="'mailto:' + lead.email"
      class="lead-card--email">
      <i class="bi-chat-left-dots --p-r-2"/>
      {{ lead.email }}
    </a>
    <a v-if="lead.phone.length >= 7"
       :href="'tel:' + lead.phone"
       class="lead-card--phone">
      <i class="bi-telephone-outbound --p-r-2"/>
      {{ lead.phone }}
    </a>
    <div
      class="lead-card--address">
      <i class="bi-map --p-r-2"/>
      <span v-if="lead.address_Line1">{{ `${lead.address_Line1}` }}</span>
      <span v-if="lead.address_Line2">{{ `, ${lead.address_Line2}` }}</span>
      <span v-if="lead.address_City">{{ ` ${lead.address_City}` }}</span>
      <span v-if="lead.address_State">{{ `, ${lead.address_State}` }}</span>
      <span v-if="lead.address_Zip">{{ ` ${lead.address_Zip}` }}</span>
      <span v-if="lead.address_Country">{{ ` ${lead.address_Country}` }}</span>
    </div>
  </div>

  <div class="lead-card--score">
    <i v-for="n in scoreCount.score"
       class="bi-star-fill">
    </i>
    <i v-for="n in scoreCount.unscored"
       class="bi-star">
    </i>
  </div>

  <div id="comment">{{ lead.comment }}</div>

</template>
<script lang="ts"
        setup>
import { defineProps, computed, ref } from "vue";
import LeadEditModal from "@/components/LeadEditModal.vue";
import {
  createLead_Service,
  deleteLead_Service,
  deleteLocalLead
} from "@/services/LeadDataService.ts"
import { db } from "@/db.ts"
import { checkError } from "@/services/ErrorService.ts"
import ModalFull from "@/components/modals/ModalFull.vue"

const props = defineProps({
  lead: {
    type: Object, default: () => {
    }
  }
})

const modalEditVisible = ref(false)
const modalDeleteVisible = ref(false)

function toggleModal_Delete() {
  modalDeleteVisible.value = !modalDeleteVisible.value
}

function toggleModal_Edit() {
  modalEditVisible.value = !modalEditVisible.value
}

const scoreCount = computed(() => {
  const unscored = 5 - parseInt(props.lead.score)
  return {"score": props.lead.score, "unscored": unscored}
})

async function attemptSync(l: any) {
  console.log("attempting to sync lead:", l)
  const idHold = l.id
  try {
    const leadAttempt = await createLead_Service(l)
    checkError(leadAttempt)
    console.log("lead id is:", l.id)
    await db.leads.update(idHold,
      {id: leadAttempt.id, synced: true}
    )
    l.synced = true
  } catch (e) {
    console.error(e)
  }
}

async function deleteLead(i: number) {
  try {
    await deleteLocalLead(i)
    await deleteLead_Service(i)
  } catch (e) {
    console.log(e)
  }
}

</script>
