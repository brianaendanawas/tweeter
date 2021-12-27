$(document).ready(function() {
  $("textarea").on("input", function () {
    const length = $(this).val().length;
    const counter = $(this).parent('form').find('.counter');
    left = 140 - length;
    counter.text(left);
    if (left < 0) {
      counter.css('color', 'red');
    } else {
      counter.css('color', 'dimgray');
    }
  });
});