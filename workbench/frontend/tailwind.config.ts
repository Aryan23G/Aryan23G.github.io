import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./hooks/**/*.{ts,tsx}",
    "./node_modules/@tremor/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "sans-serif"],
        mono: ["ui-monospace", "JetBrains Mono", "SF Mono", "Menlo", "Consolas", "Liberation Mono", "monospace"],
      },
      fontSize: { "2xs": ["0.6875rem", { lineHeight: "1rem" }] },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        panel: "hsl(var(--panel))",
        primary: { DEFAULT: "hsl(var(--primary))", foreground: "hsl(var(--primary-foreground))" },
        muted: { DEFAULT: "hsl(var(--muted))", foreground: "hsl(var(--muted-foreground))" },
        accent: { DEFAULT: "hsl(var(--accent))", foreground: "hsl(var(--accent-foreground))" },
        destructive: { DEFAULT: "hsl(var(--destructive))", foreground: "hsl(var(--destructive-foreground))" },
        // Tremor (dark) tokens mapped onto the same palette.
        "dark-tremor": {
          brand: { faint: "#0b1d24", muted: "#164e63", subtle: "#0e7490", DEFAULT: "#22d3ee", emphasis: "#67e8f9", inverted: "#09090b" },
          background: { muted: "#0f0f12", subtle: "#18181b", DEFAULT: "#111113", emphasis: "#d4d4d8" },
          border: { DEFAULT: "#27272a" },
          ring: { DEFAULT: "#27272a" },
          content: { subtle: "#52525b", DEFAULT: "#a1a1aa", emphasis: "#e4e4e7", strong: "#fafafa", inverted: "#000000" },
        },
      },
      boxShadow: {
        "dark-tremor-input": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        "dark-tremor-card": "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        "dark-tremor-dropdown": "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
      },
      borderRadius: {
        "tremor-small": "0.25rem",
        "tremor-default": "0.375rem",
        "tremor-full": "9999px",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "spin-slow": { to: { transform: "rotate(360deg)" } },
      },
      animation: { "spin-slow": "spin-slow 1.6s linear infinite" },
    },
  },
  safelist: [
    {
      pattern:
        /^(bg|text|border|ring|stroke|fill)-(slate|zinc|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|fuchsia|pink|rose)-(400|500)$/,
      variants: ["hover", "ui-selected"],
    },
  ],
  plugins: [require("@headlessui/tailwindcss")],
};

export default config;
