# Aryan Gupta — Portfolio

Live at https://aryan23g.github.io (GitHub Pages, served from the default branch).

Static site, no build step needed to deploy:

- `index.html`: content
- `css/site.css`: deep-space HUD theme
- `js/site.js`: Three.js planet, tsParticles starfield, Motion micro-interactions
- `vendor/libs.js`: tree-shaken bundle of three, motion, @tsparticles (source in `vendor/libs.src.js`)
- `resume/Aryan_Gupta_Resume.pdf`, built from `resume/resume.html` with `node resume/build-pdf.cjs`
- `querypilot/`: QueryPilot, browser-only text-to-SQL analytics (live demo + source, tests and eval; see its README)
- `sentineldesk/`: SentinelDesk live demo, a self-contained page running the service desk's rules engine in the browser
- `workbench/`: QueryPilot Workbench, the self-hosted Python + Next.js version (not deployed to Pages; see its README)
- `learn-python/`: 8 Python projects (calculator to Notion sync), each with tests and a LESSON.md on the engineering fundamentals behind it

To rebuild the vendor bundle after changing `vendor/libs.src.js`:

    npm i three@0.170.0 motion@11.15.0 @tsparticles/engine@3.7.1 @tsparticles/slim@3.7.1 esbuild
    npx esbuild vendor/libs.src.js --bundle --minify --format=esm --outfile=vendor/libs.js
