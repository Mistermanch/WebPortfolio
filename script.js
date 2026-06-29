$(function () {
  const width = window.innerWidth * 0.9;
  const height = window.innerHeight * 0.9;

  $("#book").turn({
    width: width,
    height: height,
    autoCenter: true,
    display: window.innerWidth < 768 ? "single" : "double"
  });

  resizeBook();
  $(window).on("resize", resizeBook);
});