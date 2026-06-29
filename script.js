$(function () {

    // 🔍 DEBUG: comprobar que turn.js está cargado
    console.log("jQuery:", $);
    console.log("turn.js:", $.fn.turn);

    // ❌ Si esto sale undefined, turn.js NO está cargando
    if (!$.fn.turn) {
        console.error("ERROR: turn.js no está cargado correctamente");
        return;
    }

    // 📖 Inicializar libro
    $("#book").turn({
        width: 900,
        height: 600,
        autoCenter: true,
        display: window.innerWidth < 768 ? "single" : "double",
        acceleration: true,
        gradients: true,
        elevation: 50
    });

    // 📏 Ajuste al redimensionar ventana
    function resizeBook() {
        const width = window.innerWidth * 0.9;
        const height = window.innerHeight * 0.9;

        $("#book").turn("size", width, height);
        $("#book").turn("center");
    }

    resizeBook();
    $(window).on("resize", resizeBook);

});