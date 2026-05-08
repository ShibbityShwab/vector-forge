import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import multer from "multer";
import potrace from "potrace";

async function startServer() {
  const app = express();
  const PORT = 3000;

  const upload = multer({ storage: multer.memoryStorage() });

  app.post("/api/potrace", upload.single("image"), (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: "No image file provided" });
    }

    const turnpolicyStr = req.body.turnpolicy || "black";
    const turdSize = parseInt(req.body.pathomit || "16", 10);
    const optTolerance = parseFloat(req.body.qtres || "0.1");

    let turnPolicy = potrace.Potrace.TURNPOLICY_BLACK;
    const policyMap: Record<string, any> = {
      black: potrace.Potrace.TURNPOLICY_BLACK,
      white: potrace.Potrace.TURNPOLICY_WHITE,
      left: potrace.Potrace.TURNPOLICY_LEFT,
      right: potrace.Potrace.TURNPOLICY_RIGHT,
      minority: potrace.Potrace.TURNPOLICY_MINORITY,
      majority: potrace.Potrace.TURNPOLICY_MAJORITY,
    };
    if (policyMap[turnpolicyStr]) {
      turnPolicy = policyMap[turnpolicyStr];
    }

    const options = {
      turnPolicy,
      turdSize,
      optTolerance,
    };

    potrace.trace(req.file.buffer, options, (err: any, svg: string) => {
      if (err) {
        console.error("Potrace error:", err);
        return res.status(500).json({ error: "Failed to trace image" });
      }
      res.header("Content-Type", "image/svg+xml");
      res.send(svg);
    });
  });

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
