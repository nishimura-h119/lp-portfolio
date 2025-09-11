document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const icon = document.querySelector(".hamburger img");
  const navMenu = document.querySelector(".nav-menu");
  const overlay = document.querySelector(".nav-overlay");
  const menuItems = document.querySelectorAll(".menu_item");

  menuItems.forEach((item) => {
    item.addEventListener("click", () => {
      navMenu.classList.remove("open");
      overlay.classList.remove("open");
      icon.src = "./assets/images/menu.svg";
      icon.alt = "ハンバーガーメニュー";
    });
  });

  // 開閉切り替え
  const toggleMenu = () => {
    const isOpen = navMenu.classList.toggle("open");
    overlay.classList.toggle("open", isOpen);

    if (isOpen) {
      icon.src = "./assets/images/close.svg";
      icon.alt = "メニューを閉じる";
    } else {
      icon.src = "./assets/images/menu.svg";
      icon.alt = "ハンバーガーメニュー";
    }
  };

  // ハンバーガークリックで開閉
  hamburger.addEventListener("click", toggleMenu);

  // オーバーレイクリックで閉じる
  overlay.addEventListener("click", () => {
    navMenu.classList.remove("open");
    overlay.classList.remove("open");
  });
});

// フロートボタンの表示制御
document.addEventListener("DOMContentLoaded", () => {
  const bar = document.querySelector(".float-btns");
  const hero = document.querySelector("header.hero");
  if (!bar) return;

  // --- 監視フラグ ---
  let hideInHero = false; // heroが見えている間は隠す
  let hideAfterLast = false; // 最後のスナップを過ぎたら隠す

  // --- helper: 表示/非表示を統合 ---
  const apply = () => {
    if (hideInHero || hideAfterLast) bar.classList.add("is-hidden");
    else bar.classList.remove("is-hidden");
  };

  // --- 1) heroが見えている間は隠す（6割以上表示で隠す） ---
  if (hero) {
    const ioHero = new IntersectionObserver(
      ([e]) => {
        hideInHero = e.isIntersecting && e.intersectionRatio >= 0.6;
        apply();
      },
      { threshold: [0, 0.6, 1] }
    );
    ioHero.observe(hero);
  }

  // --- 2) 最後のスナップ要素を過ぎたら隠す ---
  // .snap の最後を取得（なければセクション全体の最後でも可）
  const snaps = Array.from(document.querySelectorAll(".snap"));
  const lastSnap = snaps.length ? snaps[snaps.length - 1] : null;

  // 監視用マーカーを自動挿入（既に存在すれば使う）
  let sentinel = document.getElementById("after-snap-sentinel");
  if (!sentinel) {
    sentinel = document.createElement("div");
    sentinel.id = "after-snap-sentinel";
    sentinel.setAttribute("aria-hidden", "true");
    // マーカーは表示に影響しないよう最小サイズ
    Object.assign(sentinel.style, { width: "1px", height: "1px" });
    if (lastSnap && lastSnap.parentNode) {
      lastSnap.parentNode.insertBefore(sentinel, lastSnap.nextSibling);
    } else {
      // フォールバック：body末尾
      document.body.appendChild(sentinel);
    }
  }

  // マーカーが見えたら「最後のスナップを過ぎた」と判定して隠す
  const ioEnd = new IntersectionObserver(
    ([e]) => {
      hideAfterLast = e.isIntersecting; // マーカーがビューポートに入ったらtrue
      apply();
    },
    {
      root: null,
      threshold: 0, // 触れたら判定
      rootMargin: "0px",
    }
  );
  ioEnd.observe(sentinel);

  // --- 初期状態の補正（リロードで中間や最下部から始まる場合） ---
  requestAnimationFrame(() => {
    const rect = hero ? hero.getBoundingClientRect() : null;
    if (rect) {
      hideInHero = rect.top < window.innerHeight * 0.4 && rect.bottom > 0;
    }
    const srect = sentinel.getBoundingClientRect();
    hideAfterLast = srect.top < window.innerHeight && srect.bottom > 0;
    apply();
  });
});

function toggleAccordion(header) {
  const content = header.nextElementSibling;
  const arrow = header.querySelector(".accordion-arrow");
  const arrowImg = arrow.querySelector("img");

  // 他のアコーディオンを閉じる
  const allContents = document.querySelectorAll(".accordion-content");
  const allArrows = document.querySelectorAll(".accordion-arrow");

  allContents.forEach((item) => {
    if (item !== content) {
      item.classList.remove("active");
      item.style.maxHeight = "0";
    }
  });

  allArrows.forEach((item) => {
    if (item !== arrow) {
      item.classList.remove("active");
      const img = item.querySelector("img");
      img.src = "./assets/images/keyboard_arrow_down.svg";
      img.alt = "アコーディオンを開く";
    }
  });

  // クリックされたアコーディオンの開閉
  if (content.classList.contains("active")) {
    content.classList.remove("active");
    content.style.maxHeight = "0";
    arrow.classList.remove("active");
    arrowImg.src = "./assets/images/keyboard_arrow_down.svg";
    arrowImg.alt = "アコーディオンを開く";
  } else {
    content.classList.add("active");
    content.style.maxHeight = "fit-content";
    arrow.classList.add("active");
    arrowImg.src = "./assets/images/keyboard_arrow_up.svg";
    arrowImg.alt = "アコーディオンを閉じる";
  }
}

// ステップのデータ
const treatmentSteps = [
  {
    number: 1,
    title: "無料カウンセリング",
    subtitle:
      "現在のお悩みやご希望を伺い、治療方法や期間の目安をご説明します。",
    image: "./assets/images/flow_1.png",
  },
  {
    number: 2,
    title: "精密検査",
    subtitle:
      "レントゲン撮影や口腔内スキャナーで、歯や顎の状態を正確に確認します。",
    image: "./assets/images/flow_2.png",
  },
  {
    number: 3,
    title: "診断・治療方針の説明",
    subtitle:
      "3Dシミュレーションで治療後の歯並びを確認しながら、最適な治療計画をご提案します。治療方針に同意いただいた後、マウスピースを発注いたします。",
    image: "./assets/images/flow_3.png",
  },
  {
    number: 4,
    title: "治療開始",
    subtitle:
      "発注から1~2か月ほどでマウスピースが到着します。ここから治療開始となります。マウスピースを順番に装着し、1〜2か月ごとに通院しながら歯を動かしていきます。",
    image: "./assets/images/flow_4.png",
  },
  {
    number: 5,
    title: "保定期間",
    subtitle:
      "マウスピースでの矯正が完了したら、リテーナー(保定装置)を装着していただきます。3～6か月に一度通院していただき、歯並びのチェックを行います(約2年)",
    image: "./assets/images/flow_5.png",
  },
];

let currentStepIndex = 0;

// DOM要素の取得
document.addEventListener("DOMContentLoaded", () => {
  const stepCounter = document.getElementById("stepCounter");
  const stageTitle = document.getElementById("stageTitle");
  const stageDescription = document.getElementById("stageDescription");
  const treatmentCard = document.getElementById("treatmentCard");
  const treatmentPrevBtn = document.getElementById("treatmentPrevBtn");
  const treatmentNextBtn = document.getElementById("treatmentNextBtn");
  const stepDots = document.getElementById("stepDots");

  // プログレスドットの初期化
  function initStepDots() {
    stepDots.innerHTML = "";
    treatmentSteps.forEach((_, index) => {
      const dot = document.createElement("div");
      dot.className = `step-indicator-dot ${
        index === currentStepIndex ? "dot-active" : ""
      }`;
      dot.addEventListener("click", () => navigateToStep(index));
      stepDots.appendChild(dot);
    });
  }

  // コンテンツの更新
  function refreshContent() {
    const currentStep = treatmentSteps[currentStepIndex];

    // フェードアウト
    treatmentCard.classList.add("content-fade-out");

    setTimeout(() => {
      if (stepCounter) {
        stepCounter.textContent = currentStep.number;
      }
      stageTitle.textContent = currentStep.title;
      stageDescription.textContent = currentStep.subtitle;

      // 画像の更新
      const stepImage = treatmentCard.querySelector("img");
      if (stepImage) {
        stepImage.src = currentStep.image;
        stepImage.alt = `${currentStep.title}の画像`;
      }

      // フェードイン
      treatmentCard.classList.remove("content-fade-out");

      // ボタンの状態更新
      treatmentPrevBtn.disabled = currentStepIndex === 0;
      treatmentNextBtn.disabled =
        currentStepIndex === treatmentSteps.length - 1;

      // プログレスドットの更新
      document.querySelectorAll(".step-indicator-dot").forEach((dot, index) => {
        dot.classList.toggle("dot-active", index === currentStepIndex);
      });
    }, 150);
  }

  // 指定のステップに移動
  function navigateToStep(stepIndex) {
    if (stepIndex >= 0 && stepIndex < treatmentSteps.length) {
      currentStepIndex = stepIndex;
      refreshContent();
    }
  }

  // 前のステップ
  function goToPreviousStep() {
    if (currentStepIndex > 0) {
      navigateToStep(currentStepIndex - 1);
    }
  }

  // 次のステップ
  function goToNextStep() {
    if (currentStepIndex < treatmentSteps.length - 1) {
      navigateToStep(currentStepIndex + 1);
    }
  }

  // イベントリスナーの設定
  treatmentPrevBtn.addEventListener("click", goToPreviousStep);
  treatmentNextBtn.addEventListener("click", goToNextStep);

  // キーボードナビゲーション
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") goToPreviousStep();
    if (e.key === "ArrowRight") goToNextStep();
  });

  // 初期化
  initStepDots();
  refreshContent();
});
