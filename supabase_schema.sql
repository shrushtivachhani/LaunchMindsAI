-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- PROFILES TABLE
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  email text unique not null,
  full_name text,
  role text default 'user' check (role in ('user', 'admin')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS for Profiles
alter table public.profiles enable row level security;

create policy "Public profiles are viewable by everyone."
  on public.profiles for select
  using ( true );

create policy "Users can insert their own profile."
  on public.profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile."
  on public.profiles for update
  using ( auth.uid() = id );

-- Handle New User Signups (Trigger)
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (new.id, new.email, new.raw_user_meta_data ->> 'full_name', 'user');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();


-- PROJECTS TABLE
create table public.projects (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  name text default 'Untitled Project',
  status text default 'draft' check (status in ('draft', 'analyzing', 'ready')),
  current_step integer default 0,
  data jsonb default '{}'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS for Projects
alter table public.projects enable row level security;

create policy "Users can view own projects."
  on public.projects for select
  using ( auth.uid() = user_id );

create policy "Users can insert own projects."
  on public.projects for insert
  with check ( auth.uid() = user_id );

create policy "Users can update own projects."
  on public.projects for update
  using ( auth.uid() = user_id );

create policy "Users can delete own projects."
  on public.projects for delete
  using ( auth.uid() = user_id );

-- Admin Policy (View All)
-- Note: Replace 'admin' check with your specific logic if different
create policy "Admins can view all projects."
  on public.projects for select
  using ( 
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid() and profiles.role = 'admin'
    )
  );
