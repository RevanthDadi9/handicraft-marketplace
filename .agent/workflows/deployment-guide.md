---
description: How to deploy the AuraCraft application to a Linux VM (e.g., Ubuntu) and set up the database.
---

# Deployment Guide for AuraCraft

This guide covers deploying the Next.js application to a Linux Virtual Machine (Ubuntu 20.04/22.04 LTS) and setting up a PostgreSQL database.

## Prerequisites

1.  **A Cloud VM** (AWS EC2, DigitalOcean Droplet, Google Compute Engine, etc.) running Ubuntu 22.04.
2.  **SSH Access** to your VM.
3.  **Domain Name** (Optional but recommended for SSL).

## Phase 1: Server Preparation

1.  **Update System Packages**:
    ```bash
    sudo apt update && sudo apt upgrade -y
    ```

2.  **Install Node.js (v18+)**:
    ```bash
    curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
    sudo apt install -y nodejs
    ```

3.  **Install PostgreSQL**:
    ```bash
    sudo apt install -y postgresql postgresql-contrib
    ```

4.  **Install PM2 (Process Manager)**:
    ```bash
    sudo npm install -g pm2
    ```

5.  **Install Nginx (Reverse Proxy)**:
    ```bash
    sudo apt install -y nginx
    ```

## Phase 2: Database Setup

1.  **Switch to Postgres User and Enter Shell**:
    ```bash
    sudo -u postgres psql
    ```

2.  **Create Database and User**:
    *Replace `strongpassword` with a secure password.*
    ```sql
    CREATE DATABASE auracraft;
    CREATE USER aura_user WITH ENCRYPTED PASSWORD 'strongpassword';
    GRANT ALL PRIVILEGES ON DATABASE auracraft TO aura_user;
    \q
    ```

3.  **Verify Connection**:
    The connection string will be: `postgresql://aura_user:strongpassword@localhost:5432/auracraft`

## Phase 3: Application Deployment

1.  **Clone Your Repository**:
    ```bash
    git clone <your-repo-url> auracraft
    cd auracraft
    ```

2.  **Configure Environment Variables**:
    Create a `.env` file:
    ```bash
    nano .env
    ```
    Paste your variables:
    ```env
    DATABASE_URL="postgresql://aura_user:strongpassword@localhost:5432/auracraft"
    AUTH_SECRET="<generate-a-random-string>"
    # Add other secrets (UPLOADTHING_*, NEXTAUTH_URL=http://<your-vm-ip>)
    ```

3.  **Install Dependencies & Build**:
    ```bash
    npm install
    npx prisma generate
    npx prisma db push  # Or 'migrate deploy' for production
    npm run build
    ```

## Phase 4: Run Application with PM2

1.  **Start the App**:
    ```bash
    pm2 start npm --name "auracraft" -- start
    ```

2.  **Ensure Startup Persistence**:
    ```bash
    pm2 save
    pm2 startup
    # Run the command output by 'pm2 startup'
    ```

## Phase 5: Nginx Configuration (Reverse Proxy)

1.  **Edit Default Configuration**:
    ```bash
    sudo nano /etc/nginx/sites-available/default
    ```

2.  **Update Configuration**:
    Replace the contents with:
    ```nginx
    server {
        listen 80;
        server_name <your-domain-or-ip>;

        location / {
            proxy_pass http://localhost:3000;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
        }
    }
    ```

3.  **Restart Nginx**:
    ```bash
    sudo systemctl restart nginx
    ```

## Phase 6: Firewall Setup (UFW)

1.  **Allow Ports**:
    ```bash
    sudo ufw allow OpenSSH
    sudo ufw allow 'Nginx Full'
    sudo ufw enable
    ```

---
**Verification**: Open your browser and visit `http://<your-vm-ip>`. You should see AuraCraft running.
