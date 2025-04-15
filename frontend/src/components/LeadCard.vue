<template>

  <div id="details">
    <div id="name">{{ lead.name_First }} {{ lead.name_Last }}</div>
    <span id="employment">{{ lead.title + ',' }} {{ lead.employer }}</span>
  </div>
  <div id="contact">
    <div>
      <a id="email"
         :href="'mailto:' + lead.email"><i class="bi-chat-left-dots --p-r-2" />
        {{ lead.email }}</a>
    </div>
    <div>
      <a id="phone"
         :href="'tel:' + lead.phone"><i class="bi-telephone-outbound --p-r-2" />
        {{ lead.phone }}</a>
    </div>
  </div>
  <div id="address">
    <div>
      <span id="address">
        <i class="bi-map --p-r-2" />
        {{ lead.address }}
      </span>
    </div>
  </div>
  <div id="score">
    <i v-for="n in lead.score"
       class="bi-star-fill">
    </i>
  </div>
  <div id="comment">{{ lead.comment }}</div>

</template>
<script>
export default {
  name: 'LeadCard',
  props: {
    lead: {}
  }
}
</script>

<!--  <button class="&#45;&#45;square &#45;&#45;warn&#45;&#45;invert"
            @click="$emit(deleteLead(lead.id))">
      <svg
        fill="none"
        height="20"
        stroke="currentColor"
        stroke-width="1.5"
        viewBox="0 0 24 24"
        width="24"
        xmlns="http://www.w3.org/2000/svg">
        <path d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              stroke-linecap="round"
              stroke-linejoin="round" />
      </svg>
    </button>-->
