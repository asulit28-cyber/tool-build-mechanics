# Reusable Studio Engine

A small, dependency-free canvas project with a centered stickman whose right hand follows the mouse.

## Run locally

Open `index.html` in a browser, or serve the folder with any static file server:

```sh
python3 -m http.server
```

Then visit <http://localhost:8000>.

## Structure

- `main.js` wires the application together.
- `src/canvas/` owns canvas setup and the animation loop.
- `src/input/` owns mouse input for the moving arm.
- `src/utils/` contains reusable math helpers.
- `docs/` contains project direction and prompt notes.
- `process/` contains the changelog and visual checkpoints.
