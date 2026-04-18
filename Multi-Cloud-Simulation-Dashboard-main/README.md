# Multi-Cloud Simulation Dashboard

A production-grade full-stack simulation platform for managing and comparing cloud infrastructure across AWS, Azure, and GCP.

## Features

- **Multi-Cloud Management**: Unified view for AWS, Azure, and GCP resources.
- **Resource Lifecycle**: Start/Stop VMs, Activate/Pause Databases, and manage Storage.
- **Dynamic Cost Engine**: Real-time cost accumulation based on resource state and duration.
- **AI-Powered Optimization**: Smart suggestions to reduce cloud spend and right-size resources.
- **Interactive Analytics**: Rich charts (Recharts) for cost trends and resource utilization.
- **Modern SaaS UI**: Built with React, Tailwind CSS, ShadCN UI, and Framer Motion.

## Architecture

### Backend (FastAPI)
- **Modular Design**: Separated routes, models, and services.
- **Simulation Engine**: Manages virtual resource states and behaviors.
- **Cost Engine**: Calculates costs dynamically per minute/unit.
- **FastAPI/PostgreSQL**: Type-safe API with Supabase integration.

### Frontend (React + Vite)
- **Zustand**: Lightweight global state management.
- **Tailwind CSS**: Premium design with custom tokens and dark mode support.
- **Framer Motion**: Smooth micro-animations for an interactive feel.
- **Lucide Icons**: Consistent, high-quality iconography.

## Getting Started

### Backend Setup
1. Navigate to `/backend`.
2. Install dependencies: `pip install -r requirements.txt`.
3. Run the server: `uvicorn main:app --reload`.
4. API docs available at `http://localhost:8000/docs`.

### Frontend Setup
1. Navigate to `/frontend`.
2. Install dependencies: `npm install`.
3. Run the dev server: `npm run dev`.
4. Access the dashboard at `http://localhost:5173`.

## Database Schema
The database schema is defined in `supabase/schema.sql`. It includes tables for `users`, `providers`, `resources`, `logs`, and `cost_metrics`.

## Author
Developed as a production-ready simulation prototype
For looking into the project visit to this link 
: https://multi-cloud-simulation-dashboard.vercel.app/
