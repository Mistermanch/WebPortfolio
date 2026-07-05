(function($){
	$(function(){
		// Detect touch / mobile devices
		function isTouchDevice(){
			return (('ontouchstart' in window) ||
				(navigator.maxTouchPoints && navigator.maxTouchPoints > 0) ||
				(window.navigator.msMaxTouchPoints && window.navigator.msMaxTouchPoints > 0) ||
				(window.matchMedia && window.matchMedia('(pointer: coarse)').matches));
		}

		var flipInitialized = false;

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
				flipInitialized = true;

				$('.flipbook').removeClass('mobile-scroll');
				$('body').removeClass('mobile-scroll-active');
			}catch(e){
				flipInitialized = false;
			}
		}

		function destroyFlip(){
			if(!flipInitialized) return;
			try{
				$('.flipbook').turn('destroy');
			}catch(e){}
			flipInitialized = false;
		}

		function applyMobileMode(){
			destroyFlip();
			$('.flipbook').addClass('mobile-scroll');
			$('body').addClass('mobile-scroll-active');
		}

		function applyDesktopMode(){
			$('body').removeClass('mobile-scroll-active');
			$('.flipbook').removeClass('mobile-scroll');
			if(!flipInitialized) initBook();
		}

		// Initial setup
		if(!isTouchDevice()){
			initBook();
		}else{
			applyMobileMode();
		}

		// Book resize
		var resizeTimer;
		$(window).on('resize orientationchange', function(){
			clearTimeout(resizeTimer);
			resizeTimer = setTimeout(function(){
				var w = $(window).width();
				var h = $(window).height();

				if(flipInitialized){
					try{
						$('.flipbook').turn('size', w, h);
					}catch(e){
						destroyFlip();
						initBook();
					}
				}else{
					if(!isTouchDevice()){
						initBook();
					}
				}
			}, 150);
		});

		// Listen for pointer/coarse changes
		var mql = window.matchMedia('(pointer: coarse)');
		var onChange = function(e){
			if(e.matches){
				applyMobileMode();
			}else{
				applyDesktopMode();
			}
		};

		if(mql.addEventListener){
			mql.addEventListener('change', onChange);
		}else if(mql.addListener){
			mql.addListener(onChange);
		}

		// ==========================
		// Keyboard navigation
		// ==========================
		$(document).on('keydown', function(e){

			// Only when Turn.js is active
			if(!flipInitialized) return;

			// Ignore typing in form fields
			if($(e.target).is('input, textarea, select')) return;

			switch(e.code){
				case 'ArrowRight':
				case 'KeyD':
					e.preventDefault();
					$('.flipbook').turn('next');
					break;

				case 'ArrowLeft':
				case 'KeyA':
					e.preventDefault();
					$('.flipbook').turn('previous');
					break;
			}
		});

	});
})(jQuery);

