// src/lib/youtube.ts
// Singleton loader for the YouTube IFrame Player API.
// Ensures the script is only injected once even with multiple VideoCard components.

type Callback = () => void;

let scriptInjected = false;
let pending: Callback[] = [];

export function loadYouTubeAPI(callback: Callback): void {
  if (typeof window === "undefined") return;

  // Already fully loaded
  if ((window as any).YT?.Player) {
    callback();
    return;
  }

  // Queue callback
  pending.push(callback);

  if (!scriptInjected) {
    scriptInjected = true;

    // Chain onto any existing global ready callback
    const prev = (window as any).onYouTubeIframeAPIReady as Callback | undefined;
    (window as any).onYouTubeIframeAPIReady = () => {
      if (typeof prev === "function") prev();
      const toRun = [...pending];
      pending = [];
      toRun.forEach((cb) => cb());
    };

    const script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    script.async = true;
    document.head.appendChild(script);
  }
}
