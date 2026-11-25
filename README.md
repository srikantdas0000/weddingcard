# Editable Wedding Invitation

A mobile-first animated wedding invitation built with Next.js.

## Run locally
1. Install Node.js 18 or newer.
2. In this folder run `npm install`.
3. Run `npm run dev`.
4. Open http://localhost:3000.

## Edit the invitation
Change `wedding.config.json`:
- `couple`: names and short descriptions
- `wedding`: date label, ISO date, city and invitation message
- `events`: event names, dates, descriptions, venues and Google Maps URLs
- `gallery`: captions for memory tiles

The cover screen opens when tapped. Scroll reveals animate each section. RSVP responses in this starter version are saved in the visitor's browser localStorage only; they are not sent to an organiser. Connect the form to an API/database or form service before using it for a real guest list.

## Photos and music
The supplied screenshots do not provide original downloadable image assets. Replace the decorative placeholders with licensed/owned photographs in `public/images`, then update the gallery markup in `app/page.js` to use those image paths. The music control is a visual placeholder; add an audio file and playback logic if you want background music.

## Deploy
Build with `npm run build`, then deploy to a Node.js host that supports Next.js. For production RSVP collection, add a server-side endpoint and secure storage.
