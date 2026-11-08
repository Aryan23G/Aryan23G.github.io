import * as esbuild from "esbuild";

const watch = process.argv.includes("--watch");
const common = {
  bundle: true,
  minify: !watch,
  sourcemap: false,
  target: "es2022",
  platform: "browser",
  // sql.js's Emscripten loader has Node-only branches that are never taken in a browser.
  external: ["fs", "path", "crypto"],
  legalComments: "none",
  logLevel: "info",
};
const app = { ...common, entryPoints: ["src/main.ts"], outfile: "dist/app.js", format: "esm" };
const worker = { ...common, entryPoints: ["src/db/worker.ts"], outfile: "dist/worker.js", format: "iife" };

if (watch) {
  for (const cfg of [app, worker]) (await esbuild.context(cfg)).watch();
} else {
  await Promise.all([esbuild.build(app), esbuild.build(worker)]);
}
