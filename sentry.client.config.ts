import * as Sentry from "@sentry/nextjs";

// Error reporting starts immediately; the two heavy integrations (Session
// Replay's recorder and the feedback widget) are pulled in later, once the page
// has loaded and the browser is idle, so they don't compete with first paint.
Sentry.init({
  dsn: "https://5d933f9368bc9762da13b3117af53f07@o4508558370603008.ingest.de.sentry.io/4508558374666320",

  // Session Replay: sample 10% of sessions, and every session that errors.
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});

const loadHeavyIntegrations = async () => {
  try {
    const [replay, feedback] = await Promise.all([
      Sentry.lazyLoadIntegration("replayIntegration"),
      Sentry.lazyLoadIntegration("feedbackIntegration"),
    ]);
    Sentry.addIntegration(replay({ maskAllText: true, blockAllMedia: true }));
    Sentry.addIntegration(
      feedback({
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
      })
    );
  } catch {
    /* offline or blocked: the site works the same without them */
  }
};

if (typeof window !== "undefined") {
  const start = () => {
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number;
    };
    // wait out the boot screen too, so the widget never lands on top of it
    setTimeout(() => {
      if (w.requestIdleCallback) w.requestIdleCallback(loadHeavyIntegrations, { timeout: 6000 });
      else loadHeavyIntegrations();
    }, 4000);
  };
  if (document.readyState === "complete") start();
  else window.addEventListener("load", start, { once: true });
}
