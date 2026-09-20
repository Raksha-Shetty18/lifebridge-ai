-- LifeBridge AI Database Schema (PostgreSQL / Supabase)
-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. USERS TABLE
create table if not exists users (
    id uuid primary key default uuid_generate_v4(),
    email text unique,
    name text,
    created_at timestamp with time zone default now()
);

-- 2. CASES TABLE
create table if not exists cases (
    id uuid primary key default uuid_generate_v4(),
    user_id uuid references users(id) on delete set null,
    title text not null,
    category text not null, -- 'education', 'career', 'civic', 'financial_safety', 'documents', 'urgent'
    description text not null,
    urgency text not null default 'medium', -- 'low', 'medium', 'high', 'emergency'
    status text not null default 'active', -- 'active', 'in_progress', 'waiting', 'resolved'
    problem_summary text,
    immediate_action jsonb, -- { "title": "...", "why": "..." }
    missing_information jsonb default '[]'::jsonb,
    warnings jsonb default '[]'::jsonb,
    follow_up_questions jsonb default '[]'::jsonb,
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now()
);

-- 3. ACTION STEPS TABLE
create table if not exists action_steps (
    id uuid primary key default uuid_generate_v4(),
    case_id uuid references cases(id) on delete cascade,
    step_number integer not null,
    title text not null,
    description text not null,
    why_it_matters text,
    documents jsonb default '[]'::jsonb,
    action_type text default 'action',
    status text default 'pending', -- 'pending', 'in_progress', 'completed', 'skipped'
    created_at timestamp with time zone default now()
);

-- 4. CHECKLIST ITEMS TABLE
create table if not exists checklist_items (
    id uuid primary key default uuid_generate_v4(),
    case_id uuid references cases(id) on delete cascade,
    title text not null,
    category text default 'general',
    completed boolean default false,
    created_at timestamp with time zone default now()
);

-- 5. RESOURCES TABLE
create table if not exists resources (
    id uuid primary key default uuid_generate_v4(),
    case_id uuid references cases(id) on delete cascade,
    title text not null,
    description text not null,
    url text,
    source_type text not null, -- 'official_government', 'official_institutional', 'legal_aid', 'helpline', 'guide'
    verified boolean default true,
    created_at timestamp with time zone default now()
);

-- Enable Row Level Security (RLS) policies if using Supabase client directly
alter table users enable row level security;
alter table cases enable row level security;
alter table action_steps enable row level security;
alter table checklist_items enable row level security;
alter table resources enable row level security;

-- Default open read/write policies for public/anonymous hackathon demonstration
create policy "Allow public read cases" on cases for select using (true);
create policy "Allow public insert cases" on cases for insert with check (true);
create policy "Allow public update cases" on cases for update using (true);
create policy "Allow public delete cases" on cases for delete using (true);

create policy "Allow public all action_steps" on action_steps for all using (true);
create policy "Allow public all checklist_items" on checklist_items for all using (true);
create policy "Allow public all resources" on resources for all using (true);
