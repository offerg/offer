-- Initial migration for Supabase
-- Add your SQL schema here

-- profiles
create table if not exists public.profiles (
  id uuid primary key,
  full_name text,
  role text default 'customer'
);

-- services
create table if not exists public.services (
  id uuid primary key,
  crafter_id uuid,
  title text,
  price numeric,
  is_active boolean default true
);

-- messages (conversation-based)
create table if not exists public.conversations (
  id uuid primary key default gen_random_uuid(),
  user1 uuid,
  user2 uuid
);

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid,
  sender_id uuid,
  text text,
  read_at timestamptz
);