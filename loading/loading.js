// サイト外からの訪問時のみローディング画面を表示
document.addEventListener("DOMContentLoaded", function () {
  const overlay = document.getElementById("loading-overlay");

  // セッションストレージで訪問済みかチェック
  const hasVisitedThisSession = sessionStorage.getItem("hasVisited");

  if (!hasVisitedThisSession) {
    // 初回訪問（サイト外からのアクセス）の場合
    // 6.3秒後に電球を光らせる
    setTimeout(() => {
      const glow = document.getElementById("bulb-glow");
      if (glow) {
        glow.classList.add("active");
      }
    }, 6300);

    // 8秒後にローディング画面をフェードアウト
    setTimeout(() => {
      if (overlay) {
        overlay.classList.add("fade-out");

        // フェードアウト完了後に要素を削除
        setTimeout(() => {
          overlay.remove();
        }, 1000);
      }

      // セッションストレージに訪問済みフラグを設定
      sessionStorage.setItem("hasVisited", "true");
    }, 8000);
  } else {
    // 2回目以降（サイト内遷移）の場合は即座に非表示
    if (overlay) {
      overlay.style.display = "none";
    }
  }
});
