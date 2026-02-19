import { authClient } from '@/lib/auth-client.ts';
import { db } from '@/db.ts'

export async function authSignOut() {
  await authClient.signOut({
    fetchOptions: {
      onRequest(ctx) {
        console.log(ctx, 'signing out...')
      },
      onSuccess(ctx) {
        db.userSesh.clear()
        console.log('signOut success');
      },
      onError(ctx) {
        console.log(ctx, 'error signing out.')
      }
    }
  })
}

export async function authSignIn(e: string, p: string, r: boolean, url: string = '') {
  // @ts-ignore
  // @ts-ignore
  await authClient.signIn.email({
    email: e,
    password: p,
    rememberMe: r
    // callbackURL: `/${url}`
  }, {
    onRequest(ctx) {
      console.log(ctx, 'signing in...')
    },
    async onSuccess(ctx) {
      console.log(ctx, 'signed in!')
      // @ts-ignore
      const sesh = await authClient.getSession()
      // @ts-ignore
      console.log(sesh.data.user)
      await db.userSesh.put({
        // @ts-ignore
        sId: sesh.data.session.id,
        // @ts-ignore
        uId: sesh.data.user.id,
        // @ts-ignore
        name: sesh.data.user.name,
        // @ts-ignore
        email: sesh.data.user.email,
        // @ts-ignore
        role: sesh.data.user.role
      })
    },
    onError(ctx) {
      console.log(ctx, 'error signing in.')
    }
  })
}

export async function checkRole(s: any) {
  try {
    // @ts-ignore
    if (authClient.useSession().value.data.user.role === 'admin') {
      s.isAdmin = true
      console.log(`User is admin? ${s.isAdmin}`)
    }
    else {
      console.log('User is not admin.')
    }
  } catch (err) {
  }
}

