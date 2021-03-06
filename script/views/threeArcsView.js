/** 
 * Time arcs view of the clock.
 * This is a constructor function.
 *
 * Public constructor: ThreeArcsView(masks)
 * 
 */
 define(["jquery"], function($) {
 
	/**
	 * Constructor method of the time arcs view.
	 * @param masks: Masks witch will be applied to the number on update to get the value of the arcs. It should be an array of 3 integers.
	 * @param canvas: HTML5 Canvas to draw into.
	 *
	 * Public method: update(octalTime)
	 */
	var ThreeArcsView = function(canvas, masks) {
		/**
		 * Arcs as clockhand visualizations with initial data.
		 */
		var arcs = {
			outer: { 
				radius: 60,
				color: 'rgb(58, 91, 122)',
				fadedColor: 'rgba(58, 91, 122, 0.19)',
				mask: masks[0]
			},
			middle: {
				radius: 45,
				color: 'rgb(108, 136, 164)',
				fadedColor: 'rgba(108, 136, 164, 0.11)',
				mask: masks[1]
			},
			inner: {
				radius: 30,
				color: 'rgb(158, 181, 206)',
				fadedColor: 'rgba(158, 181, 206, 0.07)',
				mask: masks[2]
			}
		};
		
		/** Line with of the arcs. */
		var lineWidth = 8;
		
		/** Rotation of the clock view. */
		var phase = - Math.PI / 2;
		
		/** Front canvas. */
		var frontCanvas = canvas;
		
		/** 2D context of the front canvas. */
		var frontCtx = canvas.getContext('2d');
		
		// create a back canvas
		/** Back canvas. */
		var backCanvas = document.createElement('canvas');
		
		// set the size of the back canvas
		backCanvas.width = frontCanvas.width;
		backCanvas.height = frontCanvas.height;
		
		// get the back canvas' context and set the line width for drawing
		/** 2D context of the back canvas. */
		var backCtx = backCanvas.getContext('2d');
		backCtx.lineWidth = lineWidth;
		
		/**
		 * Set the values of the arcs in [0..1] interval based on the octal time object of the octoclock.
		 * Value 1 of arcs means full circle.
		 *
		 * @param natural Numeric, natural value. The value of the arcs will be computed using this value and a mask. 
		 */
		var setArcValues = function(natural) {
			for(var i in arcs) {
				// apply the mask and normalize the value
				var arc = arcs[i];
				arc.value = (natural & arc.mask) / (arc.mask + 1);
			}
		};
		
		/**
		 * Draw the arcs.
		 * Value of the arcs must be set before invoking this method.
		 */
		var draw = function() {
			for(var i in arcs) {
				var arcLength = Math.PI * 2 * arcs[i].value + phase;
				var origin = { x: backCanvas.width / 2, y:  backCanvas.height / 2 };
				backCtx.beginPath();
				backCtx.arc(origin.x, origin.y, arcs[i].radius, phase, arcLength, false);
				backCtx.strokeStyle = arcs[i].color;
				backCtx.stroke();
				backCtx.beginPath();
				backCtx.arc(origin.x, origin.y, arcs[i].radius, phase, arcLength, true);
				backCtx.strokeStyle = arcs[i].fadedColor;
				backCtx.stroke();
			}
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
		
		/**
		 * Public method to update ThreeArcsView objects.
		 * It sets the value of the arcs, clears the canvas and redraws the arcs.
		 *
		 * @param natural Numeric, natural value. The value of the arcs will be computed using this value and a mask.
		 */
		var update = function(natural) {
			// clear the back canvas
			backCtx.clearRect(0, 0, backCanvas.width, backCanvas.height);
			
			// set the value of the arcs
			setArcValues(natural);
			
			// draw the updated arcs into the back canvas
			draw();
			
			// clear the front canvas and copy the arcs from the back canvas into the front canvas.
			frontCtx.clearRect(0, 0, frontCanvas.width, frontCanvas.height);
			frontCtx.drawImage(backCanvas, 0, 0);
		};
	
		var threeArcsView = {};
		threeArcsView.update = update;
		return threeArcsView;
	};
	
	return ThreeArcsView;
});