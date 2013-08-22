/** 
 * Textual view of the clock.
 * This is a constructor function.
 *
 * Public method: update(daysText, hoursText)
 * 
 */
 define(["jquery"], function($) {
	/** The div element of this view. Take care of the ID. */
	var textFrame = $("div.clock-frame");
	
	/**
	 * Updates the view.
	 *
	 * @param daysText String representation of days.
	 * @param hoursText String representation of hours.
	 */
	var update = function(daysText, hoursText) {
		textFrame.hide();
		textFrame.children("#ohours").text(hoursText);
		textFrame.children("#odays").text(daysText);
		textFrame.show();
	}
	
	var textView = {};
	textView.update = update;
	return textView;
});