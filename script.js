$(window).on("load", function () {

  $("#book").turn({
    width: 800,
    height: 500,
    autoCenter: true,
    display: "double",
    acceleration: true,
    gradients: true
  });

  setTimeout(function () {
    $("#book").turn("size", 800, 500);
    $("#book").turn("resize");
  }, 300);

});