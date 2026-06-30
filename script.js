(function($){
	$(function(){
		function initBook(){
			var w = $(window).width();
			var h = $(window).height();
			$('.flipbook').turn({
				width: w,
				height: h,
				autoCenter: true
			});
		}

		initBook();

		var resizeTimer;
		$(window).on('resize', function(){
			clearTimeout(resizeTimer);
			resizeTimer = setTimeout(function(){
				var w = $(window).width();
				var h = $(window).height();
				try{
					$('.flipbook').turn('size', w, h);
				}catch(e){
					// if not initialized yet, re-init
					$('.flipbook').turn('destroy');
					initBook();
				}
			}, 150);
		});
	});
})(jQuery);
