# Blueprint: Maintenance & Automation

## 1. Overview

The rigid structure of the Sherif-Auto static architecture (HTML/Vanilla JS) limits dynamic server capabilities but necessitates dedicated tooling scripts to manage large static data structures comfortably.

## 2. Managing the Vehicle Data Corpus

- **The Artifact:** `JS/vehicles_data.js` holds thousands of lines of explicit car relationships serving the `Category` sorting filters.
- **Automation Strategy:** Future changes should NOT require manually appending objects to this JS file.
- **Workflow Integration:** As seen in previous development sprints, the system maintains discrete backend automation tools (like Python mapping scripts or Prompt automation engines) to ingest standard `CSV` or `.JSON` arrays, map newly dropped asset images (`images/CAR Models/`) against string permutations (e.g., "Mercedes E-Class"), and automatically restructure/output an updated `vehicles_data.js` payload.

## 3. Prompt Management Architecture

- The architecture includes automation structures to loop through specific directories, read textual demands (`.txt` files), inject global photography requirements (from `docs.md`), and format them for copy/paste manipulation engines or automated API generators to streamline 8K realistic render creations without manual compilation burnout.

## 4. Continuous Deployment Pipeline

While `firebase-app.js` conceptually handles analytics natively, when deploying to Firebase Hosting:

- Pre-deploy audits should execute against the flat `.css`/`.js` file structure using native `npx stylelint` or basic formatting scripts to catch mismatched DOM queries before live launch.
