import * as esbuild from "esbuild";

// node build.mjs           -> both bundles
// node build.mjs web       -> dist/app.js        (the demo page, committed for GitHub Pages)
// node build.mjs server    -> dist-server/server.js (the API, built on the host at deploy time)
const target = process.argv[2];
const builds = [];

if (!target || target === "web") {
  builds.push(
    esbuild.build({
      entryPoints: ["src/web/main.ts"],
      outfile: "dist/app.js",
      bundle: true,
      minify: true,
      format: "esm",
      platform: "browser",
      target: "es2022",
      legalComments: "none",
      logLevel: "info",
    }),
  );
}
if (!target || target === "server") {
  builds.push(
    esbuild.build({
      entryPoints: ["src/server/index.ts"],
      outfile: "dist-server/server.js",
      bundle: true,
      format: "esm",
      platform: "node",
      target: "node20",
      packages: "external",
      sourcemap: true,
      logLevel: "info",
    }),
  );
}
await Promise.all(builds);
