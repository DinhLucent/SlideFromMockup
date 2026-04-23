import { spawn } from "node:child_process";
import { mkdir } from "node:fs/promises";
import { request } from "node:http";
import { createServer } from "node:net";
import { join } from "node:path";
import process from "node:process";
import { chromium } from "playwright";

const root = process.cwd();
const outputDir = join(root, "exports");
const pdfPath = join(outputDir, "deck.pdf");
const isWindows = process.platform === "win32";

function getFreePort() {
  return new Promise((resolve, reject) => {
    const server = createServer();

    server.unref();
    server.on("error", reject);
    server.listen(0, "127.0.0.1", () => {
      const address = server.address();

      if (!address || typeof address === "string") {
        reject(new Error("Unable to allocate a preview port."));
        return;
      }

      const { port } = address;
      server.close(() => resolve(port));
    });
  });
}

function waitForServer(targetUrl, timeoutMs = 30_000) {
  const start = Date.now();

  return new Promise((resolve, reject) => {
    const attempt = () => {
      const req = request(targetUrl, (res) => {
        res.resume();
        resolve();
      });

      req.on("error", () => {
        if (Date.now() - start > timeoutMs) {
          reject(new Error(`Timed out waiting for ${targetUrl}`));
          return;
        }

        setTimeout(attempt, 500);
      });

      req.end();
    };

    attempt();
  });
}

const port = await getFreePort();
const url = `http://127.0.0.1:${port}/?mode=export`;
const previewCommand = isWindows ? process.env.ComSpec ?? "cmd.exe" : "npm";
const previewArgs = isWindows
  ? [
      "/d",
      "/s",
      "/c",
      `npm run preview -- --host 127.0.0.1 --port ${port} --strictPort`
    ]
  : ["run", "preview", "--", "--host", "127.0.0.1", "--port", String(port), "--strictPort"];

const preview = spawn(previewCommand, previewArgs, {
  cwd: root,
  stdio: "inherit"
});

try {
  await mkdir(outputDir, { recursive: true });
  await waitForServer(`http://127.0.0.1:${port}`);

  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: {
      width: 1600,
      height: 900
    }
  });

  await page.goto(url, { waitUntil: "networkidle" });
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all(
      Array.from(document.images).map((image) => {
        if (image.complete) {
          return Promise.resolve();
        }

        return new Promise((resolve) => {
          image.addEventListener("load", () => resolve(), { once: true });
          image.addEventListener("error", () => resolve(), { once: true });
        });
      })
    );
  });
  await page.pdf({
    path: pdfPath,
    printBackground: true,
    preferCSSPageSize: true
  });

  await browser.close();
} finally {
  preview.kill();
}
