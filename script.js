function loadApp() {

	var flipbook = $('.flipbook');

 	// Check if the CSS was already loaded
	
	if (flipbook.width()==0 || flipbook.height()==0) {
		setTimeout(loadApp, 10);
		return;
	}

	$('.flipbook .double').scissor();

	// Create the flipbook

	$('.flipbook').turn({
			// Elevation

			elevation: 50,
			
			// Enable gradients

			gradients: true,
			
			// Auto center this flipbook

			autoCenter: true

	});
}



yepnope({
	test : Modernizr.csstransforms,
	yep: ['../../lib/turn.min.js'],
	nope: ['../../lib/turn.html4.min.js'],
	both: ['../../lib/scissor.min.js', 'css/double-page.css'],
	complete: loadApp
});