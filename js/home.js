$(document).ready(function() {
  $("#button_read").on("click", function(event){
    event.stopPropagation();
    event.preventDefault();
    params = {
      speed: $("#speedbox").val(),
      text: $("#textbox").val(),
      letter: $("#colorizebox").val(),
      lines: $("#linestoggle").is(":checked")
    };
    window.location.href = "read.html?" + $.param(params);
  });
});
