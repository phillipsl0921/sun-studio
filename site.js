// S.U.N. Studio website: the phone menu and the positive / inverted slider.
document.addEventListener('DOMContentLoaded', function () {
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
