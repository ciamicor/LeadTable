<template>
  <div class="col-12-300 lead-card--details">
    <div class="row-12-300 --align-items-center --justify-content-space-between">
      <div class="lead-card--name">{{ lead.name_First }} {{ lead.name_Last }}</div>
      <button class="--justify-self-end --p-4"
              @click.stop="toggleModal"><i class="bi-pencil"/></button>
    </div>
    <LeadEditModal :lead="lead"
                   :visible="modalVisible"
                   @show-modal="toggleModal"/>
    <span id="employment">{{ lead.title ? lead.title : "" }}</span>
    <span id="employment">{{ lead.employer ? "at " + lead.employer : "" }}</span>
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
      <div class="--m-l-12">
        <span v-if="lead.address_City">{{ `${lead.address_City}` }}</span>
        <span v-if="lead.address_State">{{ `, ${lead.address_State}` }}</span>
        <span v-if="lead.address_Zip">{{ ` ${lead.address_Zip}` }}</span>
        <span v-if="lead.address_Country">{{ ` ${lead.address_Country}` }}</span>
      </div>
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

const scoreCount = computed(() => {
  const unscored = 5 - parseInt(props.lead.score)
  return {"score": props.lead.score, "unscored": unscored}
})

</script>
