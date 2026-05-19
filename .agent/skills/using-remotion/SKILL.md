---
name: using-remotion
description: Comprehensive framework for creating, editing, animating, and rendering programmatic videos using Remotion and React. Use this skill when the user wants to "build a video", "create a Remotion project", or "programmatically render videos".
---

# Master Remotion Video Creation

## When to use this skill

- When requested to initialize a new programmatic video project.
- When creating video compositions using React and Remotion components.
- When adding animations, audio, or sequences to a video.
- When rendering or exporting video assets via code.

## Workflow

### 1. Project Initialization & Setup

- [ ] **Check Requirements:** Remotion `create-video` requires `git` and `Node.js`. Ensure they are installed.
- [ ] **Create Project:** Run `npx create-video@latest <project-name>`.
  - _Note:_ If running in an automated environment, use interactive terminal tools or pass the template flag directly, e.g., `cmd /c npx create-video@latest <name> --template blank`.
- [ ] **Dependencies:** Run `npm install` inside the new folder.

### 2. Core Concepts & Structure

- **Root Component (`Root.tsx` or `Root.jsx`):** This is where you define your `<Composition />` components.
  - Required props: `id`, `component`, `durationInFrames`, `fps`, `width`, `height`.
- **Compositions:** A composition is a React component that returns UI for the video. You can have multiple compositions per project for different scenes or aspect ratios.
- **Entry point:** Ensure `src/index.ts` correctly registers your Root.

### 3. Building the Video (Composition)

- [ ] **Absolute Layouts:** Use `AbsoluteFill` to create layers that span the exact width and height of the video.
- [ ] **Sequences:** Use `<Sequence>` components to delay the rendering of elements or clip their duration.
  - `from`: The frame on which this sequence starts.
  - `durationInFrames`: How long this sequence lasts.
- [ ] **Media Types:**
  - **Images:** `<Img src={staticFile("image.png")} />`. Place static assets in the `public/` directory and use the `staticFile` helper.
  - **Audio:** `<Audio src={staticFile("audio.mp3")} volume={1} />`
  - **Video:** `<Video src={staticFile("clip.mp4")} startFrom={0} endAt={120} />`
  - **OffthreadVideo:** Use `<OffthreadVideo>` for better performance if rendering heavy videos, as it extracts frames in a separate thread.

### 4. Advanced Animation & Interpolation

- [ ] **Getting Current Frame/Context:**
  - `useCurrentFrame()`: Returns the current frame number (starts at 0).
  - `useVideoConfig()`: Returns `{ fps, durationInFrames, width, height }`.
- [ ] **Interpolation (`interpolate`):** Map the current frame to a CSS value (opacity, translation, scale).
  ```javascript
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  ```
- [ ] **Spring Animations (`spring`):** Create physics-based animations (bouncy, smooth).
  ```javascript
  const { fps } = useVideoConfig();
  const scale = spring({
    fps,
    frame,
    config: { damping: 10, stiffness: 100, mass: 0.5 },
  });
  ```

### 5. Styling Tips (Vanilla/Inline context)

- Remotion works perfectly with inline styles or plain CSS files.
- Use standard CSS for text, flexbox, and grid. Remember that videos are fixed dimensions based on the composition `width` and `height` (e.g., 1920x1080).
- Be mindful of DOM constraints: Do not use CSS features that aren't consistently supported across browsers, as Remotion relies on an embedded browser (Puppeteer/Chrome) for rendering.

### 6. Dynamic Parameters (Parameterized Videos)

- Use `defaultProps` in `<Composition>` to define placeholder data.
- Read parameters using `getInputProps()` from `remotion` (or directly via props passed to your component).
- This allows batch generation of personalized videos (e.g., changing text, images, or colors dynamically at render time).

### 7. Preview and Rendering

- [ ] **Preview Server:** Start the studio using `npm start`. This opens a web UI specifically designed to scrub through the timeline and debug components.
- [ ] **Rendering to MP4:**
  - Run `npm run build` or the explicit CLI command:
  - `npx remotion render src/index.ts <CompositionId> out/video.mp4`
- [ ] **Optimization Setup:**
  - Use JPEG for still images over PNG if transparency isn't needed.
  - Ensure fonts are properly loaded by injecting them via Google Fonts `<link>` in the HTML or by embedding `@font-face` directly.

## Edge Cases and Troubleshooting

- **Animations snapping or stuttering:** Check if extrapolations (`extrapolateRight`) are set to `"clamp"`.
- **Audio out of sync:** If the frame rate is complex, verify that your absolute starting frames match the audio tracks exact boundaries in milliseconds.
- **Render failing on DOM elements:** Remotion simulates a headless browser. Elements with random IDs, unpredictable async data fetches without using `continueRender`/`delayRender`, or heavy iframe widgets might crash the timeline.
  - **Handling Async:**
    ```javascript
    const handle = delayRender();
    fetchData().then(() => continueRender(handle));
    ```
