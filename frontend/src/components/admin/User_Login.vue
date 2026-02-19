<template>
  <StatusDisplay :status="loadingStatus"/>
  <div v-if="!loadingStatus"
       class="row-10-300 --place-items-center --place-content-center">
    <div class="col-10-300 --max-w-350 --gap-12">
      <p v-if="session.data">
        Hi, {{ session.data.user.name }}.
        You're logged in using {{ session.data.user.email }}.
      </p>
      <span>
        {{ session.data }}
      </span>

      <form v-if="!session.data"
            action=""
            class="col-10-300"
            method="post"
            @submit.prevent="authClientSignIn">
        <input id="email"
               v-model="loginEmail"
               name="email"
               required
               type="email">
        <input id="password"
               v-model="loginPass"
               name="password"
               required
               type="password"
               @keyup.enter="authClientSignIn">
        <label class="row-12-300 --place-content-start"
               for="remember">
          <input id="remember"
                 v-model="rememberMe"
                 class="--justify-self-start --flex-basis-10 --flex-grow-0"
                 type="checkbox"
          >
          <span>Remember my login</span>
        </label>
        <!-- Auth Buttons -->
        <div class="row-12-300 --m-t-5">
          <button
            class="--success--invert --flex-grow-1 --flex-basis-45"
          >Create Account
          </button>
          <button
            class="--primary--invert --flex-grow-1 --flex-basis-45"
            type="submit">
            Sign In
          </button>
        </div>
      </form>

      <button v-if="session.data"
              class="--warn"
              @click="authClientSignOut">Sign Out
      </button>
    </div>

  </div>
</template>

<script lang="ts"
        setup>
import StatusDisplay from '@/components/elements/StatusDisplay.vue';
import { ref } from 'vue';
import { authClient } from '@/lib/auth-client.ts';
import { authSignOut, authSignIn } from '@/services/functions/BetterAuthFunc.ts';
import { useRouter } from 'vue-router';

const router = useRouter();

const loginEmail = ref('claire@iami411.org')
const loginPass = ref('password1')
const rememberMe = ref(true)

const session = ref(authClient.useSession())
const loadingStatus = ref(false)

async function authClientSignIn() {
  await authSignIn(loginEmail.value, loginPass.value, rememberMe.value)
  console.log(session.value.data)
  // @ts-ignore
  const sesh = await authClient.getSession()
  // @ts-ignore
  if (sesh.data.user.role == 'admin') {
    await router.push({name: 'Admin Dashboard'})
  }
  else {
    await router.push({name: 'Booth Map'})
  }
}

async function authClientSignOut() {
  await authSignOut()
}
</script>
