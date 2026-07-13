// ヘッダー・ハンバーガーメニュー関連の要素
const header = document.getElementById('header');
const hamburgerBtn = document.getElementById('header-hamburger');
const hamburgerWindow = document.getElementById('hamburger-window');

/**
 * ヘッダーの実際の高さをCSS変数 --header-h に反映
 * （メニューの表示位置と、アンカー移動時のずれ補正に使う）
 **/
const setHeaderHeight = () => {
  document.documentElement.style.setProperty('--header-h', header.offsetHeight + 'px');
};
setHeaderHeight();
window.addEventListener('resize', setHeaderHeight);

/**
 * ハンバーガーメニューの開閉を制御
 **/
const toggleMenu = (open) => {
  hamburgerBtn.classList.toggle('active', open);
  hamburgerWindow.classList.toggle('open', open);
  hamburgerBtn.setAttribute('aria-expanded', open);
  hamburgerBtn.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く');
};

hamburgerBtn.addEventListener('click', () => {
  toggleMenu(!hamburgerBtn.classList.contains('active'));
});

// メニュー内のリンクをクリックしたらメニューを閉じる
document.querySelectorAll('.menu-link').forEach((link) => {
  link.addEventListener('click', () => toggleMenu(false));
});

/**
 * スクロール出現アニメーション
 * （JSでfade-upを付与するので、JS無効環境でもコンテンツは表示される）
 **/
const fadeTargets = document.querySelectorAll('.section-box, .work-item');
fadeTargets.forEach((el) => el.classList.add('fade-up'));

const appearObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      appearObserver.unobserve(entry.target); // 一度出現したら監視を外す
    }
  });
}, { rootMargin: '0px 0px -10% 0px' });

fadeTargets.forEach((el) => appearObserver.observe(el));

/**
 * トップへ戻るボタン
 **/
const toTopBtn = document.getElementById('to-top');

window.addEventListener('scroll', () => {
  toTopBtn.classList.toggle('visible', window.scrollY > 300);
}, { passive: true });

toTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/**
 * PCナビの現在地ハイライト
 * （画面中央付近にあるセクションのリンクに下線を付ける）
 **/
const navLinks = document.querySelectorAll('.header-nav a');

const currentObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navLinks.forEach((link) => {
      link.classList.toggle('current', link.getAttribute('href') === '#' + entry.target.id);
    });
  });
}, { rootMargin: '-40% 0px -55% 0px' });

document.querySelectorAll('section[id]').forEach((sec) => currentObserver.observe(sec));
