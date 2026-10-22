<template>
  <button
    class="button --primary"
    @click="exportExhibitors">
    Download Exhibitors
  </button>
</template>

<script lang="js"
        setup>
import { utils, writeFile } from "xlsx"
import { useExhibitorLocalStore, useExpoLocalStore } from "@/stores.js"
import exhibitorsList from "@/components/exhibitor/ExhibitorsList.vue";
import { ref, onMounted } from "vue";

const expoLocal = useExpoLocalStore()
const flatExhibs = ref( [] )

const props = defineProps( {
  exhibitorsList: {
    type: Array, default: []
  },
} )

function flattenObject( ob ) {
  let toReturn = {};
  // console.log( "-------" )
  for ( let k in ob ) {
    // console.log( "key: " + k )
    if ( k === "booths" ) continue
    if ( !ob.hasOwnProperty( k ) ) continue
    if ( (typeof ob[k]) == "object" && ob[k] !== null ) {
      // console.log( "Flattening child..." + k )
      let flatObject = flattenObject( ob[k] );
      for ( let x in flatObject ) {
        // console.log( "flat..." + x )
        if ( !flatObject.hasOwnProperty( x ) ) continue
        if ( k === "details" ) k = ""
        toReturn[k + x] = flatObject[x];
      }
    } else {
      toReturn[k] = ob[k];
    }
  }
  return toReturn;
}

function cleanExhibObj( ob ) {
  let o = ob
  delete ob.id
  delete ob.updatedAt
  delete ob.externalId
  delete ob.description
  delete ob.autoLoginUrl
  delete ob.logoFileUrl
  delete ob.privateEmail
  delete ob.customButton2Title
  delete ob.customButton2Url
  delete ob.customButton3Title
  delete ob.customButton3Url
  delete ob.customButtonTitle
  delete ob.customButtonUrl
  delete ob.featured
  delete ob.advertised
  delete ob.expoId
  delete ob.vatNumber

  let x = 0
  while ( x <= 50 ) {
    let key = "images" + x
    delete ob[key]
    x++
  }
  x = 0
  while ( x <= 50 ) {
    let key = "tags" + x
    delete ob[key]
    x++
  }
  x = 0
  while ( x <= 20 ) {
    let key = "extras" + x
    delete ob[key]
    x++
  }
  x = 0
  while ( x <= 50 ) {
    let key = "categories" + x + "id"
    delete ob[key]
    x++
  }
  x = 0
  let catHold = ""
  while ( x <= 50 ) {
    let key = "categories" + x + "name"
    const keyH = ob[key]
    if ( keyH !== undefined ) {
      catHold += ob[key] + "\n"
      delete ob[key]
    }
    x++
  }
  ob.categories = catHold

  return o
}

onMounted( () => {
  for ( let i = 0; i < props.exhibitorsList.length; i++ ) {
    let obj = flattenObject( props.exhibitorsList[i] )
    // console.log( obj )
    obj = cleanExhibObj( obj )
    flatExhibs.value.push( obj );
  }
  /*console.log( "Flattening...------------------------------------------------" )
  let obj = flattenObject( props.exhibitorsList[0] )
  console.log( obj )
  obj = cleanExhibObj( obj )
  console.log( obj )
  flatExhibs.value.push( obj );*/
} )

async function exportExhibitors() {
  const formattedExhibitors = flatExhibs.value
    .map( ( { ...item } ) => item )
  console.log( formattedExhibitors );
  const worksheet = utils.json_to_sheet( formattedExhibitors )
  const workbook = utils.book_new()
  utils.book_append_sheet( workbook, worksheet, `Exhibitors` )
  utils.sheet_add_aoa( worksheet,
    [
      []
    ],
    { origin: "A1" } )

  /* set column width */
  let COL_INDEX = 2
  let COL_WIDTH = 85
  /* create !cols array if it does not exist */
  if ( !worksheet["!cols"] ) worksheet["!cols"] = [];
  /* create column metadata object if it does not exist */
  if ( !worksheet["!cols"][COL_INDEX] ) worksheet["!cols"][COL_INDEX] = { wch: 8 };
  worksheet["!cols"][COL_INDEX].wpx = COL_WIDTH

  writeFile( workbook,
    `${ expoLocal.expo_Client } ${ expoLocal.name } - Exhibitors List.xlsx`,
    { compression: true, cellStyles: true } )
}

</script>
