# Sherif-Auto: AI Agent Workflows Reference

The project maintains **27 operational workflows** across 10 disciplines. These are strict execution guides — AI agents **must** use them instead of inventing ad-hoc procedures.

## Workflow Directory

All workflows live in: `.agent/workflows/`

## Quick Reference by Task Type

### "I need to design something"

| Workflow               | Slash Command                 | When to Use                                               |
| ---------------------- | ----------------------------- | --------------------------------------------------------- |
| Design System Creation | `/3-1-design-system-creation` | Adding/modifying CSS variables, tokens, or theme rules    |
| Wireframing & Layout   | `/3-2-wireframing`            | Planning a new section or page layout structure           |
| High-Fidelity Polish   | `/3-3-high-fidelity-design`   | Adding GSAP animations, micro-interactions, visual polish |

### "I need to build something"

| Workflow              | Slash Command                          | When to Use                                             |
| --------------------- | -------------------------------------- | ------------------------------------------------------- |
| Project Setup         | `/4-1-project-setup`                   | Scaffolding new directories, files, or global configs   |
| Component Development | `/4-2-component-development`           | Building a new self-contained UI component (JS + CSS)   |
| Page Development      | `/4-3-page-development`                | Creating a new HTML page with all required imports      |
| Form Implementation   | `/4-4-form-implementation`             | Building accessible forms with validation + Firebase    |
| State Management      | `/4-5-state-management-implementation` | Implementing data flow, PubSub, or DataManager patterns |

### "I need to set up backend/data"

| Workflow                | Slash Command                  | When to Use                                           |
| ----------------------- | ------------------------------ | ----------------------------------------------------- |
| Database Design         | `/5-2-database-design`         | Structuring Firestore collections or local data files |
| Third-Party Integration | `/5-3-third-party-integration` | Adding Firebase SDK, EmailJS, or external API calls   |

### "I need to handle content/assets"

| Workflow         | Slash Command           | When to Use                                            |
| ---------------- | ----------------------- | ------------------------------------------------------ |
| Content Strategy | `/6-1-content-strategy` | Planning SEO copy, brand voice, heading structures     |
| Asset Management | `/6-2-asset-management` | Organizing images, WebP conversion, naming conventions |

### "I need to optimize performance"

| Workflow           | Slash Command             | When to Use                                                 |
| ------------------ | ------------------------- | ----------------------------------------------------------- |
| Performance Audit  | `/7-1-performance-audit`  | Running Lighthouse, checking GSAP 60fps, fixing CWV         |
| Image Optimization | `/7-2-image-optimization` | Converting formats, sizing thumbnails, `<picture>` elements |
| Code Optimization  | `/7-3-code-optimization`  | Splitting files, debouncing events, preventing memory leaks |

### "I need to improve accessibility"

| Workflow              | Slash Command                           | When to Use                                            |
| --------------------- | --------------------------------------- | ------------------------------------------------------ |
| Accessibility Audit   | `/8-1-accessibility-audit`              | Keyboard testing, contrast analysis, ARIA verification |
| Accessible Components | `/8-2-accessible-component-development` | Focus trapping, reduced motion, screen reader testing  |

### "I need to set up SEO"

| Workflow            | Slash Command                   | When to Use                                      |
| ------------------- | ------------------------------- | ------------------------------------------------ |
| Technical SEO Setup | `/9-1-technical-seo-setup`      | Meta tags, canonical URLs, JSON-LD, sitemap.xml  |
| Content SEO         | `/9-2-content-seo-optimization` | Keyword integration, heading hierarchy, alt text |

### "I need to test"

| Workflow              | Slash Command                        | When to Use                                          |
| --------------------- | ------------------------------------ | ---------------------------------------------------- |
| Comprehensive Testing | `/10-1-comprehensive-testing`        | Full QA: JS logic, GSAP regressions, mobile behavior |
| Pre-Launch Checklist  | `/10-2-pre-launch-testing-checklist` | Final go-live sanity checks before deployment        |

### "I need to handle security/docs"

| Workflow                | Slash Command                   | When to Use                                          |
| ----------------------- | ------------------------------- | ---------------------------------------------------- |
| Security Implementation | `/14-1-security-implementation` | Firebase rules, XSS prevention, SRI hashes, headers  |
| Technical Documentation | `/15-1-technical-documentation` | JSDoc, CSS comments, README updates, AI instructions |

### "I need information architecture"

| Workflow          | Slash Command            | When to Use                                         |
| ----------------- | ------------------------ | --------------------------------------------------- |
| Sitemap Creation  | `/2-1-sitemap-creation`  | Planning page hierarchy and sitemap.xml             |
| URL Structure     | `/2-2-url-structure`     | File naming, query parameters, canonical URLs       |
| Navigation Design | `/2-3-navigation-design` | Tubelight navbar, staggered mobile menu, footer nav |

### "I need to research"

| Workflow       | Slash Command     | When to Use                                  |
| -------------- | ----------------- | -------------------------------------------- |
| Deep Searching | `/deep-searching` | Comprehensive internet research on any topic |

## Workflow Execution Rules

1. **Always read the specific workflow file** before executing multi-file changes
2. **Follow steps sequentially** — Each workflow is designed as a pipeline
3. **Don't skip verification steps** — They prevent regressions
4. **Cross-reference related workflows** — Design changes often need both `3-x` and `4-x` workflows
5. **Document changes** — After significant work, update `15-1-technical-documentation`
