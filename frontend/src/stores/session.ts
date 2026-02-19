/*-| Session Store
/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/*/
import { defineStore } from 'pinia';
import { ref, type Ref } from 'vue';

export const useSessionStore = defineStore('session', () => {
  const logged_In: Ref<boolean, boolean> = ref(false)
  const loginEmail: Ref<string, string> = ref('claire@iami411.org')
  const loginPass: Ref<string, string> = ref('password1')
  const loginUser_Name: Ref<string, string> = ref('Claire')
  const isAdmin: Ref<boolean, boolean> = ref(false)
  const status: Ref<string, string> = ref('')

  function $reset() {
    logged_In.value = false
    loginEmail.value = ''
    loginPass.value = ''
    loginUser_Name.value = ''
    isAdmin.value = false
    status.value = ''
  }

  return {
    logged_In,
    loginEmail,
    loginPass,
    loginUser_Name,
    isAdmin,
    status,
    $reset
  }
})
