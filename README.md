<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/029d0c55-06f9-48fb-b30c-29dfac9baa95

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Shared Content Database

Announcements, news, and gallery use Supabase shared storage when configured, with `localStorage` as a development fallback. To enable cross-device content, follow [supabase/SETUP.md](supabase/SETUP.md), apply the migration, and configure the Supabase project URL and public anon key locally and in Vercel. Member accounts and payment records are still browser-local.

The member dashboard has a mobile-money checkout interface. Real payments require the server-side Selcom checkout and callback endpoint described in [supabase/SETUP.md](supabase/SETUP.md); no payment provider credentials are stored in the client.
