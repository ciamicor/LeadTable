<template>
  <button
    class="button --primary --place-self-center --p-6"
    @click="exportLeads">
    Download Leads
  </button>
</template>

<script lang="js"
        setup>
import { utils, writeFile } from 'xlsx'
import { useCompanyLocalStore } from '@/stores.js'

const companyLocalData = useCompanyLocalStore()

const props = defineProps( {
  leadsList: {
    type: Array, default: []
  }
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
              ...item
            } ) => item )
  const worksheet = utils.json_to_sheet( formattedLeads )
  const workbook = utils.book_new()
  utils.book_append_sheet( workbook, worksheet, `2025 Leads` )
  utils.sheet_add_aoa( worksheet, [ [ 'First Name', 'Last Name', 'Title', 'Email', 'Phone', 'Employer', 'Address', 'Score', 'Comment', 'Scanned Date' ] ], { origin: 'A1' } )
  writeFile( workbook, `${ companyLocalData.name }-Leads-${ companyLocalData.expo_Client }-Expo-${ companyLocalData.expo_Year }.xlsx`, { compression: true } )
}

</script>
