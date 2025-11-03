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
    image: "assets/images/works/hachio_lp.jpg",
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
    image: "assets/images/works/dental_banner.png",
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
    genre: ["beauty"],
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
    image: "assets/images/works/hachio_flyer.png",
    title: "人間ドック 受診促進チラシ",
    isPersonal: true,
  },
  // {
  //   id: 11,
  //   type: "lp",
  //   genre: ["other"],
  //   image: "assets/images/works/seen_lp.jpg",
  //   title: "Seen | 感情記録アプリ",
  //   isPersonal: true,
  // },
  {
    id: 12,
    type: "banner",
    genre: ["beauty", "women"],
    image: "assets/images/works/matueku_banner_1.jpg",
    title: "まつげエクステ サービス告知バナー",
    isPersonal: true,
  },
  // {
  //   id: 13,
  //   type: "banner",
  //   genre: ["women", "other"],
  //   image: "assets/images/works/travel_banner_1.jpg",
  //   title: "海外旅行広告バナー",
  //   isPersonal: true,
  // },
  // {
  //   id: 14,
  //   type: "banner",
  //   genre: ["other"],
  //   image: "assets/images/works/app_banner_1.jpg",
  //   title: "ローコードアプリ開発システム 広告バナー",
  //   isPersonal: true,
  // },
  // {
  //   id: 15,
  //   type: "banner",
  //   genre: ["other", "women"],
  //   image: "assets/images/works/webinar_banner_1.jpg",
  //   title: "サービス説明会広告バナー",
  //   isPersonal: true,
  // },
  // {
  //   id: 16,
  //   type: "banner",
  //   genre: ["other"],
  //   image: "assets/images/works/drink_banner_1.jpg",
  //   title: "桃ドリンク広告バナー",
  //   isPersonal: true,
  // },
  // {
  //   id: 17,
  //   type: "lp",
  //   genre: ["other"],
  //   image: "assets/images/works/hayakawanouen_lp.jpg",
  //   title: "はやかわ農園 | 販促LP",
  //   isPersonal: true,
  // },
];

document.addEventListener("DOMContentLoaded", () => {
  const worksGrid = document.querySelector(".works-grid");

  works.forEach((work) => {
    const item = document.createElement("div");
    item.className = "work-item";

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

  window.addEventListener("load", () => {
    // 画面幅に応じたカラム数を取得
    function getColumnCount() {
      if (window.innerWidth <= 768) {
        return 2; // 768px以下は2カラム
      } else if (window.innerWidth <= 1000) {
        return 3; // 1000px以下は3カラム
      } else {
        return 3; // それ以上も3カラム
      }
    }

    function initMasonry() {
      const columnCount = getColumnCount();
      return new Masonry(worksGrid, {
        itemSelector: ".work-item",
        columnWidth: worksGrid.offsetWidth / columnCount - 10,
        gutter: 10,
        percentPosition: false,
        transitionDuration: 0,
      });
    }

    let msnry = initMasonry();

    // リサイズ時に再計算
    let resizeTimer;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        msnry.destroy();
        msnry = initMasonry();
      }, 250);
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
