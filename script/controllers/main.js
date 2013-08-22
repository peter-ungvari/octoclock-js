require.config({
	baseUrl: 'script',
	paths: {
		"jquery": "lib/jquery"
	}
});

var onPageLoaded = function() {
	require(["views/timeArcsView", "views/textView", "models/octoclock"], 
			function(timeArcsView, textView, octoclock) {
		
		/** Suffix of the page title. */
		var pageTitleSuffix = " - Octoclock";
		
		/**
		 * Method to call on each animation frame.
		 * Calculates the time based on octoclock and renders the views.
		 */
		var render = function() {
			// get the octal time object from octoclock
			var octalTime = octoclock.getTime();
			
			// update the arcs view
			timeArcsView.update(octalTime);
			
			// extract hours and days from the time object
			var hoursText = octalTime.hours(4);
			var daysText = octalTime.days;
			
			// update the text view
			textView.update(daysText, hoursText);
			
			// update the title of the page
			document.title = hoursText + ":" + daysText + pageTitleSuffix;
			
			// schedule a re-render when the browser is ready
			requestAnimationFrame(render);
		};
			
		// start the rendering loop
		render();
	});
};

require(['jquery'], function($) {
    $(onPageLoaded);
});