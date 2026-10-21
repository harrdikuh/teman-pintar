
(() => {
  "use strict";

  const STORAGE_KEY = "temanPintarV1";
  const RESULT_SELECTOR = "#quizBody .result";

  const TOPICS = {
    "math-fractions": {
      name: "Mengenal Pecahan",
      advice:
        "Ulangi arti pembilang dan penyebut, lalu kerjakan contoh pecahan sederhana."
    },
    "math-percent": {
      name: "Persen dalam Kehidupan",
      advice:
        "Pelajari hubungan persen dengan pecahan per seratus dan contoh sehari-hari."
    },
    "math-logic": {
      name: "Pola dan Logika",
      advice:
        "Pelajari contoh pola sederhana selangkah demi selangkah."
    },
    "indo-mainidea": {
      name: "Gagasan Utama",
      advice:
        "Baca paragraf pendek dan cari inti pembahasannya."
    },
    "indo-vocab": {
      name: "Kosakata dan Makna",
      advice:
        "Pelajari arti kata melalui contoh kalimat dan konteksnya."
    }
  };

  function readState() {
    try {
      return JSON.parse(
        localStorage.getItem(STORAGE_KEY) || "{}"
      );
    } catch (error) {
      console.warn("Progres belajar tidak dapat dibaca.", error);
      return {};
    }
  }

  function makeRecommendation(score, topic) {
    const card = document.createElement("section");
    card.className = "feedback";
    card.style.marginTop = "16px";

    const heading = document.createElement("h3");
    heading.textContent = "🧭 Saran belajar untukmu";

    const message = document.createElement("p");

    if (score < 60) {
      message.textContent = topic
        ? `Yuk, pelajari kembali ${topic.name}. ${topic.advice}`
        : "Yuk, mulai dari konsep dasar dan kerjakan latihan secara bertahap.";
    } else if (score < 80) {
      message.textContent = topic
        ? `Kamu sedang berkembang di ${topic.name}. Coba ulangi latihan dan periksa jawaban yang keliru.`
        : "Kamu sedang berkembang. Terus berlatih dan periksa jawaban yang masih keliru.";
    } else {
      message.textContent = topic
        ? `Bagus! Hasilmu di ${topic.name} sudah menjanjikan. Pertahankan semangat dan coba tantangan berikutnya.`
        : "Bagus! Pertahankan semangat belajar dan lanjutkan ke latihan berikutnya.";
    }

    const note = document.createElement("p");
    note.textContent =
      "Saran ini menggunakan nilai latihan yang baru selesai.";

    card.append(heading, message, note);
    return card;
  }

  function showRecommendation() {
    const result = document.querySelector(RESULT_SELECTOR);

    if (!result || result.dataset.adaptiveShown === "true") {
      return;
    }

    const scoreElement = result.querySelector(".result-score");
    if (!scoreElement) return;

    const score = Number.parseInt(
      scoreElement.textContent,
      10
    );

    if (!Number.isFinite(score)) return;

    const state = readState();

    const lessons = Object.entries(state.lessons || {})
      .filter(([, value]) => value && value.lastDate)
      .sort((a, b) =>
        String(b[1].lastDate).localeCompare(
          String(a[1].lastDate)
        )
      );

    const latest = lessons[0];
    const topic = latest ? TOPICS[latest[0]] : null;

    const card = makeRecommendation(score, topic);

    result.appendChild(card);
    result.dataset.adaptiveShown = "true";
  }

  function start() {
    const target = document.querySelector("#quizBody");

    if (!target) {
      console.warn("Area latihan #quizBody tidak ditemukan.");
      return;
    }

    const observer = new MutationObserver(() => {
      showRecommendation();
    });

    observer.observe(target, {
      childList: true,
      subtree: true
    });

    showRecommendation();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, {
      once: true
    });
  } else {
    start();
  }
})();
                              
