(() => {
    // TODO: replace these with your real image paths
    // You can add as many images as you want per house.
    const GALLERIES = {
      aframe1: [
        { src: "Images/aframe1.jpg", caption: "A-frame №1" },
        // { src: "Images/aframe1_2.jpg", caption: "A-frame №1 — интерьер" },
        // { src: "Images/aframe1_3.jpg", caption: "A-frame №1 — вид из окна" },
      ],
      aframe2: [
        { src: "Images/aframe2.jpg", caption: "A-frame №2" },
        // { src: "Images/aframe2_2.jpg", caption: "A-frame №2 — балкон" },
      ],
      barnhouse: [
        { src: "Images/barnhouse.jpg", caption: "Барнхаус — 130 м²" },
        // { src: "Images/barnhouse_2.jpg", caption: "Барнхаус — гостиная" },
        // { src: "Images/barnhouse_3.jpg", caption: "Барнхаус — спальня" },
      ],
    };
  
    const modal = document.getElementById("galleryModal");
    const imgEl = document.getElementById("modalImage");
    const capEl = document.getElementById("modalCaption");
  
    if (!modal || !imgEl || !capEl) return;
  
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
  
    // Open buttons
    document.addEventListener("click", (e) => {
      const btn = e.target.closest(".gallery-btn");
      if (!btn) return;
  
      e.preventDefault();
      const key = btn.getAttribute("data-gallery");
      const gallery = GALLERIES[key];
  
      if (!gallery || gallery.length === 0) return;
  
      currentGallery = gallery;
      index = 0;
      render();
      openModal();
    });
  
    // Close / nav controls
    modal.addEventListener("click", (e) => {
      if (e.target.matches("[data-close]")) closeModal();
      if (e.target.matches("[data-prev]")) prev();
      if (e.target.matches("[data-next]")) next();
    });
  
    // Keyboard support
    document.addEventListener("keydown", (e) => {
      if (!modal.classList.contains("is-open")) return;
  
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    });
  })();
  