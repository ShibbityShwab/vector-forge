# VectorForge

Instantly turn logos into pixel-perfect vectors. VectorForge is a React-based application that allows you to upload flat PNG, JPG, or WebP images and converts them into scalable SVG vector graphics directly in your browser. 

Using the powerful ImageTracer.js engine, VectorForge merges colors and maps perfect scalable paths to ensure your vectorized logos and artwork are crisp and clean.

## Features

- **In-Browser Processing:** Vectorization happens entirely on the client side using ImageTracer.js.
- **Background Removal:** Auto-detects and securely removes outer boundary colors to isolate logos.
- **Edge Smoothing:** Fixes "jaggies" on low-res images by blurring staircased pixels.
- **Color Palette Strictness:** Allows snapping blurry edges into solid main logo colors.
- **Variable Curve Precision:** Tweak the settings to follow the image outline closely or abstract the shapes.
- **Live Preview:** Side-by-side or X-ray overlay view modes for easy comparison.
- **Code Inspection & Exporting:** View the raw SVG code, copy it to clipboard, or download it as a vectorized `.svg` file.

## Advanced Engines Included
VectorForge comes with placeholders for more advanced vectorization engines:
- **ImageTracer.js:** Best for multi-color logos natively in the browser.
- **Potrace (Node/JS):** Industry standard for mathematical Bezier curves.
- **VTracer (Rust/WASM):** State-of-the-art high-fidelity engine built in Rust.

## Technology Stack

- **React 19:** Frontend framework.
- **Vite:** Build tool and development server.
- **Tailwind CSS 3/4:** Utility-first styling framework.
- **Lucide React:** Icon library.
- **ImageTracer.js:** SVG generation and color clustering engine.

## Getting Started

1. Ensure the required dependencies are installed:
   ```bash
   npm install
   ```

2. Start the development server (configured to run on port 3000):
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to the local development environment.

## Deployment

The application is configured to build static frontend files via the `npm run build` command, which relies on Vite and React. The production build generates files into the `dist/` directory.

```bash
npm run build
```

## Contributing

Contributions, bug reports, and feature requests are welcome! Feel free to open an issue or submit a pull request if you want to improve VectorForge, or integrate the remaining vectorization engines (Potrace, VTracer).
