# KalaSync Marketplace

A two-sided marketplace built with Next.js 14, Tailwind CSS, and Prisma.

## Prerequisites
- **Node.js**: v18.17.0 or higher.
- **Database**: PostgreSQL.

## Quick Start

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Environment Setup**
    Ensure `.env` exists in root:
    ```env
    DATABASE_URL="postgresql://user:password@localhost:5432/handicraft_db?schema=public"
    AUTH_SECRET="secure-random-string"
    ```

3.  **Database & Prisma**
    Initialize the database and generate the client:
    ```bash
    # Push schema to DB
    npx prisma db push
    
    # Generate Client (Prisma v5 for Node 18 compatibility)
    npx prisma generate
    
    # Seed Data (Optional)
    npx prisma db seed
    ```

4.  **Run Development Server**
    ```bash
    npm run dev
    ```
    Visit [http://localhost:3000](http://localhost:3000).

## Troubleshooting
- **Prisma Error (P1012/Module default)**: Run `npm install prisma@5 @prisma/client@5` to ensure compatibility with Node 18.
- **Port in use**: Stop other node processes or run `npm run dev -- -p 3001`.
