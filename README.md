﻿# Pokémon Backend


### Installation

1. **Clone the Repo:**

   ```bash
   git clone https://github.com/yourusername/pokemon-backend.git
   cd pokemon-backend

2. **Inatall Packages:**

   ```bash
   npm install

3. **Run:**

   ```bash
   npm run start

## Overview

Pokémon Backend is an Express.js and TypeScript API designed for managing user authentication (with JWT access and refresh tokens), Pokémon teams, and daily Pokémon data sync. It includes rate limiting, secure session management, and auto-generated Swagger API docs.

## Features

- **Authentication & Token Management:** Uses JWTs with short-lived access tokens and long-lived refresh tokens.
- **Team & Pokémon Management:** Endpoints to manage teams and Pokémon data.
- **Cron Jobs:** Daily Pokémon sync using node-cron.
- **Rate Limiting:** Global rate limiter to prevent abuse.
- **API Documentation:** Swagger UI auto-generated from route comments.

## Tech Stack

- **Backend:** Node.js, Express.js, TypeScript
- **Database:** MongoDB with Mongoose
- **Auth:** JWT, express-session, and secure cookies
- **Docs:** Swagger (swagger-jsdoc & swagger-ui-express)
- **Others:** node-cron, express-rate-limit

## Getting Started

### Prerequisites

- Node.js (v16+)
- MongoDB (local or cloud instance)

