import { authClient } from "@/lib/auth-client.ts";

export async function authSignOut() {
  authClient.signOut({}, {
    onRequest(ctx) {
      console.log(ctx, "signing out...")
    },
    onSuccess(ctx) {
      console.log(ctx, "signed out!")
    },
    onError(ctx) {
      console.log(ctx, "error signing out.")
    },
  })
}

export async function authSignIn(e: string, p: string, url: string = "" /*loading: boolean*/) {
  authClient.signIn.email({
    email: e,
    password: p,
    rememberMe: true,
    callbackURL: url
  }, {
    onRequest(ctx) {
      console.log(ctx, "signing in...")
      /*loading = true*/
    },
    onSuccess(ctx) {
      console.log(ctx, "signed in!")
      /*loading = false*/
    },
    onError(ctx) {
      console.log(ctx, "error signing in.")
    },
  })
}

