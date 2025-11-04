<template>
  <button
    class="button --primary"
    @click="exportLeads">
    Download Leads
  </button>
</template>

<script lang="js"
        setup>
import { utils, writeFile } from 'xlsx'
import { useExhibitorLocalStore } from '@/stores.ts'

const exhibitorLocal = useExhibitorLocalStore()

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
  utils.sheet_add_aoa( worksheet,
    [
      [
        'First Name',
        'Last Name',
        'Title',
        'Email',
        'Phone',
        'Employer',
        'Address',
        'Score',
        'Comment',
        'Scanned Date'
      ]
    ],
    { origin: 'A1' } )
  writeFile( workbook,
    `${ exhibitorLocal.name }-Leads-${ exhibitorLocal.expo_Client }-Expo-${ exhibitorLocal.expo_Year }.xlsx`,
    { compression: true } )
}

</script>
