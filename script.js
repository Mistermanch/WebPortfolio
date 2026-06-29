$(function () {

    console.log("turn:", $.fn.turn);

    if (!$.fn.turn) {
        console.error("turn.js NO está cargando");
        return;
    }

    $(".flipbook").turn({
        width: 922,
        height: 600,
        autoCenter: true,
        display: "double"
    });

});