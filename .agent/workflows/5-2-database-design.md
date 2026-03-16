---
description: Backend Development - Database Design
---

# Database Architecture & Design (Sherif-Auto)

START → Define Local JSON Structures → Validate Firebase NoSQL Map → Secure Access → END

## Scope & Context

Sherif-Auto utilizes hybrid data storage: static `/DATA/*.js` objects (like `vehicles_data.js`) for immediately loaded catalog arrays and Firebase Firestore (NoSQL) for dynamic logging, analytics, and messaging.

## Steps:

1. **DATA MODELING (Local Static Data):**
   - For fast-loading grids (e.g., categories, gallery), rely on ES6 exported Arrays/Objects (`const vehicles = [...]`).
   - Define Strict Schema Contracts in comment blocks (e.g., Every vehicle must have `id`, `name`, `brand`, `thumbnail_path`, `images[]`).

2. **NoSQL SCHEMA DESIGN (Firebase Firestore):**
   - Collections represent primary entities (e.g., `requests`, `analytics_events`).
   - Documents are specific entries (e.g., a specific contact form submission).
   - Use flat data structures. Avoid deep nesting inside documents; use sub-collections if an array might exceed 1MB document limits.

3. **RELATIONSHIPS (NoSQL Specific):**
   - Data is inherently separated without strict Foreign Keys.
   - Store lightweight references (e.g., `userId` or `vehicleId`) as raw strings. Denormalize data where read speed is preferred over write consistency.

4. **SECURITY RULES (Firestore):**
   - Deny all writes from unauthenticated Web Clients natively unless triggering a specific Cloud Function endpoint or scoped down to a `contact_requests` collection (`allow create: if request.resource.data.keys().hasAll(['name', 'email', 'message']);`).
   - Read-access controls.

5. **MIGRATION & SEEDING:**
   - Manage local data migrations manually by versioning `vehicles_data.js` and ensuring backwards compatibility with older CSS grid rendering loops.
