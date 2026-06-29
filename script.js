function resizeBook() {

    const width = $(window).width();
    const height = $(window).height();

    let bookWidth, bookHeight, displayMode;

    if (width <= 768) {
        // 📱 móvil → 1 página
        bookWidth = width;
        bookHeight = height;
        displayMode = "single";
    } else {
        // 💻 tablet/PC → doble página
        bookWidth = width * 0.8;
        bookHeight = height * 0.8;
        displayMode = "double";
    }

    $("#flipbook").turn("size", bookWidth, bookHeight);
    $("#flipbook").turn("display", displayMode);
    $("#flipbook").turn("center");
}

$(window).on("load", function () {

    $("#flipbook").turn({
        width: 800,
        height: 600,
        autoCenter: true,
        display: "double",
        acceleration: true
    });

    resizeBook();

});

$(window).on("resize", function () {
    resizeBook();
});