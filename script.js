function getSize() {
    const w = $(window).width();
    const h = $(window).height();

    return {
        width: 800,
        height: 500,
        display: "double"
    };
}

function updateBook() {
    const size = getSize();

    $("#flipbook").turn("size", size.width, size.height);
    $("#flipbook").turn("display", size.display);
    $("#flipbook").turn("center");
}

$(window).on("load", function () {

    const size = getSize();

    $("#flipbook").turn({
        width: size.width,
        height: size.height,
        autoCenter: true,
        display: size.display,
        acceleration: true,
        gradients: true,
        elevation: 50
    });

    setTimeout(updateBook, 150);
});

$(window).on("resize", function () {
    updateBook();
});