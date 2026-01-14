# ART Services - Database Schema (PostgreSQL)

## Overview
This document outlines the core database schema powering the ART Services platform, hosted on Supabase (PostgreSQL). The design emphasizes data integrity, real-time capabilities, and scalability for the UK market.

## Core Tables

### `users` - Central User Management
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  phone_number VARCHAR(50) NOT NULL,
  user_role VARCHAR(20) NOT NULL 
    CHECK (user_role IN ('customer', 'operator', 'admin')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  is_active BOOLEAN DEFAULT TRUE
);

service_requests - Breakdown Request Lifecycle
sql

CREATE TABLE service_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID REFERENCES users(id) NOT NULL,
  assigned_operator_id UUID REFERENCES users(id),
  vehicle_type VARCHAR(50) NOT NULL,
  issue_description TEXT NOT NULL,
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  formatted_address TEXT NOT NULL,
  
  status VARCHAR(30) NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'assigned', 'en_route', 'on_site', 'completed', 'cancelled')),
  
  price_estimate DECIMAL(10, 2),
  final_price DECIMAL(10, 2),
  stripe_payment_id VARCHAR(255),
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

operator_profiles - Operator-Specific Data
sql

CREATE TABLE operator_profiles (
  user_id UUID PRIMARY KEY REFERENCES users(id),
  company_name VARCHAR(255),
  vehicle_registration VARCHAR(50),
  service_radius_km INTEGER DEFAULT 50,
  is_available BOOLEAN DEFAULT FALSE,
  current_latitude DECIMAL(10, 8),
  current_longitude DECIMAL(11, 8),
  ev_certification BOOLEAN DEFAULT FALSE,
  average_rating DECIMAL(3, 2)
);

location_updates - Real-time GPS Tracking
sql

CREATE TABLE location_updates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  request_id UUID REFERENCES service_requests(id) NOT NULL,
  source VARCHAR(20) CHECK (source IN ('operator', 'customer')),
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  accuracy INTEGER,
  recorded_at TIMESTAMPTZ DEFAULT NOW()
);

Key Database Features

    Row-Level Security (RLS): Implemented via Supabase for granular data access.

    Real-time Subscriptions: Using Supabase's real-time capabilities for live tracking.

    Geospatial Queries: Optimized for location-based operator matching.

    Audit Triggers: Automatic updated_at timestamping on all tables.

Indexes for Performance
sql

CREATE INDEX idx_service_requests_status ON service_requests(status);
CREATE INDEX idx_service_requests_location ON service_requests USING GIST(ll_to_earth(latitude, longitude));
CREATE INDEX idx_operator_availability ON operator_profiles(is_available, ev_certification);
CREATE INDEX idx_location_updates_request ON location_updates(request_id, recorded_at DESC);

Data Relationships
text

users
├─── service_requests (as customer)
├─── service_requests (as assigned_operator)
└─── operator_profiles (if user_role = 'operator')
     |
service_requests
└─── location_updates (multiple updates per request)

This schema supports the platform's core functionality while allowing for future scaling and feature additions.
