import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // theme-aware: channels live in globals.css (black by default, inverted under .light)
        surface: {
          900: "rgb(var(--c-surface-900) / <alpha-value>)",
          800: "rgb(var(--c-surface-800) / <alpha-value>)",
          700: "rgb(var(--c-surface-700) / <alpha-value>)",
          600: "rgb(var(--c-surface-600) / <alpha-value>)",
          500: "rgb(var(--c-surface-500) / <alpha-value>)",
          400: "rgb(var(--c-surface-400) / <alpha-value>)",
        },
        brand: {
          DEFAULT: "rgb(var(--c-brand) / <alpha-value>)",
          soft: "rgb(var(--c-brand-soft) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "rgb(var(--c-accent) / <alpha-value>)",
          foreground: "hsl(var(--accent-foreground))",
        },
        ink: "rgb(var(--ink) / <alpha-value>)",
        hair: "rgb(var(--c-hair) / <alpha-value>)",
        // the paper: what a plate, a label or a button face is printed on
        page: "rgb(var(--page) / <alpha-value>)",
        black: {
          DEFAULT: "#000",
          100: "#0a0a0a",
          200: "rgba(10, 10, 10, 0.72)",
          300: "rgba(255, 255, 255, 0.14)",
        },
        white: {
          DEFAULT: "#FFF",
          100: "rgb(var(--c-muted) / <alpha-value>)",
          200: "rgb(var(--c-muted-2) / <alpha-value>)",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      // the set comes from --font-heading / --font-body / --font-accent in globals.css.
      // None of these stacks falls back to a sans-serif: the whole site is serif.
      //   display / mono: Daubenton, engraved capitals (titles, plates, labels)
      //   sans:           Happy Times, the text face
      //   accent:         Bluu Next Bold Italic, for the accent phrase in a title
      fontFamily: {
        sans: ["var(--font-body)", "Georgia", "Times New Roman", "serif"],
        display: ["var(--font-heading)", "Georgia", "Times New Roman", "serif"],
        mono: ["var(--font-heading)", "Georgia", "Times New Roman", "serif"],
        accent: ["var(--font-accent)", "var(--font-body)", "Georgia", "serif"],
      },
      // Piano keys, staff lines and the page of a score have square corners: this
      // theme has no rounded corners at all, so every `rounded-*` resolves to 0 and
      // a stray class from a snippet can never bring one back.
      borderRadius: {
        none: "0",
        sm: "0",
        DEFAULT: "0",
        md: "0",
        lg: "0",
        xl: "0",
        "2xl": "0",
        "3xl": "0",
        full: "0",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
