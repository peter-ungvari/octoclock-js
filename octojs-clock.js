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
	 * The octal time, digits are placed from the less significant to the higher significant from left to right.
	 */
	var getTime = function() {
		var millis = timeInMillis(Date.now());
		var hours = (millis % DAY_IN_MILLIS) / DAY_IN_MILLIS;
		var days = Math.floor(millis / DAY_IN_MILLIS);
		var radix = 8;
		var daysString = days.toString(radix).split("").reverse().join("");
	    return {
			daysNum: days,
			days: daysString,
			hoursNum: function(precision) {
				return Math.floor(hours * Math.pow(radix, precision));
			},
			hours: function(length) {
				return pad(this.hoursNum(length).toString(radix).split("").reverse().join(""), length);
			},
			timeNum: function(hoursPrecision) {
				return this.daysNum * Math.pow(radix, hoursPrecision) + this.hoursNum(hoursPrecision);
			},
			time: function(length) {
				return this.hours(length) + this.days;
			}
		};
	};

	/**
	 * Milliseconds from the beginnig of time.
	 */
	var timeInMillis = function(millisSinceEpoch) {
		return millisSinceEpoch - BEGINING_OF_TIME;
	};
	
	/**
	 * Pad a number from the left with zeroes to reach the preferred size.
	 * Maximum 8 zeroes are supported besides the digits of the number. 
	 *
	 * @param num Number to be padded.
	 * @param size Preferred size.
	 */
	var pad = function(num, size) {
		var s = "00000000" + num;
		return s.substr(s.length-size);
	};

	var octoclock = {};
	octoclock.getTime = getTime;
	return octoclock;
});