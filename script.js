document.addEventListener("DOMContentLoaded", async () => {
    document.body.classList.add("intro-running");
  
    const intro = document.getElementById("intro");
    const introLogo = intro?.querySelector(".intro-logo");
    const headerLogo = document.getElementById("headerLogo");
  
    const finishNow = () => {
      document.body.classList.remove("intro-running");
      document.body.classList.add("intro-done");
      intro?.remove();
    };
  
    if (!intro || !introLogo || !headerLogo) return finishNow();
  
    // Wait until both images are actually ready to measure
    const ready = async (img) => {
      try {
        if (img.decode) await img.decode();
        else if (!img.complete) await new Promise((r) => (img.onload = r));
      } catch (_) {}
    };
  
    await Promise.all([ready(introLogo), ready(headerLogo)]);
  
    // 1) Fade in (from transparent)
    requestAnimationFrame(() => {
      introLogo.classList.add("is-visible");
    });
  
    // 2) Hold / hover
    const HOLD_MS = 1100;
    const MOVE_MS = 2200; // must match the transform transition time in CSS
    const OVERLAY_FADE_MS = 250;
  
    setTimeout(() => {
      // Force layout so the browser "commits" initial state before we transform
      introLogo.getBoundingClientRect();
  
      // Measure start & target
      const from = introLogo.getBoundingClientRect();
      const to = headerLogo.getBoundingClientRect();
  
      // If something is still zero, bail gracefully
      if (!from.height || !to.height) return finishNow();
  
      // Calculate perfect translation + scale
      const scale = to.height / from.height;
      const dx = to.left - from.left;
      const dy = to.top - from.top;
  
      // 3) Move + shrink into the exact header logo position
      introLogo.style.transform = `translate(${dx}px, ${dy}px) scale(${scale})`;
  
      // 4) After it lands, reveal header logo & fade out overlay
      setTimeout(() => {
        document.body.classList.remove("intro-running");
        document.body.classList.add("intro-done");
  
        intro.style.transition = `opacity ${OVERLAY_FADE_MS}ms ease`;
        intro.style.opacity = "0";
        setTimeout(() => intro.remove(), OVERLAY_FADE_MS + 50);
      }, MOVE_MS + 50);
    }, HOLD_MS);
  });
  