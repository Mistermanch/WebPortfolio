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
				// Ensure any mobile classes are removed
				$('.flipbook').removeClass('mobile-scroll');
				$('body').removeClass('mobile-scroll-active');
			}catch(e){
				// failed to initialize (maybe turn.js not loaded) — leave flipInitialized false
				flipInitialized = false;
			}
		}

		function destroyFlip(){
			if(!flipInitialized) return;
			try{
				$('.flipbook').turn('destroy');
			}catch(e){
				// ignore if already destroyed or not present
			}
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
						// if something goes wrong, destroy and try to re-init
						destroyFlip();
						initBook();
					}
				} else {
					// not initialized — if we're on desktop, try to init
					if(!isTouchDevice()){
						initBook();
					}
				}
			}, 150);
		});

		// Listen for pointer/coarse changes (e.g., docking/undocking some devices)
		var mql = window.matchMedia('(pointer: coarse)');
		var onChange = function(e){
			if(e.matches){
				// switched to coarse pointer (likely touch)
				applyMobileMode();
			} else {
				// switched to fine pointer (likely desktop)
				applyDesktopMode();
			}
		};
		if(mql.addEventListener) mql.addEventListener('change', onChange);
		else if(mql.addListener) mql.addListener(onChange);
	});
})(jQuery);
