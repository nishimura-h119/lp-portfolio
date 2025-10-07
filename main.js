const works = [
  {
    id: 1,
    type: "lp",
    genre: ["medical"],
    image: "assets/images/works/aragishi_lp.jpg",
    title: "新岸歯科クリニック| 受診促進LP",
    isPersonal: true,
  },
  {
    id: 2,
    type: "lp",
    genre: ["medical"],
    image: "assets/images/works/tubasa_lp.jpg",
    title: "つばさ訪問看護ステーション | 採用LP",
    isPersonal: true,
  },
  {
    id: 3,
    type: "lp",
    genre: ["medical"],
    image: "assets/images/works/hatio_lp.jpg",
    title: "八尾内科クリニック| 受診促進LP",
    isPersonal: true,
  },
  {
    id: 4,
    type: "lp",
    genre: ["medical"],
    image: "assets/images/works/moriyama_hp.jpg",
    title: "森山クリニック | Webサイト",
    isPersonal: true,
  },
  {
    id: 5,
    type: "banner",
    genre: ["medical", "women"],
    image: "assets/images/works/dental_banner_1.jpg",
    title: "歯列矯正 広告バナー",
    isPersonal: true,
  },
  {
    id: 6,
    type: "banner",
    genre: ["medical", "women"],
    image: "assets/images/works/recruit_banner_2.jpg",
    title: "訪問看護 求人LPバナー",
    isPersonal: true,
  },
  {
    id: 7,
    type: "lp",
    genre: ["beauty", "women"],
    image: "assets/images/works/lue_lp.jpg",
    title: "Lue | フェイシャルサロン",
    isPersonal: true,
  },
  {
    id: 8,
    type: "banner",
    genre: ["medical", "women"],
    image: "assets/images/works/recruit_banner_1.jpg",
    title: "訪問看護 求人LPバナー",
    isPersonal: true,
  },
  {
    id: 9,
    type: "banner",
    genre: ["beauty", "women"],
    image: "assets/images/works/matueku_banner_2.jpg",
    title: "まつげエクステ サービス告知バナー",
    isPersonal: true,
  },
  {
    id: 10,
    type: "banner",
    genre: ["women", "other"],
    image: "assets/images/works/apparel_banner_1.jpg",
    title: "アパレルブランド広告バナー ",
    isPersonal: true,
  },
  {
    id: 11,
    type: "lp",
    genre: ["other"],
    image: "assets/images/works/seen_lp.jpg",
    title: "Seen | 感情記録アプリ",
    isPersonal: true,
  },
  {
    id: 12,
    type: "banner",
    genre: ["beauty", "women"],
    image: "assets/images/works/matueku_banner_1.jpg",
    title: "まつげエクステ サービス告知バナー",
    isPersonal: true,
  },
  {
    id: 13,
    type: "banner",
    genre: ["women", "other"],
    image: "assets/images/works/travel_banner_1.jpg",
    title: "海外旅行広告バナー",
    isPersonal: true,
  },
  {
    id: 14,
    type: "banner",
    genre: ["other"],
    image: "assets/images/works/app_banner_1.jpg",
    title: "ローコードアプリ開発システム 広告バナー",
    isPersonal: true,
  },
  {
    id: 15,
    type: "banner",
    genre: ["other", "women"],
    image: "assets/images/works/webinar_banner_1.jpg",
    title: "サービス説明会広告バナー",
    isPersonal: true,
  },
  {
    id: 16,
    type: "banner",
    genre: ["other"],
    image: "assets/images/works/drink_banner_1.jpg",
    title: "桃ドリンク広告バナー",
    isPersonal: true,
  },
  {
    id: 17,
    type: "lp",
    genre: ["other"],
    image: "assets/images/works/hayakawanouen_lp.jpg",
    title: "はやかわ農園 | 販促LP",
    isPersonal: true,
  },
];

document.addEventListener("DOMContentLoaded", () => {
  const worksGrid = document.querySelector(".works-grid");

  works.forEach((work) => {
    const item = document.createElement("div");
    item.className = "work-item";
    item.setAttribute("data-type", work.type);
    item.setAttribute("data-genre", work.genre.join(","));

    item.innerHTML = `
    <div class="work-thumbnail">
      <img src="${work.image}" alt="${work.title}">
    </div>
    <div class="work-text">
    <p class="work-title">${work.title}</p>
    ${work.isPersonal ? '<p class="work-subtitle">(自主制作)</p>' : ""}
    </div>
  `;

    worksGrid.appendChild(item);
    item.addEventListener("click", () => {
      window.location.href = `pages/works/detail.html?id=${work.id}`;
    });
  });

  // 初期状態
  document.querySelector('[data-type="all"]')?.classList.add("active");
  document.querySelector('[data-genre="all"]')?.classList.add("active");

  window.addEventListener("load", () => {
    const msnry = new Masonry(worksGrid, {
      itemSelector: ".work-item",
      columnWidth: worksGrid.offsetWidth / 3 - 10,
      gutter: 10,
      percentPosition: false,
      transitionDuration: 0,
    });

    let currentType = "all";
    let currentGenre = "all";

    function applyFilter() {
      const items = document.querySelectorAll(".work-item");
      let visibleCount = 0;

      items.forEach((item) => {
        const itemType = item.getAttribute("data-type");
        const itemGenres = item.getAttribute("data-genre").split(",");

        const typeMatch = currentType === "all" || itemType === currentType;
        const genreMatch =
          currentGenre === "all" || itemGenres.includes(currentGenre);

        if (typeMatch && genreMatch) {
          item.style.display = "block";
          visibleCount++;
        } else {
          item.style.display = "none";
        }
      });

      // 0件メッセージの表示/非表示
      let emptyMessage = document.querySelector(".empty-message");

      if (visibleCount === 0) {
        if (!emptyMessage) {
          emptyMessage = document.createElement("div");
          emptyMessage.className = "empty-message";
          emptyMessage.textContent =
            "まだこの条件にヒットする制作物はありません。";
          worksGrid.parentElement.insertBefore(
            emptyMessage,
            worksGrid.nextSibling
          );
        }
        emptyMessage.style.display = "block";
        worksGrid.style.display = "none";
      } else {
        if (emptyMessage) {
          emptyMessage.style.display = "none";
        }
        worksGrid.style.display = "block";
      }

      setTimeout(() => {
        if (visibleCount > 0) {
          msnry.destroy();
          const newMsnry = new Masonry(worksGrid, {
            itemSelector: ".work-item",
            columnWidth: worksGrid.offsetWidth / 3 - 10,
            gutter: 10,
            percentPosition: false,
            transitionDuration: 0,
          });
        }
      }, 0);
    }

    // 制作物フィルター
    document.querySelectorAll("[data-type]").forEach((btn) => {
      if (btn.closest(".works-grid")) return;

      btn.addEventListener("click", () => {
        currentType = btn.getAttribute("data-type");
        document.querySelectorAll("[data-type]").forEach((b) => {
          if (!b.closest(".works-grid")) b.classList.remove("active");
        });
        btn.classList.add("active");
        applyFilter();
      });
    });

    // ジャンルフィルター
    document.querySelectorAll("[data-genre]").forEach((btn) => {
      if (btn.closest(".works-grid")) return;

      btn.addEventListener("click", () => {
        currentGenre = btn.getAttribute("data-genre");
        document.querySelectorAll("[data-genre]").forEach((b) => {
          if (!b.closest(".works-grid")) b.classList.remove("active");
        });
        btn.classList.add("active");
        applyFilter();
      });
    });
  });

  // スクロールアニメーション
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, observerOptions);

  // works-gridを監視
  observer.observe(worksGrid);

  // about-contentをすべて監視
  document.querySelectorAll(".about-content").forEach((content) => {
    observer.observe(content);
  });

  // contact-cardをすべて監視
  document.querySelectorAll(".contact-card").forEach((content) => {
    observer.observe(content);
  });
});
