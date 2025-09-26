import { createAuthClient } from "better-auth/vue"
import { adminClient } from "better-auth/client/plugins"

export const authClient = createAuthClient({
  plugins: [
    adminClient()
  ]
  /* The base URL of the server (optional if you're using the same domain) */
  // baseURL: "http://localhost:8080"
  // baseURL: "https://leadtable.iami411.org/"
})
