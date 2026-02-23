---
description: Frontend Development - Project Setup
---

# Project Configuration Workflow (Sherif-Auto)

START → Review Core Repositories → Scaffold Missing Directories → Initialize Globals → END

## Scope & Context

Sherif-Auto relies natively on HTML/CSS/JS without bundlers (`Webpack`, `Vite`) or frameworks (`React`). Setup involves strict structural adherence.

## Steps:

1. **Verify Root Directory Structure:**
   Ensure the following exist:
   - `/CSS/` (for modular CSS files)
   - `/JS/` (for modular JS files)
   - `/images/` (optimized `.webp` roots)
   - `/DATA/` (for storing JSON lists like `vehicles_data.js`)
   - `/Global/` (for AI Agent guidelines)

2. **Scaffold Globals (`style.css`):**
   - Import necessary Google Fonts (`Montserrat`, `Playfair Display`).
   - Declare all `:root` CSS variables (Dark Backgrounds, Gold Accents).
   - Establish CSS Reset and standard `box-sizing: border-box`.

3. **Initialize `config.js`:**
   - Set up Firebase endpoints, base API paths, or global configuration enumerables.
4. **Implement Global Scripts:**
   - Create `script.js` directly handling `DOMContentLoaded` execution.
   - Map module injections (`navbar.js`, `footer.js`).

5. **Verify Version Control (Git):**
   - Ensure `.gitignore` excludes sensitive API keys if migrated to Node scripts in the future.
   - Commit initial scaffolding with a clean `README_Sherif.md`.
