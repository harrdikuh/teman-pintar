
(() => {
  "use strict";

  const STORAGE_KEY = "temanPintarV1";
  const RESULT_SELECTOR = "#quizBody .result";

  const TOPICS = {
    "math-fractions": {
      name: "Mengenal Pecahan",
      advice: "Ulangi pembilang dan penyebut, lalu kerjakan contoh pecahan sederhana."
    },
    "math-percent": {
      name: "Persen dalam Kehidupan",
      advice: "Pelajari hubungan persen dengan pecahan per seratus."
    },
    "math-logic": {
      name: "Pola dan Logika",
      advice: "Pelajari contoh pola sederhana selangkah demi selangkah."
    },
    "indo-mainidea": {
      name: "Gagasan Utama",
      advice: "Baca paragraf pendek dan cari inti pembahasannya."
    },
    "indo-vocab": {
      name: "Kosakata dan Makna",
      advice: "Pelajari arti kata melalui contoh kalimat."
    }
  };

  function showRecommendation() {
    const result = document.querySelector(RESULT_SELECTOR);

    if (!result || result.dataset.adaptiveShown === "true") return;

    const scoreElement = result.querySelector(".result-score");
    if (!scoreElement) return;

    const score = Number.parseInt(scoreElement.textContent, 10);
    if (!Number.isFinite(score)) return;

    let saved = {};

    try {
      saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    } catch (error) {
      console.warn("Progres belajar tidak dapat dibaca.", error);
    }

    const lessons = Object.entries(saved.lessons || {})
      .filter(([, value]) => value && value.lastDate)
      .sort((a, b) =>
        String(b[1].lastDate).localeCompare(String(a[1].lastDate))
      );

    const latest = lessons[0];
    const topic = latest ? TOPICS[latest[0]] : null;

    const card = document.createElement("section");
    card.className = "feedback";
    card.style.marginTop = "16px";

    const heading = document.createElement("h3");
    heading.textContent = "🧭 Saran belajar untukmu";

    const message = document.createElement("p");

    if (score < 60) {
      message.textContent = topic
        ? `Yuk, pelajari kembali ${topic.name}. ${topic.advice}`
        : "Yuk, mulai dari konsep dasar dan latihan secara bertahap.";
    } else if (score < 80) {
      message.textContent = topic
        ? `Kamu sedang berkembang di ${topic.name}. Coba ulangi latihan dan periksa jawaban yang keliru.`
        : "Terus berlatih dan periksa jawaban yang masih keliru.";
    } else {
      message.textContent = topic
        ? `Bagus! Hasilmu di ${topic.name} sudah menjanjikan. Coba tantangan berikutnya.`
        : "Bagus! Pertahankan semangat dan lanjutkan latihan.";
    }

    const note = document.createElement("p");
    note.textContent = "Saran ini berdasarkan nilai latihan yang baru selesai.";

    card.append(heading, message, note);
    result.appendChild(card);
    result.dataset.adaptiveShown = "true";
  }

  function start() {
    const target = document.querySelector("#quizBody");
    if (!target) return;

    const observer = new MutationObserver(showRecommendation);

    observer.observe(target, {
      childList: true,
      subtree: true
    });

    showRecommendation();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  } else {
    start();
  }
})();
      
