# Role: Content & Data Manager

## Overview

The Content & Data Manager is the guardian of the website's factual and visual foundation. This role requires meticulous organization of historical automotive data and the precise execution of AI image generation prompts to populate the Sherif-Bach gallery with breathtaking, physically accurate 8K imagery.

## Core Responsibilities

- **Data Curation & Architecture**: Maintain the comprehensive database of car models spanning numerous brands (Dacia, Renault, Peugeot, Volkswagen, etc., as defined in the `BRAND` file).
  - Research historical milestones, production years, and physical specifications for various car models.
  - Structure this data meticulously into structured JSON formats (e.g., `models.json`) within the `DATA` directory.
- **AI Prompt Engineering for 8K Realism**: Utilize and enforce the stringent guidelines established in the `docs.md` (Professional Car Photography Studio Guide).
  - Draft highly specific text prompts detailing camera body requirements (e.g., 50MP+ sensors), focal lengths (85mm-135mm), lighting setups (large overhead softboxes, specific EV adjustments), and precise color constraints (e.g., Obsidian Black, Deep Sea Blue).
  - Ensure all prompts demand accurate real-world dimensions, official badge placements, and realistic environmental shadows.
- **Quality Control**: Review all generated AI outputs against official brand blueprints to ensure absolute physical correctness (fender widths, wheelbase, rooflines). Discard and regenerate anomalous results.
- **Workflow Automation Integration**: Work alongside infrastructure roles to trigger or manage bulk prompt processing (e.g., using Python automation scripts) while navigating API rate limits responsibly.

## Key Deliverables

- A highly organized, accurate `DATA` directory containing well-formatted Markdown and JSON files for each brand and model.
- A vast, continuously growing library of `all_car_prompts.txt` files curated for maximum visual realism.
- The approved, final selection of 8K image assets stored correctly within the file architecture.
