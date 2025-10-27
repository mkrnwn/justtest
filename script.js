document.addEventListener("DOMContentLoaded", () => {
  // --- 1. EFEK MENGETIK (LOOPING) ---
  const typingTextElement = document.getElementById("typing-text");
  const textToType = "www.numenportofolio.com";
  const typingSpeed = 100; // ms
  const deletingSpeed = 50; // ms
  const pauseDelay = 2000; // ms (2 detik)
  let charIndex = 0;
  let isDeleting = false;

  function typeLoop() {
    const currentText = typingTextElement.textContent;

    if (isDeleting) {
      // --- Fase Menghapus ---
      if (currentText.length > 0) {
        typingTextElement.textContent = textToType.substring(
          0,
          currentText.length - 1
        );
        setTimeout(typeLoop, deletingSpeed);
      } else {
        isDeleting = false;
        charIndex = 0;
        setTimeout(typeLoop, typingSpeed);
      }
    } else {
      // --- Fase Mengetik ---
      if (charIndex < textToType.length) {
        typingTextElement.textContent = textToType.substring(
          0,
          charIndex + 1
        );
        charIndex++;
        setTimeout(typeLoop, typingSpeed);
      } else {
        // Selesai mengetik, tunggu lalu hapus
        isDeleting = true;
        setTimeout(typeLoop, pauseDelay);
      }
    }
  }
  // Mulai loop mengetik
  typeLoop();

  // --- 2. NAVIGASI UTAMA (FOKUS VIEW + DOTS) ---
  const navLinks = document.querySelectorAll(".nav-menu a");
  const navItems = document.querySelectorAll(".nav-menu li");
  const views = document.querySelectorAll(".view");
  const dots = document.querySelectorAll(".pagination-dots .dot");

  const navigateToView = (targetId) => {
    const targetView = document.querySelector(targetId);
    const targetDataView = targetId.substring(1); // Cth: "about"

    // 1. Ganti view yang aktif
    views.forEach((view) => view.classList.remove("active"));
    if (targetView) {
      targetView.classList.add("active");
    }

    // 2. Ganti tombol nav yang aktif
    navItems.forEach((item) => item.classList.remove("active"));
    const targetNavLinkItem = document.querySelector(
      `.nav-menu a[href="${targetId}"]`
    ).parentElement;
    if (targetNavLinkItem) {
      targetNavLinkItem.classList.add("active");
    }

    // 3. Ganti dot (lampu) yang aktif
    dots.forEach((dot) => dot.classList.remove("active"));
    const targetDot = document.querySelector(
      `.dot[data-view="${targetDataView}"]`
    );
    if (targetDot) {
      targetDot.classList.add("active");
    }
  };

  // Event Listener untuk Nav Links
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href"); // Cth: "#about"
      navigateToView(targetId);
    });
  });

  // --- 3. NAVIGASI DOTS (Klik dot untuk pindah) ---
  dots.forEach((dot) => {
    dot.addEventListener("click", function () {
      const targetDataView = this.dataset.view; // Cth: "about"
      const targetId = `#${targetDataView}`;
      navigateToView(targetId);
    });
  });

  // --- 4. FLIP CARD ---
  document.querySelectorAll(".profile-card").forEach((card) => {
    card.addEventListener("click", function () {
      this.querySelector(".card-inner").classList.toggle("is-flipped");
    });
  });
});