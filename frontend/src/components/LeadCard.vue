<template>
  <div id="details"
       class="col-12-300">
    <div class="row-12-300 --align-items-center --justify-content-space-between">
      <div id="name">{{ lead.name_First }} {{ lead.name_Last }}</div>
      <button class="--justify-self-end --p-4"
              @click.stop="toggleModal"><i class="bi-pencil"/></button>
    </div>
    <LeadCardModal :lead="lead"
                   :visible="modalVisible"
                   @show-modal="toggleModal"/>
    <span id="employment">{{ lead.title ? lead.title : '' }}</span>
    <span id="employment">{{ lead.employer ? 'at ' + lead.employer : '' }}</span>
  </div>
  <div id="contact"
       class="col-12-300">
    <a id="email"
       :href="'mailto:' + lead.email"><i class="bi-chat-left-dots --p-r-2"/>
      {{ lead.email }}</a>
    <a id="phone"
       :href="'tel:' + lead.phone"><i class="bi-telephone-outbound --p-r-2"/>
      {{ lead.phone }}</a>
    <span id="address">
        <i class="bi-map --p-r-2"/>
        {{ lead.address }}
      </span>
  </div>

  <div id="score">
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
import {defineProps, computed, ref} from "vue";
import LeadCardModal from "@/components/Elements/LeadEditModal.vue";

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
