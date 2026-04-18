-- Supabase (PostgreSQL) Schema Design

-- Types
CREATE TYPE resource_type AS ENUM ('VM', 'Storage', 'Database');
CREATE TYPE resource_status AS ENUM ('Running', 'Stopped', 'Active', 'Paused', 'Terminated');
CREATE TYPE user_role AS ENUM ('Admin', 'User');

-- Tables
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    role user_role DEFAULT 'User',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE providers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT UNIQUE NOT NULL, -- 'AWS', 'Azure', 'GCP'
    regions JSONB DEFAULT '[]',
    status TEXT DEFAULT 'Healthy',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE resources (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    provider_id UUID REFERENCES providers(id) ON DELETE CASCADE,
    type resource_type NOT NULL,
    status resource_status DEFAULT 'Stopped',
    attributes JSONB DEFAULT '{}', -- cpu, ram, size_gb, connections, etc.
    cost_per_unit NUMERIC(10, 4) DEFAULT 0.0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    resource_id UUID REFERENCES resources(id),
    action_type TEXT NOT NULL, -- 'START_VM', 'STOP_VM', etc.
    provider TEXT NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE cost_metrics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    resource_id UUID REFERENCES resources(id) ON DELETE CASCADE,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    cost_amount NUMERIC(12, 4) DEFAULT 0.0,
    cumulative_cost NUMERIC(12, 4) DEFAULT 0.0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(resource_id, date)
);

-- Seed Initial Data
INSERT INTO providers (name, regions, status) VALUES 
('AWS', '["us-east-1", "us-west-2", "eu-west-1"]', 'Healthy'),
('Azure', '["East US", "West Europe", "Southeast Asia"]', 'Healthy'),
('GCP', '["us-central1", "europe-west1", "asia-east1"]', 'Healthy');
