# KalaSync Database & User Management Guide

This guide details how to manage the KalaSync database and monitor the lifecycle of artisans and patrons within our "Managed Marketplace."

## 1. Visual Database Management (Prisma Studio)
For direct, real-time access to the database without writing SQL, we use **Prisma Studio**. This is the recommended way to view all "enrolled" users, their raw profiles, and order statuses.

### How to access:
Run the following command in your terminal:
```powershell
npx prisma studio
```
**This will open a GUI in your browser (usually at `http://localhost:5555`) where you can:**
- View the `User` table to see all registered patrons and artisans.
- Filter by `status` (e.g., see who is `PENDING_APPROVAL`).
- Manually correct data if necessary (e.g., updating a user's `role` or `status`).

---

## 2. Business-Led Enrollment (Elders' Council)
While Prisma Studio shows raw data, the **Elders' Council** is the business-logic gateway for artisan onboarding.

### Admin Review Page:
- **URL**: `/admin`
- **Purpose**: Specifically designed to review artisans who have submitted their "Evidence" (Portfolio & Machine Photos).
- **Functionality**:
    *   Inspect artisan manifestos.
    *   Review visual proof of craftsmanship.
    *   **Approve/Reject**: Approval transitions a user from `PENDING_APPROVAL` to `ACTIVE`, making them public-facing.

---

## 3. The Enrollment State Machine
To understand who is "enrolled," you must understand the `UserStatus` lifecycle implemented in `prisma/schema.prisma`:

| Status | Meaning |
| :--- | :--- |
| `PENDING_VERIFICATION` | User has registered but not yet submitted a profile. |
| `PENDING_APPROVAL` | Artisan has submitted their portfolio and is waiting for Admin review. |
| `ACTIVE` | Artisan is fully vetted and visible in the public marketplace. |
| `SUSPENDED` | Account access has been revoked by an Elder. |

---

## 4. Common CLI Maintenance
Use these commands for structural database maintenance:

- **Apply Schema Changes**:
  ```powershell
  npx prisma db push
  ```
- **Reset & Re-seed (CAUTION)**:
  This wipes the database and populates it with our standard "Trust-First" sample data.
  ```powershell
  npx prisma db push --force-reset
  npx prisma db seed
  ```
- **Generate Client**:
  Run this after any schema change to update the IDE and service layer types.
  ```powershell
  npx prisma generate
  ```

---
> [!IMPORTANT]
> **Trust First**: Never manually set an artisan to `ACTIVE` in Prisma Studio unless they have provided visible proof of their tools and machinery. The integrity of the collective depends on this gatekeeping.
