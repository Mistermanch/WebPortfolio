$(function () {

    const $book = $(".flipbook");

    // inicializar turn.js
    $book.turn({
        width: 922,
        height: 600,
        autoCenter: true,
        display: window.innerWidth < 768 ? "single" : "double",
        elevation: 50,
        gradients: true
    });

    // función de corrección de tamaño
    function resizeBook() {

        const width = window.innerWidth * 0.9;
        const height = window.innerHeight * 0.9;

        $book.turn("size", width, height);
        $book.turn("center");

    }

    // al cargar
    resizeBook();

    // al cambiar tamaño de ventana
    $(window).on("resize", function () {
        resizeBook();
    });

    // 🔥 FIX IMPORTANTE: después de pasar página
    $book.on("turned", function () {
        setTimeout(resizeBook, 50);
    });

});