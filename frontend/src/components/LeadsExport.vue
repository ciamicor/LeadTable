<template>
  <button
    class="button --primary"
    @click="exportLeads">
    Download {{ leadCount }} Leads
  </button>
</template>

<script lang="js"
        setup>
import { utils, writeFile } from "xlsx"
import { useExhibitorLocalStore } from "@/stores.js"

const companyLocal = useExhibitorLocalStore()

const props = defineProps( {
  leadsList: {
    type: Array, default: []
  },
  leadCount: { type: Number, default: null },
} )

async function exportLeads() {
  const formattedLeads = props.leadsList
    .map( ( {
      id,
      expo_Client,
      expo_Year,
      scan_Company_Id,
      attendee_Id,
      updatedAt,
      synced,
      ...item
    } ) => item )
  const worksheet = utils.json_to_sheet( formattedLeads )
  const workbook = utils.book_new()
  utils.book_append_sheet( workbook, worksheet, `Leads` )
  utils.sheet_add_aoa( worksheet,
    [
      [
        "First Name",
        "Last Name",
        "Email",
        "Phone",
        "Employer",
        "Address Line 1",
        "Address Line 2",
        "City",
        "State",
        "ZIP",
        "Country",
        "Title",
        "Score",
        "Comment",
        "Scanned Date"
      ]
    ],
    { origin: "A1" } )
  writeFile( workbook,
    `${ companyLocal.name }-Leads-${ companyLocal.expo_Client }-Expo-${ companyLocal.expo_Year }.xlsx`,
    { compression: true } )
}

</script>
