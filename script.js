function getSize() {
    const w = $(window).width();
    const h = $(window).height();

    if (w <= 768) {
        return {
            width: w,
            height: h,
            display: "single"
        };
    }

    return {
        width: w * 0.9,
        height: h * 0.85,
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
        gradients: true
    });

    setTimeout(updateBook, 150);
});

$(window).on("resize", function () {
    updateBook();
});