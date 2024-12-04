$(function () {

    //ページ内スクロール
    $('a[href^="#"]').on('click', function () {
      var speed = 300;
      var href = $(this).attr("href");
      var target = $(href == "#" || href == "" ? 'html' : href);
      var position = target.offset().top;
      $("html, body").animate({
        scrollTop: position
      }, speed, "swing");
      return false;
    });

    //ページトップへ戻る
    var $pageTop = $('.page-top');
    $(window).scroll(function () {
      if ($(this).scrollTop() > 300) {
        $pageTop.fadeIn();
      } else {
        $pageTop.fadeOut();
      }
    });
    $pageTop.on('click', function () {
      $('body,html').animate({
        scrollTop: 0
      }, 300);
      return false;
    });


});