/**
 * foriio API連携
 */

document.addEventListener("DOMContentLoaded", () => {
  // foriio API呼び出し
  if (document.getElementById("foriio-portfolio-container")) {
    fetchForiioWorks();
  }

  //
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

const foriio_token = "71584e7d0de655e8e72ff439f64b12ef";
const API_WORKS_ENDPOINT = "https://api.foriio.com/api/v1/developer/works";

function fetchForiioWorks() {
  const container = document.getElementById("foriio-portfolio-container");

  if (!container) {
    console.error("foriio-portfolio-container が見つかりません");
    return;
  }

  container.innerHTML = "<p>読み込み中...</p>";

  fetch(API_WORKS_ENDPOINT, {
    method: "GET",
    headers: {
      token: foriio_token,
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`APIアクセス失敗: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      container.innerHTML = "";
      const works = data.works || [];
      console.log(works);

      if (works.length === 0) {
        container.innerHTML = "<p>作品が見つかりませんでした。</p>";
        return;
      }

      works.slice(0, 9).forEach((work) => {
        const imageUrl = work.thumbnail || "";
        const pageUrl = "https://www.foriio.com/works/" + work.id || "#";

        const workHtml = `
        <div class="foriio-work-item">
          <div class="work-thumbnail">
              <img src="${imageUrl}" alt="${
          work.title || "作品"
        }" loading="lazy">
        </div>
        <div class="work-text">
          <p class="work-title">
          <a href="${pageUrl}" class="foriio-link" target="_blank" rel="noopener noreferrer">
          ${work.title || "無題"}
          </a>
          </p>
        </div>
        </div>
        `;
        container.innerHTML += workHtml;
      });
    })
    .catch((error) => {
      console.error("API呼び出しエラー:", error);
      container.innerHTML =
        '<p style="color: red;">作品の読み込み中にエラーが発生しました。</p>';
    });
}
