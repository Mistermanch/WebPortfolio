(function($){
	$(function(){
		// Turn.js initialisation
		function initBook(){
			var w = $(window).width();
			var h = $(window).height();
			try{
				$('.flipbook').turn({
					width: w,
					height: h,
					autoCenter: true,
					display: 'double',
					acceleration: true,
					gradients: true,
					elevation: 50
				});
			}catch(e){}
		}

		function destroyFlip(){
			try{
				$('.flipbook').turn('destroy');
			}catch(e){}
		}

		// Initial setup
		initBook();

		// Book resize
		var resizeTimer;
		$(window).on('resize orientationchange', function(){
			clearTimeout(resizeTimer);
			resizeTimer = setTimeout(function(){
				var w = $(window).width();
				var h = $(window).height();

				try{
					$('.flipbook').turn('size', w, h);
				}catch(e){
					destroyFlip();
					initBook();
				}
			}, 150);
		});

		// ==========================
		// Keyboard navigation
		// ==========================
		$(document).on('keydown', function(e){
			// Ignore typing in form fields
			if($(e.target).is('input, textarea, select')) return;

			switch(e.code){
				case 'ArrowRight':
				case 'KeyD':
					e.preventDefault();
					try{
						$('.flipbook').turn('next');
					}catch(e){}
					break;

				case 'ArrowLeft':
				case 'KeyA':
					e.preventDefault();
					try{
						$('.flipbook').turn('previous');
					}catch(e){}
					break;
			}
		});

	});
})(jQuery);
