// SVGテキストアニメーション
// Vivusはpath要素向けのため、テキストはCSSアニメーションで対応
window.addEventListener('load', function () {
    var splash    = document.getElementById('splash');
    var splashLogo = document.getElementById('splash_logo');
    var texts     = document.querySelectorAll('#mask text');

    // 1行目と2行目を時差でフェードイン（描画風に見せる）
    texts.forEach(function (el, i) {
        setTimeout(function () {
            el.style.transition = 'fill-opacity 1s ease, stroke 0.5s ease';
            el.style.fillOpacity = '1';
            el.style.fill       = '#333';

            // 少し遅れてstrokeを消して塗りつぶしに切り替え
            setTimeout(function () {
                el.style.stroke = 'none';
            }, 600);
        }, i * 600); // 1行目 → 0ms, 2行目 → 600ms
    });

    // 3秒後にスプラッシュをフェードアウト
    setTimeout(function () {
        splash.style.transition    = 'opacity 1s ease';
        splash.style.opacity       = '0';
        splashLogo.style.transition = 'opacity 1s ease';
        splashLogo.style.opacity   = '0';

        setTimeout(function () {
            splash.style.display = 'none';
        }, 1000);
    }, 3000);
});