---
name: planning
description: "Use when you have a spec or requirements for a multi-step task, before touching code. Creates detailed implementation plans tailored to Sherif-Auto's vanilla web architecture."
---

# Writing Implementation Plans

## Overview

Write comprehensive implementation plans that any AI agent can execute with zero prior context. Document everything: which files to touch, exact code patterns, testing steps, and verification criteria. Plans must comply with Sherif-Auto's vanilla architecture.

**Announce at start:** "I'm using the planning skill to create the implementation plan."

## Before Planning

1. Read `.ai/context.md` — Understand project structure
2. Read `.ai/technical-specs.md` — Know the hard constraints (vanilla only, no frameworks)
3. Read `.ai/brand-guidelines.md` — Know the design tokens
4. Identify relevant `.agent/workflows/` — These define the operational procedure

## Plan Document Structure

Save plans to: `.ai/plans/YYYY-MM-DD-<feature-name>.md`

### Header (Required)

```markdown
# [Feature Name] Implementation Plan

**Goal:** [One sentence describing what this builds]

**Architecture:** [2-3 sentences about approach — must use vanilla stack]

**Files Affected:**

- Create: `path/to/new-file.js`
- Modify: `path/to/existing-file.css`

**Relevant Workflows:** `/4-2-component-development`, `/3-3-high-fidelity-design`

**Estimated Tasks:** [N tasks]

---
```

## Task Granularity

Each task is a focused, self-contained unit of work:

```markdown
### Task N: [Clear Action Name]

**Files:**

- Create: `CSS/new-component.css`
- Modify: `JS/script.js` (lines 45-60)

**Step 1: Create the HTML structure**
[Exact semantic HTML with BEM class names]

**Step 2: Write the CSS module**
[Full CSS using project tokens from :root variables]

**Step 3: Implement JS logic**
[ES6 module with event delegation pattern]

**Step 4: Add GSAP animation**
[ScrollTrigger or timeline setup]

**Step 5: Verify**

- [ ] Layout correct at 320px, 768px, 1440px
- [ ] GSAP animation smooth at 60fps
- [ ] Gold accent colors match brand guidelines
- [ ] Keyboard navigation works (Tab, Enter, Escape)
- [ ] No console errors
```

## Task Types (Common Patterns)

### New Component Task

1. Create `.css` module file
2. Create `.js` module file
3. Write HTML structure with BEM classes
4. Implement responsive CSS (mobile-first)
5. Add event delegation + state logic
6. Integrate GSAP animations
7. Add to relevant HTML page via `<link>` and `<script type="module">`
8. Test across breakpoints

### Modification Task

1. Identify exact lines to change
2. Show current code → desired code
3. Verify no side effects on related components
4. Test responsive behavior
5. Check GSAP timeline integrity

### Data Integration Task

1. Define data schema in `vehicles_data.js`
2. Create rendering function with template literals
3. Wire up filtering/sorting logic
4. Add GSAP stagger for grid items
5. Test with edge cases (empty data, missing fields)

## Verification Checklist (Every Task)

```markdown
- [ ] Mobile layout correct (320px)
- [ ] Tablet layout correct (768px)
- [ ] Desktop layout correct (1440px)
- [ ] Dark theme integrity maintained
- [ ] Gold accents visible and consistent
- [ ] GSAP animations render at 60fps
- [ ] No `console.log()` left in code
- [ ] No inline styles (exception: GSAP dynamic values)
- [ ] All images have `loading="lazy"` and `alt` text
- [ ] Keyboard navigation functional
```

## Key Rules

- **Exact file paths always** — Never say "the CSS file", say `CSS/gallery-page.css`
- **Complete code in plan** — Never write "add validation" without showing the exact code
- **Vanilla only** — Every solution must use HTML5 + CSS3 + ES6 + GSAP
- **Mobile-first** — Start all CSS from the smallest breakpoint
- **Brand compliant** — All colors, fonts, and spacing from `.ai/brand-guidelines.md`
- **DRY** — Don't duplicate logic. Import shared modules
- **YAGNI** — Only build what the user actually asked for

## Execution Handoff

After saving the plan, ask:

> **"Plan saved to `.ai/plans/<filename>.md`. Ready to start executing Task 1?"**
