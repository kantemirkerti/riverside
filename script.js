(function () {
    const HOLD_MS = 1100;         // how long the logo "hovers"
    const MOVE_MS = 2200;         // must match your CSS transform transition
    const OVERLAY_FADE_MS = 900;  // smoother fade-out
  
    function waitForImage(img) {
      return new Promise((resolve) => {
        if (!img) return resolve();
        if (img.complete && img.naturalWidth > 0) return resolve();
  
        const done = () => resolve();
        img.addEventListener("load", done, { once: true });
        img.addEventListener("error", done, { once: true });
      });
    }
  
    function start() {
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
  
      // Fade in
      requestAnimationFrame(() => {
        introLogo.classList.add("is-visible");
      });
  
      // Hold then move
      setTimeout(() => {
        const from = introLogo.getBoundingClientRect();
        const to = headerLogo.getBoundingClientRect();
  
        if (!from.height || !to.height) return finishNow();
  
        const scale = to.height / from.height;
        const dx = to.left - from.left;
        const dy = to.top - from.top;
  
        // Force the browser to commit initial state before changing transform
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            introLogo.style.transform = `translate(${dx}px, ${dy}px) scale(${scale})`;
          });
        });
  
        const FADE_START_BEFORE_END_MS = 450;   // when overlay starts fading
        const HEADER_REVEAL_BEFORE_END_MS = 520; // reveal header a bit BEFORE fade starts (prevents gap)

        setTimeout(() => {
        // reveal header slightly earlier so it's already there when the overlay/logo fade begins
        document.body.classList.remove("intro-running");
        document.body.classList.add("intro-done");
        }, Math.max(0, MOVE_MS - HEADER_REVEAL_BEFORE_END_MS));

        setTimeout(() => {
        intro.style.transition = `opacity ${OVERLAY_FADE_MS}ms ease`;
        intro.style.opacity = "0";
        }, Math.max(0, MOVE_MS - FADE_START_BEFORE_END_MS));

  
        // After move finishes, reveal header + remove overlay
        setTimeout(() => {
          setTimeout(() => intro.remove(), OVERLAY_FADE_MS + 60);
        }, MOVE_MS + 80);
      }, HOLD_MS);
    }
  
    // Use window.load so images have real dimensions in all browsers
    window.addEventListener("load", async () => {
      const intro = document.getElementById("intro");
      const introLogo = intro?.querySelector(".intro-logo");
      const headerLogo = document.getElementById("headerLogo");
  
      await Promise.all([waitForImage(introLogo), waitForImage(headerLogo)]);
      start();
    });
  })();
  