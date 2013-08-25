require.config({
	baseUrl: 'script',
	paths: {
		"jquery": "lib/jquery"
	}
});

var onPageLoaded = function() {
	require(["views/threeArcsView", "views/textView", "models/octoclock"], 
			function(ThreeArcsView, textView, octoclock) {
		
		/** Suffix of the page title. */
		var pageTitleSuffix = " - Octoclock";
		
		/** 4-digit octal mask. */ 
		var octal4DigitMask = [07777, 077770, 0777700];
		
		/** Hours view. */
		var hoursView = new ThreeArcsView($("#canvas")[0], octal4DigitMask);
		
		/** Data view. */
		var dateView = new ThreeArcsView($("#canvas2")[0], octal4DigitMask);
		
		/** Frame counter */
		var fc = 0;
		
		/**
		 * Method to call on each animation frame.
		 * Calculates the time based on octoclock and renders the views.
		 */
		var render = function() {
			if (fc % 15 === 0) {
				// get the octal time object from octoclock
				var octalTime = octoclock.getTime();
				
				// update the arcs views
				hoursView.update(octalTime.hoursNum(5));
				dateView.update(octalTime.timeNum(2));
				
				// extract hours and days from the time object
				var hoursText = octalTime.hours(4);
				var daysText = octalTime.days;
				
				// update the text view
				textView.update(daysText, hoursText);
				
				// update the title of the page
				document.title = hoursText + ":" + daysText + pageTitleSuffix;				
			}
			// schedule a re-render when the browser is ready
			requestAnimationFrame(render);
			// increase frame counter
			fc += 1;
		};
			
		// start the rendering loop
		render();
	});
};

require(['jquery'], function($) {
    $(onPageLoaded);
});