<template>
  <p>this is where you manage users.</p>
  {{ userList }}
</template>

<script lang="ts"
        setup>
import { ref } from 'vue';
import { authClient } from '@/lib/auth-client.ts';

const userList = ref()

async function fetchUsers() {
  userList.value = await authClient.admin.listUsers({
    query: {
      searchValue: 'Claire',
      searchField: 'name',
      // searchOperator: 'contains',
      limit: 100,
      // offset: 100,
      sortBy: 'name',
      sortDirection: 'desc'
      // filterField: 'email'
      //filterValue: 'hello@example.com',
      //filterOperator: 'eq'
    }
  });
}

fetchUsers()

</script>
