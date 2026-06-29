function getBookSize() {

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
        height: h * 0.9,
        display: "double"
    };
}

function renderBook() {

    const size = getBookSize();

    $("#flipbook").turn("size", size.width, size.height);
    $("#flipbook").turn("display", size.display);
    $("#flipbook").turn("center");

}

$(window).on("load", function () {

    const size = getBookSize();

    $("#flipbook").turn({
        width: size.width,
        height: size.height,
        autoCenter: true,
        display: size.display,
        acceleration: true
    });

    // 🔥 fuerza recalculo real (CLAVE)
    setTimeout(function () {
        renderBook();
    }, 200);

});

$(window).on("resize", function () {
    renderBook();
});