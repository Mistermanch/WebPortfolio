$(function () {

    console.log("turn:", $.fn.turn);

    $(".flipbook").turn({
        width: 922,
        height: 600,
        autoCenter: true,
        elevation: 50,
        gradients: true,
        display: "double"
    });

});