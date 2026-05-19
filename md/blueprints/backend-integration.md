# Blueprint: Backend Integration

## 1. Module Description

This blueprint documents the integration approach for Firebase within Sherif-Auto's vanilla environment. It acts as the backbone for analytics and dynamic data storage without relying on heavy frontend frameworks.

## 2. File Map

- **Initialization:** Implemented via Firebase JS SDK CDN links injected at the bottom of standard HTML pages (e.g., `Index.html`, `gallery.html`).
- **Data Hooks:** `JS/DataManager.js` serves as the architectural hook point where Firebase database calls can seamlessly replace static data loading.

## 3. Firebase Architecture

Sherif-Auto emphasizes performance. Therefore, Firebase is accessed via native ES modules.

1.  **Analytics:** Integrated for monitoring user behavior, popular car models searched, and feature utilization (e.g., theme toggle usage).
2.  **Database Strategy:** Any transition from `vehicles_data.js` to live data must happen within `DataManager.js`'s `fetchVehicles()` method to ensure UI components remain decoupled and agnostic to the data source.

## 4. Security Rules & Data Structure (Conceptual)

If Firestore/Realtime Database is utilized:

- **Public Read:** `vehicles`, `services`, `portfolio_images` (Allow read, Deny write).
- **Public Write:** `form_submissions` (Allow write, Deny read).
- **Admin Access:** Full CRUD access secured via Firebase Authentication.

## 5. Maintenance Guide

- **SDK Versioning:** When updating the Firebase SDK, update the CDN version strings meticulously across all HTML files to prevent version mismatch errors.
- **Environment Variables:** Ensure Firebase config keys are valid for the production domain. In a purely vanilla environment, avoid exposing sensitive service account keys; use the standard web API keys constrained by domain restrictions in the Google Cloud Console.
