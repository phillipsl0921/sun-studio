// S.U.N. Studio website: the phone menu, the positive / inverted slider and the timelapse clips.
document.addEventListener('DOMContentLoaded', function () {
  // A visitor whose system asks for less motion gets the clip paused, with its controls to play it.
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('video[autoplay]').forEach(function (video) {
      video.removeAttribute('autoplay');
      video.pause();
      video.controls = true;
    });
  }

  var button = document.querySelector('.menu-button');
  var nav = document.querySelector('.nav');
  if (button && nav) {
    button.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      button.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  document.querySelectorAll('.compare').forEach(function (box) {
    var range = box.querySelector('input');
    var move = function () { box.style.setProperty('--split', range.value + '%'); };
    range.addEventListener('input', move);
    move();
  });
});
