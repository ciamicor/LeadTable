<template>
  <div id="details"
       class="col-12-300 --gap-2">
    <div class="row-12-300 --align-items-end --justify-content-space-between --gap-12">
      <div id="name">{{ lead.name_First }} {{ lead.name_Last }}</div>
      <div id="score"
           class="--justify-self-end">
        <i class="bi-star-fill"></i>
        <span id="score-value">{{ lead.score }}</span>
      </div>
    </div>
    <span id="employment">{{ lead.title ? lead.title : '' }}</span>
    <span id="employment">{{ lead.employer ? 'at ' + lead.employer : '' }}</span>
  </div>
  <div id="contact"
       class="row-12-300 --gap-col-10">
    <a id="email"
       :href="'mailto:' + lead.email"><i class="bi-chat-left-dots --p-r-2"/>
      {{ lead.email }}</a>
    <a id="phone"
       :href="'tel:' + lead.phone"><i class="bi-telephone-outbound --p-r-2"/>
      {{ lead.phone }}</a>
  </div>
  <div v-show="lead.address_Country != null"
       id="address">
    <i class="bi-map --p-r-2"/>
    {{ lead.address_Country }}
  </div>

  <div id="comment">{{ lead.comment }}</div>

  <div class="row-12-300">
    <button class="--flex-grow-1 --p-4"
            @click.stop="toggleModal"><i class="bi-pencil"/>
    </button>
    <!--    <button class="&#45;&#45;warn &#45;&#45;flex-grow-0 &#45;&#45;p-4"
                @click="deleteLead(leadLocal.id)"
        ><i class="bi-trash3-fill"></i></button>-->
  </div>
  <LeadEditModal :lead="lead"
                 :visible="modalVisible"
                 @show-modal="toggleModal"/>

</template>
<script lang="ts"
        setup>
import { defineProps, computed, ref, defineEmits } from "vue";
import LeadEditModal from "@/components/elements/LeadEditModal.vue";
import { deleteLead_Service } from "@/services/LeadDataService.ts";

const props = defineProps({
  lead: {
    type: Object, default: () => {
    }
  }
})

const modalVisible = ref(false)

function toggleModal() {
  modalVisible.value = !modalVisible.value
}

/*-| Delete Lead
---+----+---+----+---+----+---+----+---*/
const confirmDelete = ref(false)

async function deleteLead(id: number) {
  await deleteLead_Service(id)
  emit('showModal')
}

</script>
