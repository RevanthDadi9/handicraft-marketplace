# 🧶 KalaSync: System Operations & Master Guide

Welcome to the modernized **KalaSync** marketplace. This document provides a comprehensive overview of how the system operates, the technical architecture, and instructions for running the platform.

---

## 🏛️ System Architecture

KalaSync uses a **Modular Hexagonal-Lite Architecture**, separating concerns into three distinct layers to ensure scalability and maintainability.

```mermaid
graph TD
    UI[Frontend: Next.js App Router] --> Actions[Server Actions: Business Orchestration]
    Actions --> Services[Service Layer: Business Logic]
    Services --> Data[Data Layer: Repositories & Prisma]
    Data --> DB[(PostgreSQL Database)]
    Services --> External[External: Stripe / Uploadthing / Resend]
```

### 1. Data Layer (`/data`)
- **Repositories**: Direct interaction with Prisma. Handles data integrity and complex queries.
- **Example**: `userRepo.ts` fetches profiles and reviews in a single optimized query.

### 2. Service Layer (`/services`)
- **Domain Logic**: The "brains" of the app. Handles status transitions, notification triggers, and permission checks.
- **Example**: `orderService.ts` manages the order state machine (Pending -> Accepted -> Completed).

### 3. UI/Action Layer (`/app`, `/components`)
- **Server Actions**: Thin wrappers that call services and handle revalidation.
- **Modern UI**: Tailored with **Glassmorphism**, **3D Tilt Effects**, and **Aura Gold** accents.

---

## 🚀 Getting Started

### 📦 Prerequisites
- **Node.js**: v18.17.0 or higher.
- **PostgreSQL**: A running instance (local or hosted like Supabase/Neon).

### 🛠️ Installation

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Configure Environment (`.env`)**:
   Ensure your `.env` contains:
   ```env
   DATABASE_URL="postgresql://..."
   NEXTAUTH_SECRET="..."
   STRIPE_SECRET_KEY="..."
   UPLOADTHING_SECRET="..."
   ```

3. **Database Setup**:
   ```bash
   npx prisma db push
   npx prisma db seed
   ```

4. **Launch Development**:
   ```bash
   npm run dev
   ```

---

## 🔄 Core Workflows

### 1. Service Request & Inception
The interaction between the Patron (Customer) and the Artisan (Creator) is orchestrated through the action and service layers.

```mermaid
sequenceDiagram
    participant Patron
    participant UI as AuraUI (Next.js)
    participant Action as OrderActions
    participant Srv as OrderService
    participant Repo as OrderRepository
    participant UT as Uploadthing

    Patron->>UI: Request Service via Modal
    UI->>UT: Upload Reference Images
    UT-->>UI: Return Image URLs
    UI->>Action: createOrder(title, images, etc.)
    Action->>Srv: createDirectOrder(data)
    Srv->>Repo: create(db_payload)
    Repo-->>Srv: Order Created
    Srv-->>Action: Success
    Action-->>UI: Revalidate & Close Modal
    UI-->>Patron: Show order in Dashboard
```

### 2. Order Lifecycle Management
How the status moves from initial request to a completed masterpiece.

```mermaid
sequenceDiagram
    participant Artisan
    participant Patron
    participant Srv as OrderService
    participant Pay as Stripe

    Artisan->>Srv: updateStatus("ACCEPTED")
    Srv->>Artisan: Order Incepted
    Patron->>Pay: Process Payment
    Pay-->>Srv: Payment Success
    Srv->>Artisan: Order marked "IN_PROGRESS"
    Artisan->>Srv: updateStatus("AWAITING_REVIEW")
    Patron->>Srv: updateStatus("COMPLETED")
    Srv->>Patron: "Legacy Crafted Successfully"
```

### 3. Artisan Discovery (Public)
Users browse the **Find Artists** gallery. The UI uses `CreatorCard` with 3D hover effects to highlight elite talent. Metadata is dynamically generated for SEO on every profile.

### 4. Media & Assets
- **Uploadthing**: Powering the high-res reference image uploads.
- **Lucide Icons**: Providing a consistent, premium iconography set.

---

## 🎨 Design Philosophy: "KalaSync Luxury"
- **Obsidian Foundation**: Deep dark themes for focus and premium feel.
- **Aura Gold**: Used sparingly for high-value actions and typography.
- **Glassmorphism**: Backdrop blurs and subtle borders to create depth and sophistication.
- **Dynamic 3D**: Subtle motion that makes the interface feel "alive" and bespoke.

---

## 📚 Documentation Registry
For deeper dives, see the following artifacts in your `.gemini` directory:
- `architecture.md`: High-level system blueprints.
- `services_guide.md`: Detailed service-by-service API maps.
- `walkthrough.md`: History of major refactored features.
