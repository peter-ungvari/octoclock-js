define(["jquery", "octojs-clock"], function($, octoclock) {
	
	var canvas = $("#canvas")[0];
	var canvasContext = canvas.getContext('2d');

	var buffer = document.createElement('canvas');
	buffer.width = canvas.width;
	buffer.height = canvas.height;
	var bufferContext = buffer.getContext('2d');

	var render = function() {
		var textFrame = $("div.clock-frame");
		textFrame.hide();
		canvasContext.clearRect(0, 0, canvas.width, canvas.height);
		bufferContext.clearRect(0, 0, buffer.width, buffer.height);
		var timeString = octoclock.getTime();
		var seconds = parseInt(timeString.substring(timeString.length-4, timeString.length), 8);
		var minutes = parseInt(timeString.substring(timeString.length-6, timeString.length-2), 8);
		var hours = parseInt(timeString.substring(timeString.length-8, timeString.length-4), 8);
		var days = parseInt(timeString.substring(0, timeString.length-8), 8);
		var hoursText = pad(hours.toString(8), 4).split("").reverse().join("");
		var daysText = days.toString(8).split("").reverse().join("");
		textFrame.children("#ohours").text(hoursText);
		textFrame.children("#odays").text(daysText);
		var now = new Date();
		textFrame.children("#chours").text(now.toTimeString());
		textFrame.children("#cdays").text(now.toLocaleDateString());
		textFrame.children("#cdate").text(now.toUTCString());
		document.title = hoursText + ":" +  days.toString(8) + " - Octoclock";
		textFrame.show();
		drawArcs(bufferContext, hours, minutes, seconds);
		canvasContext.drawImage(buffer, 0, 0);
		requestAnimationFrame(render);
	}

	var drawArcs = function(context, h, m, s) {
		var phase = - 3.14 / 2;
		context.lineWidth = 8;
		
		var drawArc = function(r, unit, color) {
			context.beginPath();
			context.arc(canvas.width / 2, canvas.height / 2, r, phase, 3.14 * 2 * unit / 010000 + phase, false);
			context.strokeStyle = color;
			context.stroke();
		}

		drawArc(60, s, 'rgb(58, 91, 122)');
		drawArc(45, m, 'rgb(108, 136, 164)');
		drawArc(30, h, 'rgb(158, 181, 206)');
	}

	var pad = function(num, size) {
		var s = "000000000" + num;
		return s.substr(s.length-size);
	}

	render();
});