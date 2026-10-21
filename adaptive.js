
(() => {
  "use strict";

  const STORAGE_KEY = "temanPintarV1";
  const RESULT_SELECTOR = "#quizBody .result";

  const topics = {
    "math-fractions": {
      name: "Mengenal Pecahan",
      next: "math-percent",
      nextName: "Persen dalam Kehidupan",
      basics:
        "Mulai lagi dari arti pembilang dan penyebut, lalu kerjakan contoh pecahan sederhana."
    },
    "math-percent": {
      name: "Persen dalam Kehidupan",
      next: "math-fractions",
      nextName: "Mengenal Pecahan",
      basics:
        "Ulangi hubungan persen dengan pecahan per seratus, lalu coba menghitung persen dari bilangan."
    },
    "math-logic": {
      name: "Pola dan Logika",
      next: "math-fractions",
      nextName: "Mengenal Pecahan",
      basics:
        "Pelajari contoh pola sederhana selangkah demi selangkah sebelum mencoba lagi."
    },
    "indo-mainidea": {
      name: "Gagasan Utama",
      next: "indo-vocab",
      nextName: "Kosakata dan Makna",
      basics:
        "Baca paragraf pendek dan cari kalimat yang menyatakan inti pembahasannya."
    },
    "indo-vocab": {
      name: "Kosakata dan Makna",
      next: "indo-mainidea",
      nextName: "Gagasan Utama",
      basics:
        "Ulangi arti kata melalui contoh kalimat dan perhatikan konteksnya."
    }
  };

  let lastSignature = "";

  function readState() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    } catch {
      return {};
    }
  }

  function makeCard(score, lessonId, isDiagnostic) {
    const card = document.createElement("section");
    card.className = "feedback";
    card.style.marginTop = "16px";

    const heading = document.createElement("strong");
    const message = document.createElement("p");
    message.style.marginBottom = "8px";

    const action = document.createElement("p");
    action.style.marginBottom = "0";

    if (isDiagnostic || !topics[lessonId]) {
      heading.textContent = "🌱 Langkah belajar berikutnya";
      message.textContent =
        "Tes awal membantu mengenali titik mulai. Coba latihan pecahan dan persentase untuk melihat topik yang perlu dipelajari.";
      action.textContent =
        "Mulai dari konsep dasar, lalu lanjutkan sesuai hasil latihan.";
    } else {
      const topic = topics[lessonId];
      heading.textContent = "🧭 Saran belajar untukmu";

      if (score < 60) {
        message.textContent =
          `Kita ulangi ${topic.name} pelan-pelan, ya. ` +
          topic.basics;
        action.textContent =
          "Saran: ulangi konsep dan baca pembahasan sebelum mencoba lagi.";
      } else if (score < 80) {
        message.textContent =
          `Kamu sedang berkembang di ${topic.name}. ` +
          "Coba latihan topik ini sekali lagi agar makin paham.";
        action.textContent =
          "Saran: kerjakan latihan serupa, lalu periksa bagian yang masih keliru.";
      } else {
        message.textContent =
          `Bagus! Hasilmu di ${topic.name} sudah menjanjikan. ` +
          `Kamu bisa mencoba materi ${topic.nextName}.`;
        action.textContent =
          "Saran: lanjutkan ke topik berikutnya, kemudian ulangi jika masih kesulitan.";
      }
    }

    card.append(heading, message, action);
    return card;
  }

  function showRecommendation() {
    const result = document.querySelector(RESULT_SELECTOR);
    if (!result || result.dataset.adaptiveShown === "true") return;

    const scoreElement = result.querySelector(".result-score");
    if (!scoreElement) return;

    const score = Number.parseInt(scoreElement.textContent, 10);
    if (!Number.isFinite(score)) return;

    const state = readState();
    const diagnostic = Array.from(result.querySelectorAll("p"))
      .some(p => p.textContent.includes("Tes awal selesai"));

    const entries = Object.entries(state.lessons || {})
      .filter(([, value]) => value && value.lastDate)
      .sort((a, b) =>
        String(b[1].lastDate).localeCompare(String(a[1].lastDate))
      );

    const latest = entries[0];
    const lessonId = diagnostic ? null : latest?.[0] || null;
    const signature = [
      diagnostic ? "diagnostic" : lessonId,
      score,
      latest?.[1]?.lastDate || ""
    ].join(":");

    if (signature === lastSignature) return;
    lastSignature = signature;

    result.dataset.adaptiveShown = "true";
    result.append(makeCard(score, lessonId, diagnostic));
  }

  function start() {
    const target = document.querySelector("#quizBody");
    if (!target) return;

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
    document.addEventListener("DOMContentLoaded", start, { once: true });
  } else {
    start();
  }
})();
        
