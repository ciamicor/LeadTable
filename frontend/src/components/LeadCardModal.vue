<template>
  <!--  <div>-->
  <div v-show="visible"
       class="modal-backdrop">
    <div class="modal-wrapper">
      <div
        class="modal-content col-12-300">
        <h2>Editing Lead: {{ leadLocal.name_First }} {{ leadLocal.name_Last }}</h2>
        <div id="details"
             class="col-12-300">
          <div class="row-12-300">
            <label>
              First Name
              <input id="name_First"
                     v-model="leadLocal.name_First"/>
            </label>
            <label>
              Last Name
              <input id="name_Last"
                     v-model="leadLocal.name_Last"/>
            </label>
          </div>
          <label>
            Title
            <input id="title"
                   v-model="leadLocal.title">
          </label>
          <label>
            Company
            <input id="company"
                   v-model="leadLocal.employer">
          </label>
        </div>
        <div id="contact"
             class="col-12-300">
          <label>
            <span><i class="bi-chat-left-dots --p-r-2"/> Email</span>
            <input id="email"
                   v-model="leadLocal.email"/>
          </label>
          <label>
            <span><i class="bi-telephone-outbound --p-r-2"/> Phone</span>
            <input id="phone"
                   v-model="leadLocal.phone"/>
          </label>
          <label>
            <span><i class="bi-map --p-r-2"/> Address</span>
            <input id="address"
                   v-model="leadLocal.address"/>
          </label>
        </div>
        <div id="score">
          <i v-for="n in scoreCount.score"
             :key="n"
             class="bi-star-fill">
          </i>
          <i v-for="n in scoreCount.unscored"
             :key="n"
             class="bi-star">
          </i>
        </div>
        <label>
          Comment
          <textarea id="comment"
                    v-model="leadLocal.comment"/>
        </label>
        <div class="row-12-300 --place-content-space-between --place-items-space-between --p-t-6-clamp">
          <button class="col-12-300 col-6-500 col-5-800"
                  @click="$emit('showModal')">Cancel
          </button>
          <button class="--primary--invert col-12-300 col-6-500 col-5-800"
                  @click="updateLead_Service(leadLocal.id, leadLocal); $emit('showModal')">
            Save Changes
          </button>
        </div>

      </div>
    </div>
  </div>
</template>
<script lang="ts"
        setup>
import {defineProps, computed, defineEmits, ref} from "vue";
import {updateLead_Service} from "@/services/LeadDataService.ts";

const emit = defineEmits(["showModal"]);

const props = defineProps({
  lead: {
    type: Object, default: () => {
    }
  },
  visible: {type: Boolean, default: false},
})
const leadLocal = ref(props.lead)

const scoreCount = computed(() => {
  const unscored = 5 - parseInt(props.lead.score)
  return {"score": props.lead.score, "unscored": unscored}
})

</script>
