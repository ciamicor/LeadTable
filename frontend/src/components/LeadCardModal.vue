<template>
  <div id="details"
       class="col-12-300">
    <div id="name">{{ lead.name_First }} {{ lead.name_Last }}</div>
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
