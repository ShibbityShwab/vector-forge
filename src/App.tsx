import React, { useState, useEffect, useRef } from 'react';

// --- CRASH-PROOF INLINE ICONS ---
const IconCode = ({ className }: { className?: string }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>;
const IconUpload = ({ className }: { className?: string }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>;
const IconSettings = ({ className }: { className?: string }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>;
const IconDownload = ({ className }: { className?: string }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>;
const IconPalette = ({ className }: { className?: string }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>;
const IconSplit = ({ className }: { className?: string }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="12" y1="3" x2="12" y2="21"/></svg>;
const IconLayers = ({ className }: { className?: string }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>;
const IconImage = ({ className }: { className?: string }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>;
const IconVector = ({ className }: { className?: string }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/></svg>;
const IconChevronDown = ({ className }: { className?: string }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>;
const IconChevronUp = ({ className }: { className?: string }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"/></svg>;
const IconWand = ({ className }: { className?: string }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72Z"/><path d="m14 7 3 3"/><path d="M5 6v4"/><path d="M19 14v4"/><path d="M10 2v2"/><path d="M7 8H3"/><path d="M21 16h-4"/><path d="M11 3H9"/></svg>;
const IconEraser = ({ className }: { className?: string }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m7 21-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21"/><path d="M22 21H7"/><path d="m5 11 9 9"/></svg>;
const IconCheck = ({ className }: { className?: string }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>;
const IconInfo = ({ className }: { className?: string }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="16" y2="12"/><line x1="12" x2="12.01" y1="8" y2="8"/></svg>;
const IconAlert = ({ className }: { className?: string }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>;

// --- ENGINE METADATA & INFO ---
const ENGINES = [
  {
    id: 'imagetracer',
    name: 'ImageTracer.js',
    badge: 'Pure JS',
    color: 'bg-blue-100 text-blue-800 border-blue-300',
    description: 'Best for multi-color logos. Traces distinct color regions natively in the browser.',
    pros: ['Excellent multi-color support', 'No build step required'],
    cons: ['Can create slightly rounded/polygonal paths on text'],
    install: 'npm install imagetracerjs'
  },
  {
    id: 'potrace',
    name: 'Potrace (Node/JS)',
    badge: 'Industry Standard',
    color: 'bg-amber-100 text-amber-800 border-amber-300',
    description: 'The absolute gold standard for incredibly smooth, perfectly mathematical Bezier curves.',
    pros: ['Perfect, buttery-smooth curves', 'Tiny file sizes'],
    cons: ['Monochrome only', 'Requires a build step for the browser'],
    install: 'npm install potrace'
  },
  {
    id: 'vtracer',
    name: 'VTracer (Rust/WASM)',
    badge: 'State of the Art',
    color: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    description: 'A modern, high-fidelity engine built in Rust and compiled to WebAssembly.',
    pros: ['Next-gen clustering algorithm', 'Handles complex gradients better'],
    cons: ['Requires WASM configuration in bundler'],
    install: 'npm install @visioncortex/vtracer'
  }
];

export default function App() {
  const [engine, setEngine] = useState('imagetracer');
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [svgOutput, setSvgOutput] = useState('');
  const [extractedColors, setExtractedColors] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [copied, setCopied] = useState(false);

  // UX State
  const [viewMode, setViewMode] = useState<'vector' | 'raster' | 'split' | 'overlay'>('vector');
  const [overlayOpacity, setOverlayOpacity] = useState(0.5);
  const [showAdvanced, setShowAdvanced] = useState(true);
  const [showCode, setShowCode] = useState(false);
  const [showEngine, setShowEngine] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Default settings optimized for crisp logo extraction
  const [settings, setSettings] = useState({
    blurradius: 0,     
    ltres: 0.01,        
    qtres: 0.01,        
    pathomit: 8,      
    colorTolerance: 20, 
    removeBackground: true,
    turnpolicy: 'black',      // Potrace specific
    hierarchical: 'stacked',   // VTracer specific
    vtracer_mode: 'spline',
    vtracer_color_precision: 8,
    vtracer_layer_difference: 16,
    vtracer_corner_threshold: 60,
    vtracer_splice_threshold: 45,
    vtracer_length_threshold: 3.5,
    vtracer_max_iterations: 10,
    vtracer_filter_speckle: 1,
    vtracer_path_precision: 5
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let script = document.getElementById('imagetracer-script') as HTMLScriptElement;
    if (!script) {
      script = document.createElement('script');
      script.id = 'imagetracer-script';
      script.src = 'https://cdn.jsdelivr.net/npm/imagetracerjs@1.2.6/imagetracer_v1.2.6.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  // Auto-run trace immediately upon image upload OR engine switch
  useEffect(() => {
    if (previewUrl) {
      processImage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [previewUrl, engine]); 

  const handleFileSelection = (selectedFile: File) => {
    if (selectedFile) {
      setFile(selectedFile);
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
      setSvgOutput('');
      setExtractedColors([]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) handleFileSelection(e.target.files[0]);
  };
  const onDragOver = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(true); };
  const onDragLeave = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(false); };
  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileSelection(e.dataTransfer.files[0]);
      e.dataTransfer.clearData();
    }
  };

  const updateSetting = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const processImage = async () => {
    if (!previewUrl) return;
    setIsProcessing(true);
    setSvgOutput('');
    setExtractedColors([]);

    try {
      if (engine === 'imagetracer') await runImageTracer();
      else if (engine === 'potrace') await runPotrace();
      else if (engine === 'vtracer') await runVTracer();
    } catch (error) {
      console.error(error);
      setSvgOutput(`<svg><text x="20" y="40" fill="red">Error processing image. Check console.</text></svg>`);
      setIsProcessing(false);
    }
  };

  const runImageTracer = () => {
    return new Promise<void>((resolve) => {
      // @ts-ignore
      if (typeof window.ImageTracer === 'undefined') {
        setTimeout(() => resolve(runImageTracer()), 500); 
        return;
      }
      
      const img = new Image();
      img.crossOrigin = "Anonymous";
      
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        if (!ctx) return;
        
        const maxDim = 400;
        let w = img.width, h = img.height;
        if (w > maxDim || h > maxDim) {
          const ratio = Math.min(maxDim/w, maxDim/h);
          w = Math.floor(w * ratio);
          h = Math.floor(h * ratio);
        }
        canvas.width = w;
        canvas.height = h;
        ctx.drawImage(img, 0, 0, w, h);
        
        const imgData = ctx.getImageData(0, 0, w, h);
        const pixels = imgData.data;
        
        const bgR = pixels[0], bgG = pixels[1], bgB = pixels[2], bgA = pixels[3];
        const colorMap = new Map();
        
        for (let i = 0; i < pixels.length; i += 4) {
          if (pixels[i+3] < 50) continue; 
          const r = Math.round(pixels[i] / 5) * 5;
          const g = Math.round(pixels[i+1] / 5) * 5;
          const b = Math.round(pixels[i+2] / 5) * 5;
          const key = `${r},${g},${b}`;
          colorMap.set(key, (colorMap.get(key) || 0) + 1);
        }

        const sortedColors = Array.from(colorMap.entries()).map(([key, count]) => {
          const [r, g, b] = key.split(',').map(Number);
          return { r, g, b, count };
        }).sort((a, b) => (b.count as number) - (a.count as number));

        const tolerance = parseFloat(settings.colorTolerance as any);
        const palette = [];

        for (const color of sortedColors) {
          let merged = false;
          for (const p of palette) {
            const rDist = color.r - p.r;
            const gDist = color.g - p.g;
            const bDist = color.b - p.b;
            const dist = Math.sqrt(rDist*rDist + gDist*gDist + bDist*bDist);

            if (dist < tolerance) {
              const totalCount = p.count + color.count;
              p.r = Math.round((p.r * p.count + color.r * color.count) / totalCount);
              p.g = Math.round((p.g * p.count + color.g * color.count) / totalCount);
              p.b = Math.round((p.b * p.count + color.b * color.count) / totalCount);
              p.count = totalCount;
              merged = true;
              break;
            }
          }
          if (!merged) palette.push({ ...color });
        }
        
        if (palette.length === 0) palette.push({r: 0, g: 0, b: 0, count: 1});
        const finalPalette = palette.map(p => ({r: p.r, g: p.g, b: p.b, a: 255}));

        let bgPaletteColor = null;
        if (bgA > 50) {
          let minDist = Infinity;
          for (const p of finalPalette) {
            const dist = Math.sqrt((bgR-p.r)**2 + (bgG-p.g)**2 + (bgB-p.b)**2);
            if (dist < minDist) {
              minDist = dist;
              bgPaletteColor = p;
            }
          }
        }

        const options = {
          ltres: parseFloat(settings.ltres as any),
          qtres: parseFloat(settings.qtres as any),
          pathomit: parseInt(settings.pathomit as any),
          blurradius: parseFloat(settings.blurradius as any),
          rightangleenhance: true,
          pal: finalPalette 
        };

        // @ts-ignore
        window.ImageTracer.imageToSVG(previewUrl, (svgString) => {
          const parser = new DOMParser();
          const doc = parser.parseFromString(svgString, "image/svg+xml");
          
          if (settings.removeBackground) {
              let targetR = 255, targetG = 255, targetB = 255; 
              if (bgPaletteColor) {
                  targetR = bgPaletteColor.r; targetG = bgPaletteColor.g; targetB = bgPaletteColor.b;
              }
              
              const paths = doc.querySelectorAll("path");
              paths.forEach(path => {
                  const fill = path.getAttribute("fill");
                  if (!fill || fill === "none" || fill === "transparent") return;
                  
                  let r = 255, g = 255, b = 255;
                  const fillClean = fill.replace(/\s/g, '').toLowerCase();
                  if (fillClean.startsWith('#')) {
                      if (fillClean.length === 7) {
                          r = parseInt(fillClean.slice(1, 3), 16);
                          g = parseInt(fillClean.slice(3, 5), 16);
                          b = parseInt(fillClean.slice(5, 7), 16);
                      } else if (fillClean.length === 4) {
                          r = parseInt(fillClean[1]+fillClean[1], 16);
                          g = parseInt(fillClean[2]+fillClean[2], 16);
                          b = parseInt(fillClean[3]+fillClean[3], 16);
                      }
                  } else if (fillClean.startsWith('rgb')) {
                      const match = fillClean.match(/\d+/g);
                      if (match && match.length >= 3) {
                          r = parseInt(match[0], 10);
                          g = parseInt(match[1], 10);
                          b = parseInt(match[2], 10);
                      }
                  }

                  const dist = Math.sqrt((r - targetR)**2 + (g - targetG)**2 + (b - targetB)**2);
                  const isWhite = (r > 245 && g > 245 && b > 245);
                  
                  if (dist < 15 || isWhite) {
                      path.remove();
                  }
              });
          }

          const remainingPaths = doc.querySelectorAll("path");
          const uniqueColors = new Set<string>();
          remainingPaths.forEach(p => {
              const fill = p.getAttribute("fill");
              if (fill && fill !== "none" && fill !== "transparent") {
                  uniqueColors.add(fill);
              }
          });
          setExtractedColors(Array.from(uniqueColors));

          const svgEl = doc.querySelector("svg");
          if (svgEl) {
              const w = svgEl.getAttribute("width");
              const h = svgEl.getAttribute("height");
              if (w && h && !svgEl.getAttribute("viewBox")) {
                  svgEl.setAttribute("viewBox", `0 0 ${parseFloat(w)} ${parseFloat(h)}`);
              }
              svgEl.setAttribute("width", "100%");
              svgEl.setAttribute("height", "100%");
          }

          const cleanSvg = new XMLSerializer().serializeToString(doc);
          
          setSvgOutput(cleanSvg);
          setIsProcessing(false);
          resolve();
        }, options);
      };
      
      img.onerror = () => {
        setSvgOutput(`<svg><text x="20" y="40" fill="red">Error loading image.</text></svg>`);
        setIsProcessing(false);
        resolve();
      };
      
      img.src = previewUrl;
    });
  };

  const runPotrace = () => {
    return new Promise<void>((resolve) => {
      const img = new Image();
      img.crossOrigin = "Anonymous";
      
      img.onload = async () => {
        try {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d', { willReadFrequently: true });
          if (!ctx) throw new Error("Could not get canvas context");
          
          let w = img.width, h = img.height;
          const maxDim = 1200; 
          
          let scale = 1;
          if (Math.max(w, h) > maxDim) {
            scale = maxDim / Math.max(w, h);
            w = Math.floor(w * scale);
            h = Math.floor(h * scale);
          }
          
          canvas.width = w;
          canvas.height = h;

          if (scale < 1) {
              ctx.imageSmoothingEnabled = true;
              ctx.imageSmoothingQuality = 'high';
          }

          ctx.drawImage(img, 0, 0, w, h);
          
          const blob = await new Promise<Blob | null>(res => canvas.toBlob(res, "image/png", 1.0));
          if (!blob) throw new Error("Failed to convert image to blob");

          const formData = new FormData();
          formData.append("image", blob, "image.png");
          formData.append("turnpolicy", settings.turnpolicy);
          formData.append("pathomit", String(settings.pathomit));
          formData.append("qtres", String(settings.qtres));

          const response = await fetch("/api/potrace", {
            method: "POST",
            body: formData,
          });

          if (!response.ok) {
            throw new Error(`Server returned ${response.status}: ${response.statusText}`);
          }

          let svgString = await response.text();

          // If the dev server proxy returns an HTML loading page instead of our API response
          if (svgString.trim().toLowerCase().startsWith("<!doctype") || svgString.includes("<html")) {
            throw new Error("Server is still starting up. Please try again in a moment.");
          }

          const parser = new DOMParser();
          const doc = parser.parseFromString(svgString, "image/svg+xml");
          const errNode = doc.querySelector("parsererror");
          if (errNode) {
            throw new Error("Failed to parse SVG response.");
          }

          const svgEl = doc.querySelector("svg");
          if (svgEl) {
            const wAttr = svgEl.getAttribute("width");
            const hAttr = svgEl.getAttribute("height");
            if (wAttr && hAttr && !svgEl.getAttribute("viewBox")) {
                svgEl.setAttribute("viewBox", `0 0 ${parseFloat(wAttr)} ${parseFloat(hAttr)}`);
            }
            svgEl.setAttribute("width", "100%");
            svgEl.setAttribute("height", "100%");
            svgString = new XMLSerializer().serializeToString(doc);
          }

          setSvgOutput(svgString);
        } catch (error) {
          console.error(error);
          setSvgOutput(`<svg><text x="20" y="40" fill="red">Potrace error: ${error instanceof Error ? error.message : String(error)}</text></svg>`);
        } finally {
          setIsProcessing(false);
          resolve();
        }
      };

      img.onerror = () => {
        setSvgOutput(`<svg><text x="20" y="40" fill="red">Error loading image.</text></svg>`);
        setIsProcessing(false);
        resolve();
      };
      
      img.src = previewUrl;
    });
  };

  const runVTracer = async () => {
    return new Promise<void>((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "Anonymous";
      
      img.onload = async () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        if (!ctx) return;
        
        let w = img.width, h = img.height;
        const targetDim = 1200; // Optimal resolution for smooth spline vtracing
        
        let scale = 1;
        if (Math.max(w, h) !== targetDim) {
          scale = targetDim / Math.max(w, h);
          w = Math.floor(w * scale);
          h = Math.floor(h * scale);
        }
        
        canvas.width = w;
        canvas.height = h;

        if (scale > 1) {
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';
        }

        ctx.drawImage(img, 0, 0, w, h);
        
        const imgData = ctx.getImageData(0, 0, w, h);
        const pixels = imgData.data;
        const bgR = pixels[0], bgG = pixels[1], bgB = pixels[2];
        
        try {
          const vtracer = await import('wasm_vtracer');
          vtracer.init();
          
          const config = new vtracer.TracerConfig();
          config.setColorMode(vtracer.ColorMode.Color);
          config.setHierarchical(settings.hierarchical === 'stacked' ? vtracer.Hierarchical.Stacked : vtracer.Hierarchical.Cutout);
          
          let mode = vtracer.PathSimplifyMode.Spline;
          if (settings.vtracer_mode === 'polygon') mode = vtracer.PathSimplifyMode.Polygon;
          if (settings.vtracer_mode === 'none') mode = vtracer.PathSimplifyMode.None;
          config.setPathSimplifyMode(mode);
          
          config.setFilterSpeckle(settings.vtracer_filter_speckle);
          config.setColorPrecision(settings.vtracer_color_precision); 
          config.setLayerDifference(settings.vtracer_layer_difference);
          config.setCornerThreshold(settings.vtracer_corner_threshold);
          config.setSpliceThreshold(settings.vtracer_splice_threshold);
          config.setLengthThreshold(settings.vtracer_length_threshold);
          config.setMaxIterations(settings.vtracer_max_iterations);
          config.setPathPrecision(settings.vtracer_path_precision);
          
          // imgData.data is Uint8ClampedArray, pass to Uint8Array
          const rawSvg = vtracer.convertImageToSvg(
            new Uint8Array(imgData.data.buffer), 
            imgData.width, 
            imgData.height, 
            config
          );
          config.free();
          
          const parser = new DOMParser();
          const doc = parser.parseFromString(rawSvg, "image/svg+xml");
          
          if (settings.removeBackground) {
              const paths = doc.querySelectorAll("path");
              paths.forEach(path => {
                  const fill = path.getAttribute("fill");
                  if (!fill || fill === "none" || fill === "transparent") return;
                  
                  let r = 255, g = 255, b = 255;
                  const fillClean = fill.replace(/\s/g, '').toLowerCase();
                  if (fillClean.startsWith('#')) {
                      if (fillClean.length === 7) {
                          r = parseInt(fillClean.slice(1, 3), 16);
                          g = parseInt(fillClean.slice(3, 5), 16);
                          b = parseInt(fillClean.slice(5, 7), 16);
                      } else if (fillClean.length === 4) {
                          r = parseInt(fillClean[1]+fillClean[1], 16);
                          g = parseInt(fillClean[2]+fillClean[2], 16);
                          b = parseInt(fillClean[3]+fillClean[3], 16);
                      }
                  } else if (fillClean.startsWith('rgb')) {
                      const match = fillClean.match(/\d+/g);
                      if (match && match.length >= 3) {
                          r = parseInt(match[0], 10);
                          g = parseInt(match[1], 10);
                          b = parseInt(match[2], 10);
                      }
                  }

                  const dist = Math.sqrt((r - bgR)**2 + (g - bgG)**2 + (b - bgB)**2);
                  const isWhite = (r > 245 && g > 245 && b > 245);
                  
                  if (dist < 15 || isWhite) {
                      path.remove();
                  }
              });
          }

          const svgEl = doc.querySelector("svg");
          if (svgEl) {
              const w = svgEl.getAttribute("width");
              const h = svgEl.getAttribute("height");
              if (w && h && !svgEl.getAttribute("viewBox")) {
                  svgEl.setAttribute("viewBox", `0 0 ${parseFloat(w)} ${parseFloat(h)}`);
              }
              svgEl.setAttribute("width", "100%");
              svgEl.setAttribute("height", "100%");
          }
          
          let cleanSvg = new XMLSerializer().serializeToString(doc);
          
          setSvgOutput(cleanSvg);
          setIsProcessing(false);
          resolve();
        } catch (error) {
          console.error(error);
          setSvgOutput(`<svg><text x="20" y="40" fill="red">Error in VTracer: ${error instanceof Error ? error.message : String(error)}</text></svg>`);
          setIsProcessing(false);
          resolve();
        }
      };
      
      img.onerror = () => {
        setSvgOutput(`<svg><text x="20" y="40" fill="red">Error loading image.</text></svg>`);
        setIsProcessing(false);
        resolve();
      };
      
      img.src = previewUrl;
    });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(svgOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadSVG = () => {
    const blob = new Blob([svgOutput], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `vectorized-logo.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const resetWorkspace = () => {
    setPreviewUrl('');
    setSvgOutput('');
    setFile(null);
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans">
      
      {/* Header Navbar */}
      <header className="bg-white border-b border-slate-200 px-4 md:px-6 py-3 md:py-4 flex justify-between items-center sticky top-0 z-20 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="bg-indigo-600 p-1.5 md:p-2 rounded-lg"><IconWand className="w-4 h-4 md:w-5 md:h-5 text-white" /></div>
          <h1 className="text-lg md:text-xl font-extrabold tracking-tight text-slate-900">VectorForge</h1>
        </div>
        
        {previewUrl && (
          <div className="flex gap-3 md:gap-4 items-center">
             <button onClick={resetWorkspace} className="text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors">
              <span className="hidden sm:inline">Upload New Image</span>
              <span className="sm:hidden">Reset</span>
            </button>
            <button onClick={downloadSVG} disabled={!svgOutput || isProcessing} className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white font-bold py-1.5 md:py-2 px-4 md:px-5 rounded-full transition-all shadow-md flex items-center gap-2 text-sm">
              <IconDownload className="w-4 h-4"/> <span className="hidden sm:inline">Download Vector</span>
            </button>
          </div>
        )}
      </header>

      <main className="w-full max-w-7xl mx-auto p-3 sm:p-4 md:p-6 pb-24 space-y-4 md:space-y-6 overflow-x-hidden">
        
        <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />

        {/* State 1: Upload Screen */}
        {!previewUrl && (
          <div className="flex flex-col items-center justify-center min-h-[70vh] max-w-2xl mx-auto text-center space-y-4 md:space-y-6">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight">
              Instantly turn logos into <br className="hidden sm:block"/><span className="text-indigo-600">pixel-perfect vectors.</span>
            </h2>
            <p className="text-base sm:text-lg text-slate-500 max-w-xl mx-auto px-4">
              Upload any flat PNG or JPG. Our engine automatically merges colors and maps perfect scalable paths.
            </p>
            
            <div 
              className={`w-full mt-6 md:mt-8 border-2 border-dashed rounded-2xl md:rounded-3xl p-8 md:p-12 transition-all cursor-pointer group flex flex-col items-center ${isDragging ? 'border-indigo-500 bg-indigo-100 shadow-xl scale-[1.02]' : 'border-indigo-200 bg-white/50 hover:border-indigo-500 hover:bg-indigo-50 hover:shadow-lg'}`}
              onClick={() => fileInputRef.current?.click()}
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
            >
              <div className="bg-indigo-100 p-3 md:p-4 rounded-full mb-3 md:mb-4 group-hover:scale-110 transition-transform">
                <IconUpload className="w-6 h-6 md:w-8 md:h-8 text-indigo-600" />
              </div>
              <p className="text-lg md:text-xl font-bold text-slate-700 text-center">{isDragging ? 'Drop image here!' : 'Click or Drag & Drop to upload image'}</p>
              <p className="text-xs md:text-sm text-slate-500 mt-1 md:mt-2">Supports PNG, JPG, WebP</p>
            </div>
          </div>
        )}

        {/* State 2: Active Workspace */}
        {previewUrl && (
          <div className="flex flex-col xl:flex-row gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500 items-start">
            
            {/* LEFT: MAIN PREVIEW STAGE */}
            <div className="relative w-full flex-1 rounded-2xl md:rounded-3xl overflow-hidden flex flex-col md:flex-row shadow-inner bg-slate-50 border border-slate-200 bg-[length:20px_20px]" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)' }}>
              
              {/* Floating View Tools */}
              <div className="absolute top-4 left-4 z-30 flex flex-col gap-2">
                <div className="grid grid-cols-2 bg-slate-100/90 backdrop-blur-sm p-1 rounded-xl shadow-sm border border-slate-200/50">
                  <button 
                    onClick={() => setViewMode('vector')}
                    className={`flex items-center justify-center whitespace-nowrap gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${viewMode === 'vector' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                  >
                    <IconVector className="w-4 h-4" /> Vector
                  </button>
                  <button 
                    onClick={() => setViewMode('raster')}
                    className={`flex items-center justify-center whitespace-nowrap gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${viewMode === 'raster' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                  >
                    <IconImage className="w-4 h-4" /> Original
                  </button>
                  <button 
                    onClick={() => setViewMode('split')}
                    className={`flex items-center justify-center whitespace-nowrap gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${viewMode === 'split' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                  >
                    <IconSplit className="w-4 h-4" /> Side by Side
                  </button>
                  <button 
                    onClick={() => setViewMode('overlay')}
                    className={`flex items-center justify-center whitespace-nowrap gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${viewMode === 'overlay' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                  >
                    <IconLayers className="w-4 h-4" /> Overlay
                  </button>
                </div>
                
                {viewMode === 'overlay' && (
                  <div className="flex flex-col items-start gap-1 bg-white/90 backdrop-blur-sm px-4 py-3 rounded-xl border border-slate-200/50 shadow-sm animate-in fade-in">
                    <span className="text-xs font-bold text-slate-500">Vector Opacity</span>
                    <input 
                      type="range" min="0" max="1" step="0.05" 
                      value={overlayOpacity} 
                      onChange={(e) => setOverlayOpacity(Number(e.target.value))} 
                      className="w-full accent-indigo-600 cursor-pointer"
                    />
                  </div>
                )}
              </div>

              {isProcessing && (
                <div className="absolute inset-0 z-20 bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center">
                  <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4"/>
                  <p className="font-bold text-slate-700 text-lg">Forging Vector Paths...</p>
                  <p className="text-slate-500 text-sm md:text-base">Running {ENGINES.find(e => e.id === engine)?.name} engine.</p>
                </div>
              )}

              {viewMode === 'vector' && (
                <div className="w-full h-[400px] sm:h-[500px] md:h-[650px] p-4 md:p-8 relative flex items-center justify-center">
                   {svgOutput && (
                     <div 
                        className="absolute inset-0 w-full h-full p-4 md:p-8 [&>svg]:w-full [&>svg]:h-full [&>svg]:object-contain" 
                        dangerouslySetInnerHTML={{ __html: svgOutput }} 
                      />
                   )}
                </div>
              )}

              {viewMode === 'raster' && (
                <div className="w-full h-[400px] sm:h-[500px] md:h-[650px] p-4 md:p-8 relative flex items-center justify-center">
                    <img src={previewUrl} className="absolute inset-0 w-full h-full object-contain p-4 md:p-8 pointer-events-none" alt="Original" />
                </div>
              )}

              {viewMode === 'split' && (
                <>
                  <div className="w-full md:flex-1 h-[350px] sm:h-[450px] md:h-[600px] border-b md:border-b-0 md:border-r border-slate-200 p-4 md:p-6 flex flex-col relative shrink-0">
                    <span className="absolute top-4 left-4 md:left-6 bg-white/90 backdrop-blur px-2.5 py-1 rounded-lg text-[10px] md:text-xs font-bold text-slate-500 shadow-sm z-10">Original Raster</span>
                    <div className="w-full h-full relative">
                       <img src={previewUrl} className="absolute inset-0 w-full h-full object-contain pointer-events-none" alt="Original" />
                    </div>
                  </div>
                  <div className="w-full md:flex-1 h-[350px] sm:h-[450px] md:h-[600px] p-4 md:p-6 flex flex-col relative shrink-0">
                    <span className="absolute top-4 left-4 md:left-6 bg-white/90 backdrop-blur px-2.5 py-1 rounded-lg text-[10px] md:text-xs font-bold text-indigo-600 shadow-sm z-10">Scalable Vector</span>
                    {svgOutput && <div className="w-full h-full relative [&>svg]:absolute [&>svg]:inset-0 [&>svg]:w-full [&>svg]:h-full [&>svg]:object-contain" dangerouslySetInnerHTML={{ __html: svgOutput }} />}
                  </div>
                </>
              )}

              {viewMode === 'overlay' && (
                <div className="w-full h-[400px] sm:h-[500px] md:h-[650px] p-4 md:p-8 relative flex items-center justify-center">
                   <img src={previewUrl} className="absolute inset-0 w-full h-full object-contain p-4 md:p-8 pointer-events-none" alt="Original" />
                   {svgOutput && (
                     <div 
                        className="absolute inset-0 w-full h-full p-4 md:p-8 [&>svg]:w-full [&>svg]:h-full [&>svg]:object-contain pointer-events-none transition-opacity duration-200" 
                        style={{ opacity: overlayOpacity }}
                        dangerouslySetInnerHTML={{ __html: svgOutput }} 
                      />
                   )}
                </div>
              )}
            </div>

            {/* RIGHT: SETTINGS PANEL */}
            <div className="w-full xl:w-80 2xl:w-96 flex flex-col gap-4 shrink-0">
              
              {/* Engine & Palette Card */}
              <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col gap-4">
                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">
                    <IconLayers className="w-5 h-5 text-indigo-500" />
                    Engine:
                  </label>
                  <select 
                      value={engine} 
                      onChange={(e) => setEngine(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer transition-colors hover:bg-slate-100"
                    >
                      {ENGINES.map((eng) => (
                        <option key={eng.id} value={eng.id}>{eng.name}</option>
                      ))}
                  </select>
                </div>

                {engine === 'imagetracer' && extractedColors.length > 0 && !isProcessing && (
                  <div className="pt-4 border-t border-slate-100">
                    <span className="text-xs font-medium text-slate-500 block mb-2">Detected Palette:</span>
                    <div className="flex flex-wrap gap-1.5 p-2 bg-slate-50 rounded-xl border border-slate-100">
                      {extractedColors.map((color, i) => (
                        <div key={i} className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border border-slate-200 shadow-sm transition-transform hover:scale-110 cursor-pointer" style={{ backgroundColor: color }} title={color}/>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Advanced Settings Accordion */}
              <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm h-fit">
                <button 
                  onClick={() => setShowAdvanced(!showAdvanced)} 
                  className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 transition-colors"
                >
                  <div className="flex items-center gap-2 font-bold text-slate-700">
                    <IconSettings className="w-5 h-5 text-slate-500" />
                    {ENGINES.find(e => e.id === engine)?.name} Tweaks
                  </div>
                  {showAdvanced ? <IconChevronUp className="w-5 h-5 text-slate-400" /> : <IconChevronDown className="w-5 h-5 text-slate-400" />}
                </button>
                
                {showAdvanced && (
                  <div className="p-6 space-y-6 border-t border-slate-200 bg-white">
                    
                    {/* --- IMAGETRACER SETTINGS --- */}
                    {engine === 'imagetracer' && (
                      <>
                        <div className="bg-indigo-50 text-indigo-800 p-4 rounded-xl text-sm leading-relaxed border border-indigo-100">
                          <strong>Defaults are now optimized for crisp logos.</strong> Adjust these settings if your resulting shapes are too rounded or if background noise is appearing.
                        </div>

                        <div>
                          <div className="flex justify-between items-center font-semibold text-slate-700 mb-2">
                            <label className="flex items-center gap-2"><IconEraser className="w-4 h-4 text-slate-500" /> Remove Background</label>
                            <button 
                              onClick={() => updateSetting('removeBackground', !settings.removeBackground)}
                              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${settings.removeBackground ? 'bg-indigo-600' : 'bg-slate-300'}`}
                            >
                              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${settings.removeBackground ? 'translate-x-6' : 'translate-x-1'}`} />
                            </button>
                          </div>
                          <p className="text-xs text-slate-500 mb-3">Auto-detects and securely removes the outer boundary color using virtual DOM manipulation.</p>
                        </div>

                        <div className="pt-4 border-t border-slate-100">
                          <div className="flex justify-between font-semibold text-slate-700 mb-1">
                            <label>Edge Smoothing (Pre-Blur)</label>
                            <span className="text-indigo-600 bg-indigo-50 px-2 rounded">{settings.blurradius}px</span>
                          </div>
                          <p className="text-xs text-slate-500 mb-3">Fixes "jaggies" on low-res images. Blurs staircased pixels into a soft gradient before tracing for perfectly smooth curves.</p>
                          <input type="range" min="0" max="5" step="0.5" value={settings.blurradius} onChange={(e) => updateSetting('blurradius', e.target.value)} className="w-full accent-indigo-600" />
                        </div>
                        
                        <div>
                          <div className="flex justify-between font-semibold text-slate-700 mb-1">
                            <label>Color Palette Strictness</label>
                            <span className="text-indigo-600 bg-indigo-50 px-2 rounded">{settings.colorTolerance}</span>
                          </div>
                          <p className="text-xs text-slate-500 mb-3">Forces blurry/anti-aliased edges to snap cleanly into your main solid logo colors. (Low = muddy fringes, High = clean flat colors)</p>
                          <input type="range" min="5" max="150" step="5" value={settings.colorTolerance} onChange={(e) => updateSetting('colorTolerance', e.target.value)} className="w-full accent-indigo-600" />
                        </div>

                        <div>
                          <div className="flex justify-between font-semibold text-slate-700 mb-1">
                            <label>Curve Precision</label>
                            <span className="text-indigo-600 bg-indigo-50 px-2 rounded">{settings.qtres}</span>
                          </div>
                          <p className="text-xs text-slate-500 mb-3">How closely the vector paths follow the image outline. (Lower = tighter details, Higher = looser, more abstracted shapes)</p>
                          <input type="range" min="0.01" max="1" step="0.01" value={settings.qtres} onChange={(e) => { updateSetting('qtres', e.target.value); updateSetting('ltres', e.target.value); }} className="w-full accent-indigo-600" />
                        </div>
                      </>
                    )}

                    {/* --- POTRACE SETTINGS --- */}
                    {engine === 'potrace' && (
                      <div className="space-y-5">
                        <div className="bg-amber-50 text-amber-800 p-4 rounded-xl text-sm leading-relaxed border border-amber-200 flex gap-3">
                          <IconInfo className="w-5 h-5 shrink-0 mt-0.5" />
                          <p>Potrace strictly outputs monochrome (single color) paths. Perfect for stencils, solid icons, or extracting crisp letters.</p>
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-2">Turn Policy</label>
                          <select value={settings.turnpolicy} onChange={(e) => updateSetting('turnpolicy', e.target.value)} className="w-full p-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-indigo-500 outline-none">
                            <option value="black">Prefer Black Paths</option>
                            <option value="white">Prefer White Paths</option>
                            <option value="majority">Majority Rule</option>
                            <option value="minority">Minority Rule</option>
                          </select>
                        </div>
                      </div>
                    )}

                    {/* --- VTRACER SETTINGS --- */}
                    {engine === 'vtracer' && (
                      <div className="space-y-5">
                        <div className="bg-emerald-50 text-emerald-800 p-4 rounded-xl text-sm leading-relaxed border border-emerald-200 flex gap-3">
                          <IconAlert className="w-5 h-5 shrink-0 mt-0.5" />
                          <p>VTracer has been heavily optimized with our WASM implementation. Tweak clustering below for different logo styles.</p>
                        </div>

                        <div>
                          <div className="flex justify-between items-center font-semibold text-slate-700 mb-2">
                            <label className="flex items-center gap-2"><IconEraser className="w-4 h-4 text-slate-500" /> Remove Background</label>
                            <button 
                              onClick={() => updateSetting('removeBackground', !settings.removeBackground)}
                              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${settings.removeBackground ? 'bg-indigo-600' : 'bg-slate-300'}`}
                            >
                              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${settings.removeBackground ? 'translate-x-6' : 'translate-x-1'}`} />
                            </button>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-2">Path Simplify Mode</label>
                          <select value={settings.vtracer_mode} onChange={(e) => updateSetting('vtracer_mode', e.target.value)} className="w-full p-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-indigo-500 outline-none mb-4">
                            <option value="spline">Spline (Smooth Bezier curves, ideal for logos)</option>
                            <option value="polygon">Polygon (Straight lines, good for pixel art)</option>
                            <option value="none">None (Raw pixel edges, no simplification)</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-2">Hierarchical Mode</label>
                          <select value={settings.hierarchical} onChange={(e) => updateSetting('hierarchical', e.target.value)} className="w-full p-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-indigo-500 outline-none mb-4">
                            <option value="stacked">Stacked (Layered Paths, prevents gaps)</option>
                            <option value="cutout">Cutout (No Overlap, good for CNC/Laser)</option>
                          </select>
                        </div>

                        <div className="pt-2 border-t border-slate-100">
                          <div className="flex justify-between font-semibold text-slate-700 mb-1">
                            <label>Filter Speckle (Pixels)</label>
                            <span className="text-indigo-600 bg-indigo-50 px-2 rounded">{settings.vtracer_filter_speckle}</span>
                          </div>
                          <p className="text-xs text-slate-500 mb-3">Ignore distinct clusters smaller than this. Removes noise from JPEGs.</p>
                          <input type="range" min="0" max="64" step="1" value={settings.vtracer_filter_speckle} onChange={(e) => updateSetting('vtracer_filter_speckle', Number(e.target.value))} className="w-full accent-indigo-600" />
                        </div>

                        <div className="pt-2 border-t border-slate-100">
                          <div className="flex justify-between font-semibold text-slate-700 mb-1">
                            <label>Color Precision (Bits)</label>
                            <span className="text-indigo-600 bg-indigo-50 px-2 rounded">{settings.vtracer_color_precision}</span>
                          </div>
                          <p className="text-xs text-slate-500 mb-3">Color fidelity before clustering. 8 = Maximum details (pixel perfect). 6 = Blended gradients.</p>
                          <input type="range" min="1" max="8" step="1" value={settings.vtracer_color_precision} onChange={(e) => updateSetting('vtracer_color_precision', Number(e.target.value))} className="w-full accent-indigo-600" />
                        </div>

                        <div className="pt-2 border-t border-slate-100">
                          <div className="flex justify-between font-semibold text-slate-700 mb-1">
                            <label>Layer Difference (Clustering)</label>
                            <span className="text-indigo-600 bg-indigo-50 px-2 rounded">{settings.vtracer_layer_difference}</span>
                          </div>
                          <p className="text-xs text-slate-500 mb-3">Difference threshold for merging nearby colors. (Lower = More distinct layers, Higher = less colors)</p>
                          <input type="range" min="0" max="255" step="1" value={settings.vtracer_layer_difference} onChange={(e) => updateSetting('vtracer_layer_difference', Number(e.target.value))} className="w-full accent-indigo-600" />
                        </div>

                        <div className="pt-2 border-t border-slate-100">
                          <div className="flex justify-between font-semibold text-slate-700 mb-1">
                            <label>Curve Fitting Iterations</label>
                            <span className="text-indigo-600 bg-indigo-50 px-2 rounded">{settings.vtracer_max_iterations}</span>
                          </div>
                          <p className="text-xs text-slate-500 mb-3">Maximum iterations for fitting smooth curves to corners.</p>
                          <input type="range" min="1" max="50" step="1" value={settings.vtracer_max_iterations} onChange={(e) => updateSetting('vtracer_max_iterations', Number(e.target.value))} className="w-full accent-indigo-600" />
                        </div>

                        <div className="pt-2 border-t border-slate-100">
                          <div className="flex justify-between font-semibold text-slate-700 mb-1">
                            <label>Length Threshold</label>
                            <span className="text-indigo-600 bg-indigo-50 px-2 rounded">{settings.vtracer_length_threshold}</span>
                          </div>
                          <p className="text-xs text-slate-500 mb-3">Minimum length for path segments.</p>
                          <input type="range" min="3.5" max="10.0" step="0.5" value={settings.vtracer_length_threshold} onChange={(e) => updateSetting('vtracer_length_threshold', Number(e.target.value))} className="w-full accent-indigo-600" />
                        </div>

                        <div className="pt-2 border-t border-slate-100">
                          <div className="flex justify-between font-semibold text-slate-700 mb-1">
                            <label>Corner Threshold (Degrees)</label>
                            <span className="text-indigo-600 bg-indigo-50 px-2 rounded">{settings.vtracer_corner_threshold}</span>
                          </div>
                          <p className="text-xs text-slate-500 mb-3">Angle threshold for corner detection.</p>
                          <input type="range" min="0" max="180" step="1" value={settings.vtracer_corner_threshold} onChange={(e) => updateSetting('vtracer_corner_threshold', Number(e.target.value))} className="w-full accent-indigo-600" />
                        </div>
                        
                        <div className="pt-2 border-t border-slate-100">
                          <div className="flex justify-between font-semibold text-slate-700 mb-1">
                            <label>Splice Threshold (Degrees)</label>
                            <span className="text-indigo-600 bg-indigo-50 px-2 rounded">{settings.vtracer_splice_threshold}</span>
                          </div>
                          <p className="text-xs text-slate-500 mb-3">Angle threshold for curve joining.</p>
                          <input type="range" min="0" max="180" step="1" value={settings.vtracer_splice_threshold} onChange={(e) => updateSetting('vtracer_splice_threshold', Number(e.target.value))} className="w-full accent-indigo-600" />
                        </div>

                        <div className="pt-2 border-t border-slate-100">
                          <div className="flex justify-between font-semibold text-slate-700 mb-1">
                            <label>Path Precision (Decimals)</label>
                            <span className="text-indigo-600 bg-indigo-50 px-2 rounded">{settings.vtracer_path_precision}</span>
                          </div>
                          <p className="text-xs text-slate-500 mb-3">Decimals for SVG points (higher means larger filesize but more accurate points).</p>
                          <input type="range" min="0" max="8" step="1" value={settings.vtracer_path_precision} onChange={(e) => updateSetting('vtracer_path_precision', Number(e.target.value))} className="w-full accent-indigo-600" />
                        </div>


                      </div>
                    )}

                    <button onClick={processImage} className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-4 rounded-xl transition-colors shadow-md">
                      Apply Tweaks & Re-Render
                    </button>
                  </div>
                )}
              </div>

              {/* View Code Accordion */}
              <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm h-fit">
                 <button 
                  onClick={() => setShowCode(!showCode)} 
                  className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 transition-colors"
                >
                  <div className="flex items-center gap-2 font-bold text-slate-700">
                    <IconCode className="w-5 h-5 text-slate-500" />
                    View Raw SVG Code
                  </div>
                  {showCode ? <IconChevronUp className="w-5 h-5 text-slate-400" /> : <IconChevronDown className="w-5 h-5 text-slate-400" />}
                </button>
                
                {showCode && (
                  <div className="p-4 border-t border-slate-200 bg-slate-900 relative">
                     <button onClick={copyToClipboard} disabled={!svgOutput || engine !== 'imagetracer'} className="absolute top-6 right-6 bg-slate-700 hover:bg-slate-600 disabled:bg-slate-800 disabled:text-slate-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors shadow-sm">
                      {copied ? 'Copied to Clipboard!' : 'Copy Code'}
                    </button>
                    <textarea 
                      readOnly
                      value={svgOutput}
                      className="w-full h-64 bg-slate-950 text-emerald-400 font-mono text-xs p-4 rounded-xl resize-none border border-slate-800 focus:outline-none"
                    />
                  </div>
                )}
              </div>
              
            </div>
          </div>
        )}

      </main>
    </div>
  );
}