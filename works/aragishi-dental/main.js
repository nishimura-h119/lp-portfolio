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

function toggleAccordion(element) {
  const accordionItem = element.parentElement;
  const isActive = accordionItem.classList.contains("active");

  // 他の全てのアコーディオンを閉じる
  const allItems = document.querySelectorAll(".accordion-item");
  allItems.forEach((item) => {
    item.classList.remove("active");
  });

  // クリックされたアイテムが非アクティブだった場合のみ開く
  if (!isActive) {
    accordionItem.classList.add("active");
  }
}
