---
description: "Perform a deep and comprehensive internet search on a specific topic."
---

// turbo-all

# Deep Search Workflow

## When to Use

Use this workflow when the user needs comprehensive research on a specific topic, technology, or solution approach before making implementation decisions.

## Steps

### 1. Analyze the Request

- Identify the core topic and specific details the user is looking for
- Break it down into primary keywords and secondary questions
- Determine if the research is for: design inspiration, technical solution, API documentation, or competitive analysis

### 2. Initial Broad Search

- Use `search_web` with general terms to get an overview
- Identify key domains, technical terms, or related concepts
- Note authoritative sources (official docs, MDN, CSS-Tricks, GSAP docs, Firebase docs)

### 3. Targeted Deep Dives

- Based on initial results, formulate **3–5 specific queries**
- Use `search_web` again for each sub-topic
- Prioritize:
  - Official documentation (MDN, GSAP, Firebase)
  - Authoritative tutorials (CSS-Tricks, web.dev, Smashing Magazine)
  - Community solutions (Stack Overflow, GitHub Issues)

### 4. Source Verification

- If a specific page looks promising, use `read_url_content` to extract the full content
- Cross-reference findings across multiple sources
- Verify code examples are compatible with vanilla architecture (no React/framework-specific solutions)

### 5. Filter for Architecture Compliance

- **Remove** any findings that require:
  - npm packages or build tools
  - React, Vue, Angular, or Svelte patterns
  - Tailwind, Bootstrap, or CSS framework utilities
- **Keep** findings that work with:
  - Vanilla HTML5, CSS3, ES6+
  - GSAP animation patterns
  - Native browser APIs
  - Firebase Web SDK (ESM CDN)

### 6. Synthesize & Report

- Compile the gathered information into a structured summary
- Organize with clear headings, code examples, and source URLs
- Highlight the **recommended approach** for Sherif-Auto's architecture
- Note any trade-offs, browser compatibility issues, or performance considerations

### 7. Actionable Next Steps

- Suggest which `.agent/workflows/` to follow for implementation
- Identify which files would need to be created or modified
- Flag any potential conflicts with existing codebase
