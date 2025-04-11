<template>
  <qrcode-vue
    :background="background"
    :foreground='foreground'
    :gradient="gradient"
    :gradient-end-color="gradientEndColor"
    :gradient-start-color="gradientStartColor"
    :gradient-type="gradientType"
    :level="level"
    :render-as="renderAs"
    :value="value"
  />
  <!--    :image-settings='imageSettings'-->
</template>
<script lang="ts"
        setup>
import { ref } from 'vue'
import QrcodeVue from 'qrcode.vue'
import type { Level, RenderAs, GradientType, ImageSettings } from 'qrcode.vue'

const { urlValue } = defineProps({
  urlValue: String
})
const value = ref('http://leadtable.iami411.org/scan-lead?id=' + urlValue)
const level = ref<Level>('M')
const renderAs = ref<RenderAs>('svg')
const background = ref('#ffffff')
const foreground = ref('#000000')
const margin = ref(0)

const imageSettings = ref<ImageSettings>({
  src: 'https://nyift.org/wp-content/uploads/2025/01/New-York_Central-Jersey-Sections__Horizontal__RGB.jpg',
  width: 25,
  height: 15,
  // x: 10,
  // y: 10,
  excavate: true
})

const gradient = ref(false)
const gradientType = ref<GradientType>('linear')
const gradientStartColor = ref('#000000')
const gradientEndColor = ref('#38bdf8')
</script>
