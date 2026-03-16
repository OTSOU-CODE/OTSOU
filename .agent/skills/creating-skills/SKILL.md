---
name: creating-skills
description: "Generates high-quality, predictable, and efficient `.agent/skills/` directories based on user requirements. Use when the user wants to create a new skill or capability. Skills created must align with the Sherif-Auto vanilla web architecture."
---

# Skill Creator

## When to Use

- When the user says "create a skill for X"
- When the user provides instructions and says "turn this into a skill"
- When you need to define a reusable capability for the agent

## Workflow

- [ ] **Analyze Request:** Identify the skill name (gerund form), description, and core logic
- [ ] **Check Existing Skills:** Review `.agent/skills/` to avoid duplication
- [ ] **Create Structure:**
  - [ ] Create directory: `.agent/skills/[skill-name]/`
  - [ ] Create `SKILL.md` (required)
  - [ ] Create `resources/` directory if needed for supplementary docs
- [ ] **Draft Content:**
  - [ ] YAML Frontmatter (strict adherence to standards below)
  - [ ] Core Logic (concise, progressive disclosure)
  - [ ] Checklists and verification instructions
- [ ] **Validate:**
  - [ ] Ensure skill doesn't recommend forbidden technologies (React, Tailwind, npm frameworks)
  - [ ] Verify all file paths use forward slashes `/`
  - [ ] Confirm SKILL.md is under 500 lines

## YAML Frontmatter Standards

The `SKILL.md` must start with YAML frontmatter:

```yaml
---
name: [gerund-form-name] # e.g., "optimizing-images", "creating-components"
description: "[Third-person description with trigger keywords. Max 1024 chars.]"
---
```

**Rules:**

- **name:** Gerund form, kebab-case. Max 64 chars. Lowercase + hyphens only
- **description:** Written in third person. Must include trigger keywords for when the skill activates. Max 1024 chars

## Writing Principles

- **Conciseness:** Focus on the unique logic of the skill. Don't repeat general coding advice
- **Progressive Disclosure:** Keep `SKILL.md` under 500 lines. Link to `resources/` files for deep details
- **Forward Slashes:** Always use `/` for paths, never `\`
- **Architecture Compliance:** Every skill must respect Sherif-Auto's vanilla constraints:
  - HTML5 + CSS3 + ES6 Modules + GSAP
  - No framework or build tool recommendations
  - Mobile-first, dark theme, gold accents
- **Degrees of Freedom:**
  - **Bullet Points** for high-freedom tasks (heuristics, guidelines)
  - **Code Blocks** for medium-freedom (templates, patterns)
  - **Exact Commands** for low-freedom (fragile operations, specific paths)

## Required Sections in SKILL.md

1. **When to Use** — Clear triggers for skill activation
2. **Workflow / Process** — Step-by-step checklist
3. **Core Logic** — The unique knowledge this skill provides
4. **Verification** — How to validate the output
5. **Reference Materials** — Links to related `.ai/` files and `.agent/workflows/`

## Folder Structure

```
[skill-name]/
├── SKILL.md              # Required: Main logic and instructions
├── resources/            # Optional: Deep-dive reference documents
│   ├── reference-a.md
│   └── reference-b.md
├── scripts/              # Optional: Helper scripts
└── examples/             # Optional: Example implementations
```

## Quality Gates

Before finalizing a skill, verify:

- [ ] Name is gerund form and kebab-case
- [ ] Description is third-person with trigger keywords
- [ ] No forbidden technology recommendations (React, Vue, Tailwind, npm, Webpack)
- [ ] All paths use forward slashes
- [ ] SKILL.md is under 500 lines
- [ ] Includes "When to Use" section
- [ ] Includes verification/checklist section
- [ ] Cross-references relevant `.ai/` docs and `.agent/workflows/`
