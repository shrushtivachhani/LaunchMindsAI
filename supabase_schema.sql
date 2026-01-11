-- 1. Create Profiles Table
create table public.profiles (
  id uuid references auth.users on delete cascade,
  full_name text,
  role text default 'user',
  created_at timestamp with time zone default now(),
  primary key (id)
);

-- 2. Create Trigger to Auto-Create Profile on Signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, role)
  values (new.id, new.raw_user_meta_data->>'full_name', 'user');
  return new;
end;
$$ language plpgsql;

create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

-- 3. (Optional) Promote a specific user to admin manually
-- update profiles set role = 'admin' where id = 'USER_UUID_HERE';
