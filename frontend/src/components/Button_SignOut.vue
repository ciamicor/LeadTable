<template>
  <button v-if="session.data"
          :class="props.css_classes + '--warn--invert'"
          @click="signOut()">
    Sign Out (Auth)
  </button>
  <button v-if="session.data"
          :class="props.css_classes + '--warn--invert'"
          @click="logOut()">
    Sign Out (Company)
  </button>
</template>

<script lang="ts"
        setup>
import { db } from '@/db.ts';
import { useSessionStore } from '@/stores/session.ts';
import { useCompanyLocalStore } from '@/stores/company.ts';

const sessionStore = useSessionStore()
const exhibitorLocal = useCompanyLocalStore()
import { authClient } from '@/lib/auth-client.ts';
import { authSignOut } from '@/services/functions/BetterAuthFunc.ts';
import { useRouter } from 'vue-router';

const router = useRouter();
const session = authClient.useSession()

const props = defineProps(
  {
    css_classes: {type: String, default: ''},
    loginIdMatch: {type: Boolean, default: undefined},
    extraMatch: {type: Boolean, default: undefined}
  }
)

async function signOut() {
  await authSignOut()
  await router.push({name: 'Login'})
}

async function logOut() {
  console.log('exhibitor local:', exhibitorLocal.name)
  console.log('loginId match:', props.loginIdMatch)
  console.log('extras match:', props.extraMatch)
  db.profile.delete(1)
  sessionStore.logged_In = false
  exhibitorLocal.$reset()
  console.log('exhibitor local:', exhibitorLocal.name)
  console.log('loginId match:', props.loginIdMatch)
  console.log('extras match:', props.extraMatch)
}

</script>
