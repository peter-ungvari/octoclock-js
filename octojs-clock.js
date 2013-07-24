define(function() {
	/**
	 * Day length in milliseconds.
	 */
	var DAY_IN_MILLIS = 86400000;

	/**
	 * The beginning of time. 0001:0001:0001 starts on this time. <br>
	 * A.D Year 1960, month 4, day 6, hour 6AM, minute 0, second 0, millisecond
	 * 0
	 * 
	 */
	var BEGINING_OF_TIME = Date.UTC(1960, 3, 6, 6, 0, 0, 0);

	/**
	 * Clock precision. Defines the number of octal digits.
	 */
	var PRECISION_TIMES_A_DAY = 0100000000;

	var getTime = function() {
	    var now = Date.now();
	    return Math.floor((timeInDays(timeInMillis(now)) * PRECISION_TIMES_A_DAY)).toString(8);
	}

	var timeInDays = function(timeInMillis) {
		return timeInMillis / DAY_IN_MILLIS;
	}

	var timeInMillis = function(millisSinceEpoch) {
		return millisSinceEpoch - BEGINING_OF_TIME;
	}

	var octoclock = {};
	octoclock.getTime = getTime;
	return octoclock;
});