# Skill: Infrastructure & DevOps Operations

## Overview

This skill encompasses the deployment, monitoring, and automated operational backbone of the Sherif-Bach project. It focuses on ensuring the static site is delivered rapidly, effectively tracked, and supported by necessary backend automation scripts.

## 1. Version Control & Repository Management

- **Git Mastery**: Utilizing Git for all source code management. Employs clear semantic commit messages (e.g., `feat: implement login glassmorphism`, `fix: correct Dacia models JSON`).
- **Branching Strategy**: Managing a structured workflow branching off a primary `main` branch, ensuring features are developed and tested in isolation before integration.

## 2. Deployment & Hosting (Wispbyte Focus)

- **Static Asset Optimization**: Preparing the build directory to ensure HTML, CSS, and JS files are minified and optimized before being pushed to the hosting provider.
- **Wispbyte Configuration**: Understanding how to properly configure project roots, manage necessary environment files (`.env`), and follow designated setup guides (like `README_WISPBYTE.md`) to successfully deploy the site or associated bots.

## 3. Telemetry Integration (Firebase)

- **Analytics Implementation**: Integrating the Firebase SDK script securely into the `<head>` of all global HTML documents.
- **Event Tracking Strategy**: Beyond base pageviews, configuring JavaScript to fire specific tracked events to monitor user behavior, such as tracking usage rates of the mobile filter toggle, tracking the most zoomed-in car models, or monitoring login page form errors.
- **NPM Integration**: Managing core SDK dependencies via `firebase-tools` globally, ensuring CLI access for advanced configuration if required.

## 4. Bot Automation & Sidecar Services

- **Python Automation**: Developing, testing, and ultimately hosting utility scripts (e.g., `millionaire_bot.py` or Discord integration bots).
- **Environment Security**: Safeguarding critical credentials (like `DISCORD_TOKEN`) strictly within `.env` files, ensuring they are perpetually excluded from version control via `.gitignore`.
