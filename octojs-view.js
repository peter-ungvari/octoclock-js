define(["jquery", "octojs-clock"], function($, octoclock) {
	
	/** Time arcs view of the clock. */
	var TimeArcsView = function(canvas) {
		
		var arcs = {
			outer: { 
				radius: 60,
				color: 'rgb(58, 91, 122)'
			},
			middle: {
				radius: 45,
				color: 'rgb(108, 136, 164)'
			},
			inner: {
				radius: 30,
				color: 'rgb(158, 181, 206)'
			}
		};
		
		var lineWidth = 8;
		
		/** Rotation of the clock view. */
		var phase = - Math.PI / 2;
		
		var canvasContext = canvas.getContext('2d');
		
		var setTime = function(octalTime) {
			var timeSegment = octalTime.timeNum(6);
			arcs.outer.value = (timeSegment & 07777) / 07777;
			arcs.middle.value = (timeSegment & 0777700) / 0777700;
			arcs.inner.value = (timeSegment & 077770000) / 077770000;
		};
		
		/**
		 * Draw the arcs.
		 * Value of the arcs must be set before invoking this method.
		 * 
		 * @param canvasContext Canvas context to draw with.
		 */
		var draw = function() {
			canvasContext.lineWidth = lineWidth;
			for(var i in arcs) {
				var arcLength = Math.PI * 2 * arcs[i].value + phase;
				canvasContext.beginPath();
				canvasContext.arc(canvas.width / 2, canvas.height / 2, arcs[i].radius, phase, arcLength, false);
				canvasContext.strokeStyle = arcs[i].color;
				canvasContext.stroke();
			}
		};
		
		var update = function(octalTime) {
			setTime(octalTime);
			canvasContext.clearRect(0, 0, canvas.width, canvas.height);
			draw();
		};
		
		var timeArcsView = {};
		timeArcsView.update = update;
		return timeArcsView;
	};
	
	/**
	 * Draws an arrow head into a circle.
	 *
	 * The distance of the arrow head from the origin will be radius.
	 * The arrow head will point at (lineAngle + phase) or -(lineAngle + phase) direction, where phase is a global variable. The sign depends on the outer parameter.
	 *
	 * @param context Drawing context.
	 * @param origin Point of origin, it has x and y properties.
	 * @param radius Distance of the tip of the arrow head from the origin.
	 * @param lineAngle Angle of the arrow.
	 * @param color Html color of the arrow head.
	 * @param filled Flag to fill the arrow head.
	 * @param outer Flag to put the arrow head outside the cicle, with the opposite direction.
	 */
	var drawArrow = function(context, origin, radius, lineAngle, color, filled, outer) {
		var tip = { 
			x: origin.x + radius * Math.cos(lineAngle + phase),
			y: origin.y + radius * Math.sin(lineAngle + phase)
		};
		var sidePoints = [];
		
		context.beginPath();

		context.strokeStyle = color;
		context.stroke();
	};

	var pageTitleSuffix = " - Octoclock";
	var canvas = $("#canvas")[0];
	var canvasContext = canvas.getContext('2d');
	var buffer = document.createElement('canvas');
	buffer.width = canvas.width;
	buffer.height = canvas.height;
	var timeArcsView = new TimeArcsView(buffer);
	
	/**
	 * Method to call on each animation frame.
	 * Calculates the time based on octoclock and renders the views.
	 */
	var render = function() {
		var octalTime = octoclock.getTime();
		var textFrame = $("div.clock-frame");
		textFrame.hide();
		canvasContext.clearRect(0, 0, canvas.width, canvas.height);
		timeArcsView.update(octalTime);
		var hoursText = octalTime.hours(4);
		var daysText = octalTime.days;
		textFrame.children("#ohours").text(hoursText);
		textFrame.children("#odays").text(daysText);
		document.title = hoursText + ":" + daysText + pageTitleSuffix;
		textFrame.show();
		canvasContext.drawImage(buffer, 0, 0);
		requestAnimationFrame(render);
	};
	
	render();

});