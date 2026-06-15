import { env } from '$env/dynamic/private';
import { betterAuth } from 'better-auth/minimal';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { sveltekitCookies } from 'better-auth/svelte-kit';
import { getRequestEvent } from '$app/server';
import { db } from '$lib/server/db';
import { sendEmail } from '$lib/email';

export const auth = betterAuth({
  baseURL: env.ORIGIN,
  secret: env.BETTER_AUTH_SECRET,
  database: drizzleAdapter(db, { provider: 'pg' }),
  emailAndPassword: { enabled: true, requireEmailVerification: true },
  emailVerification: { sendOnSignUp: true, sendOnSignIn: true, autoSignInAfterVerification: true, expiresIn: 60 * 60, sendVerificationEmail: async ({ user, url }) => {
    await sendEmail({
      to: user.email,
      subject: "Confirm account creation on Darkade",
      text: `Click this link to confirm the creation of your account. If you didn't request this, feel free to ignore this email. ${url}`,
      html: `
<h1>Welcome to Darkade
<p>Hi ${user.name} and thank you for creating an account on Darkade! Click the link below to confirm your account. If you didn't request this, feel free to ignore this email.</p>
<a href="${url}">Confirm your account</a>
        `
    })
  } },
  plugins: [
    sveltekitCookies(getRequestEvent) // make sure this is the last plugin in the array
  ]
});
