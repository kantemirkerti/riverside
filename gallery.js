(() => {
  console.log("gallery.js loaded");

  const GALLERIES = {
    aframe1: [
      { src: "/Images/A1/photo_1_2026-02-15_16-27-06.jpg", caption: "A-frame №1" },
      { src: "/Images/A1/photo_2_2026-02-15_16-27-06.jpg", caption: "A-frame №1" },
      { src: "/Images/A1/photo_3_2026-02-15_16-27-06.jpg", caption: "A-frame №1" },
      { src: "/Images/A1/photo_4_2026-02-15_16-27-06.jpg", caption: "A-frame №1" },
      { src: "/Images/A1/photo_5_2026-02-15_16-27-06.jpg", caption: "A-frame №1" },
      { src: "/Images/A1/photo_6_2026-02-15_16-27-06.jpg", caption: "A-frame №1" },
    ],
    aframe2: [
      { src: "/Images/A2/photo_1_2026-02-15_16-28-31.jpg", caption: "A-frame №2" },
      { src: "/Images/A2/photo_2_2026-02-15_16-28-31.jpg", caption: "A-frame №2" },
      { src: "/Images/A2/photo_3_2026-02-15_16-28-31.jpg", caption: "A-frame №2" },
      { src: "/Images/A2/photo_4_2026-02-15_16-28-31.jpg", caption: "A-frame №2" },
      { src: "/Images/A2/photo_5_2026-02-15_16-28-31.jpg", caption: "A-frame №2" },
      { src: "/Images/A2/photo_6_2026-02-15_16-28-31.jpg", caption: "A-frame №2" },
      { src: "/Images/A2/photo_7_2026-02-15_16-28-31.jpg", caption: "A-frame №2" },
      { src: "/Images/A2/photo_8_2026-02-15_16-28-31.jpg", caption: "A-frame №2" },
      { src: "/Images/A2/photo_9_2026-02-15_16-28-31.jpg", caption: "A-frame №2" },
    ],
    barnhouse: [
      { src: "/Images/BH/photo_1_2026-02-15_15-50-16.jpg", caption: "Барнхаус" },
      { src: "/Images/BH/photo_2_2026-02-15_15-50-16.jpg", caption: "Барнхаус" },
      { src: "/Images/BH/photo_3_2026-02-15_15-50-16.jpg", caption: "Барнхаус" },
      { src: "/Images/BH/photo_4_2026-02-15_15-50-16.jpg", caption: "Барнхаус" },
      { src: "/Images/BH/photo_5_2026-02-15_15-50-16.jpg", caption: "Барнхаус" },
      { src: "/Images/BH/photo_6_2026-02-15_15-50-16.jpg", caption: "Барнхаус" },
      { src: "/Images/BH/photo_7_2026-02-15_15-50-16.jpg", caption: "Барнхаус" },
      { src: "/Images/BH/photo_8_2026-02-15_15-50-16.jpg", caption: "Барнхаус" },
      { src: "/Images/BH/photo_9_2026-02-15_15-50-16.jpg", caption: "Барнхаус" },
    ],
  };

  const modal = document.getElementById("galleryModal");
  const imgEl = document.getElementById("modalImage");
  const capEl = document.getElementById("modalCaption");

  if (!modal || !imgEl || !capEl) {
    console.error("Modal elements not found. Check IDs: galleryModal, modalImage, modalCaption.");
    return;
  }

  let currentGallery = [];
  let index = 0;

  const openModal = () => {
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  const render = () => {
    const item = currentGallery[index];
    if (!item) return;
    imgEl.src = item.src;
    imgEl.alt = item.caption || "Фото";
    capEl.textContent = item.caption || "";
  };

  const prev = () => {
    index = (index - 1 + currentGallery.length) % currentGallery.length;
    render();
  };

  const next = () => {
    index = (index + 1) % currentGallery.length;
    render();
  };

  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".gallery-btn");
    if (!btn) return;

    e.preventDefault();

    const key = btn.getAttribute("data-gallery");
    const gallery = GALLERIES[key];

    if (!gallery || gallery.length === 0) {
      console.error("No gallery found for key:", key);
      return;
    }

    currentGallery = gallery;
    index = 0;
    render();
    openModal();
  });

  modal.addEventListener("click", (e) => {
    if (e.target.matches("[data-close]")) closeModal();
    if (e.target.matches("[data-prev]")) prev();
    if (e.target.matches("[data-next]")) next();
  });

  document.addEventListener("keydown", (e) => {
    if (!modal.classList.contains("is-open")) return;

    if (e.key === "Escape") closeModal();
    if (e.key === "ArrowLeft") prev();
    if (e.key === "ArrowRight") next();
  });
})();
