---
name: brainstorming
description: "You MUST use this before any creative work — creating features, building components, adding functionality, or modifying behavior. Explores user intent, requirements, and design before implementation. Tailored for Sherif-Auto's vanilla architecture."
---

# Brainstorming Ideas Into Designs

## Overview

Help turn ideas into fully formed designs and specs through natural collaborative dialogue, specifically within the Sherif-Auto luxury vanilla web ecosystem.

Start by understanding the current project context (check `.ai/` files and relevant source code), then ask questions one at a time to refine the idea. Once you understand what you're building, present the design in small sections (200–300 words), checking after each section whether it looks right.

## Before Starting

1. Read `.ai/context.md` for project overview
2. Read `.ai/brand-guidelines.md` for design constraints
3. Read `.ai/technical-specs.md` for hard technical rules
4. Scan the current codebase structure to understand what exists

## The Process

### Phase 1: Understanding the Idea

- Ask questions **one at a time** to refine the idea
- Prefer multiple-choice questions when possible, but open-ended is fine
- Focus on understanding: purpose, user flow, conversion impact, constraints
- Determine if it's a new page, a new component, or a modification to existing code
- Identify which existing files will be affected

### Phase 2: Exploring Approaches

- Propose **2–3 different approaches** with trade-offs
- All approaches must comply with the vanilla architecture:
  - HTML5 + Vanilla CSS3 + ES6 Modules + GSAP
  - No React, Tailwind, or framework dependencies
- Lead with your recommended option and explain why
- Consider: performance, mobile responsiveness, animation complexity, brand alignment

### Phase 3: Presenting the Design

- Present the design broken into sections:
  1. **HTML Structure** — Semantic elements, BEM class names
  2. **CSS Strategy** — Layout (Grid/Flex), responsive breakpoints, tokens used
  3. **JS Logic** — Module pattern, event delegation, state management
  4. **GSAP Animation** — Timelines, ScrollTrigger, stagger effects
  5. **Data Flow** — How does data get into this component? Static or Firestore?
- Ask after each section whether it looks right
- Be ready to revise and clarify

## After the Design

### Documentation

- Summarize the validated design in a concise implementation brief
- List exact files to create/modify with their purposes

### Implementation (If Continuing)

- Identify the relevant `.agent/workflows/` to follow for execution
- Ask: "Ready to start building? I'll follow the [workflow-name] workflow."

## Key Principles

- **One question at a time** — Don't overwhelm with multiple questions
- **Multiple choice preferred** — Easier to answer than open-ended
- **YAGNI ruthlessly** — Remove unnecessary features from all designs
- **Explore alternatives** — Always propose 2–3 approaches before settling
- **Incremental validation** — Present design in sections, validate each
- **Vanilla first** — Never propose framework solutions. If tempted, find the vanilla equivalent
- **Brand alignment** — Every design decision must reinforce luxury/premium feel
- **Mobile-first** — Start every layout discussion from the 320px perspective
