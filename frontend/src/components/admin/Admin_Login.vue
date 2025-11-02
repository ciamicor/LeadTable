<template>
  <LoadingHolder :status="loadingStatus"/>
  <div v-if="!loadingStatus"
       class="row-10-300 --place-items-center --place-content-center">
    <div class="col-10-300 --gap-12">
      <p v-if="authSession.data">
        Hi, {{authSession.data.user.name}}.
        You're logged in using {{authSession.data.user.email}}.
      </p>
      <span>
        {{authSession.data}}
      </span>

      <h3 v-if="!authSession.data">
        Login to access Admin portal
      </h3>

      <form v-if="!authSession.data"
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

      <button v-if="authSession.data"
              class="--warn"
              @click="authClientSignOut">Sign Out
      </button>
    </div>

  </div>
</template>

<script lang="ts"
        setup>
import { ref } from "vue";
import { authClient } from "@/lib/auth-client.ts"; //import the auth client
import LoadingHolder from "@/components/elements/LoadingHolder.vue";
import { authSignOut, authSignIn } from "@/services/functions/BetterAuthFunc.ts";

const authSession = authClient.useSession()
const loginEmail = ref("claire@iami411.org")
const loginPass = ref("password1")
const loginUser_Name = ref("Claire")
const loadingStatus = ref(false)

async function authClientSignIn() {
  console.log(loadingStatus.value)
  await authSignIn(loginEmail.value, loginPass.value, "/admin-dashboard")
  console.log(loadingStatus.value)
}

async function authClientSignOut() {
  await authSignOut()
  loginEmail.value = ""
  loginPass.value = ""
  loginUser_Name.value = ""
}
</script>
