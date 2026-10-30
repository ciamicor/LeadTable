<template>
  <!--  <div
      v-show="showBadge">
    >-->
  <div class="--attendee-info-container">
    <div class="--name">
      {{ attendee.name_First }}
      {{ attendee.name_Last }}
      <!--      <svg class="svg-name">
              <text>
              </text>
            </svg>-->
    </div>
    <!--    <h1 class="&#45;&#45;name">
          {{ attendee.name_First }}
          {{ attendee.name_Last }}
        </h1>-->
    <div class="--employer"
         style="width: 100%">
      {{ attendee.contact_Employer }}
    </div>
    <div class="--title">
      {{ attendee.title }}
      <!--      <svg class="svg-title">
              <text>
              </text>
            </svg>-->
    </div>
  </div>
  <div class="badge--images-container">
    <QrCode
      v-if="expoLocal.leadEnabled"
      :size="215"
      :url-value="attendee.id.toString()"
      class="badge--qr"
    ></QrCode>
    <img :src="getImageUrl(`${expoLocal.expo_Client.toString().toLowerCase()}-vert-rgb`)"
         alt=""
    >
  </div>
  <!--  </div>-->
</template>
<script setup>
import QrCode from "@/components/QrCode.vue"
import { useExpoLocalStore } from "@/stores.js";

const expoLocal = useExpoLocalStore();

function getImageUrl( name ) {
  return new URL( `../../public/logos/${ expoLocal.expo_Client.toString()
    .toLowerCase() }/${ name }.jpeg`, import.meta.url ).href
}

defineProps( {
  attendee: Object,
  showBadge: { type: Boolean, default: true }
} )

// Select all SVGs
const svgName = document.querySelectorAll( ".svg-name" );
const svgEmployer = document.querySelectorAll( ".svg-employer" );
const svgTitle = document.querySelectorAll( ".svg-title" );

// window.getComputedStyle(element).getPropertyValue('--color-font-general');

function sizeSVGs( s, maxH ) {
  s.forEach( element => {
    // Get bounding box of <text> element
    const bbox = element.querySelector( "text" ).getBBox();
    // Apply bounding box values to SVG element as viewBox
    let h = bbox.height
    console.log( bbox.height )
    if ( bbox.height > maxH ) h = maxH + 12
    element.setAttribute( "viewBox", [ bbox.x, bbox.y, bbox.width, h ].join( " " ) );
  } );
}

sizeSVGs( svgName, 50 )
sizeSVGs( svgEmployer, 40 )
sizeSVGs( svgTitle, 24 )

</script>
