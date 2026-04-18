# Offer Frontend

Minimal frontend integration with Supabase for the chat system.

## Setup

1. Replace the `SUPABASE_URL` and `SUPABASE_ANON_KEY` in `script.js` with your actual Supabase project credentials.

2. Update the `currentConversationId` and user IDs with actual values.

## Running

Since this uses Supabase client, it needs to be served from a web server to avoid CORS issues. You can:

- Use a local server like `python -m http.server` or `npx serve`
- Deploy to a hosting service
- Open directly in browser (may have CORS restrictions)

## Features

- Fetch and display messages from a conversation
- Send new messages
- Real-time updates via Supabase realtime subscriptions