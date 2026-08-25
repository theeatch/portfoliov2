import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://5d933f9368bc9762da13b3117af53f07@o4508558370603008.ingest.de.sentry.io/4508558374666320",

  integrations: [
    Sentry.replayIntegration({
      maskAllText: true,
      blockAllMedia: true,
    }),
    Sentry.feedbackIntegration({
      colorScheme: "dark",
      showBranding: false,
      themeDark: {
        background: "#080C1B",
        backgroundHover: "#131A33",
        foreground: "#E4ECFF",
        border: "1px solid rgba(148,190,255,0.16)",
        submitBackground: "#38BDF8",
        submitBackgroundHover: "#7DD3FC",
        submitBorder: "1px solid rgba(56,189,248,0.4)",
        submitForeground: "#05070F",
        submitForegroundHover: "#05070F",
      },
    }),
  ],
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});
