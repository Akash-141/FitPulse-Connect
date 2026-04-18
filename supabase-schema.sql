-- FitPulse Connect schema for the Supabase SQL Editor

create extension if not exists pgcrypto;

create or replace function public.handle_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text not null unique,
  bio text,
  fitness_level text,
  location jsonb,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.workouts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  exercises jsonb not null default '[]'::jsonb,
  duration integer not null default 0,
  date date not null default current_date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.matches (
  id uuid primary key default gen_random_uuid(),
  requester_id uuid not null references auth.users(id) on delete cascade,
  receiver_id uuid not null references auth.users(id) on delete cascade,
  status text not null default 'pending' check (status in ('pending', 'accepted')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint matches_no_self_match check (requester_id <> receiver_id),
  constraint matches_unique_pair unique (requester_id, receiver_id)
);

drop trigger if exists set_profiles_updated_at on public.profiles;
create trigger set_profiles_updated_at
before update on public.profiles
for each row execute function public.handle_updated_at();

drop trigger if exists set_workouts_updated_at on public.workouts;
create trigger set_workouts_updated_at
before update on public.workouts
for each row execute function public.handle_updated_at();

drop trigger if exists set_matches_updated_at on public.matches;
create trigger set_matches_updated_at
before update on public.matches
for each row execute function public.handle_updated_at();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, username, avatar_url)
  values (
    new.id,
    coalesce(
      nullif(new.raw_user_meta_data ->> 'username', ''),
      split_part(coalesce(new.email, ''), '@', 1),
      'athlete'
    ),
    new.raw_user_meta_data ->> 'avatar_url'
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.workouts enable row level security;
alter table public.matches enable row level security;

drop policy if exists "Public read profiles" on public.profiles;
create policy "Public read profiles"
on public.profiles
for select
using (true);

drop policy if exists "Users manage own profile" on public.profiles;
create policy "Users manage own profile"
on public.profiles
for all
using (auth.uid() = id)
with check (auth.uid() = id);

drop policy if exists "Users manage own workouts" on public.workouts;
create policy "Users manage own workouts"
on public.workouts
for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "Users read matches they own" on public.matches;
create policy "Users read matches they own"
on public.matches
for select
using (auth.uid() = requester_id or auth.uid() = receiver_id);

drop policy if exists "Users create outgoing matches" on public.matches;
create policy "Users create outgoing matches"
on public.matches
for insert
with check (auth.uid() = requester_id);

drop policy if exists "Users update matches they own" on public.matches;
create policy "Users update matches they own"
on public.matches
for update
using (auth.uid() = requester_id or auth.uid() = receiver_id)
with check (auth.uid() = requester_id or auth.uid() = receiver_id);

create index if not exists workouts_user_id_idx on public.workouts (user_id);
create index if not exists matches_requester_id_idx on public.matches (requester_id);
create index if not exists matches_receiver_id_idx on public.matches (receiver_id);
