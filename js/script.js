var painting, started, erase, startErase, checkStroke, checkSquare, checkCircle;
var width_brush = 5;
var canvas = $("#canvas");
var cursorX, cursorY;
var context = canvas[0].getContext('2d');

context.lineJoin = 'round';
context.lineCap = 'round';


$("#pinceau").click(function(){
	erase = false;
	checkStroke = false;
	checkSquare = false;
	checkCircle = false;
});

$("#gomme").click(function(){
	erase = true;
	checkStroke = false;
	checkSquare = false;
	checkCircle = false;

	canvas.mousedown(function(e){
		startErase = true;
		if(erase){
			cursorX = e.pageX - 10;
			cursorY = e.pageY - 10;
			context.clearRect(cursorX, cursorY, 0, 0);
		}
	});
});

canvas.mousedown(function(e){
	if(!erase && !checkStroke && !checkSquare && !checkCircle)
		painting = true;
});


$(this).mouseup(function() {
	painting = false;
	started = false;
	startErase = false;
});

canvas.mousemove(function(e) {
	if (painting) {
		cursorX = e.pageX - 10;
		cursorY = e.pageY - 10;
		drawLine();
	}

	if(erase && startErase) {
		cursorX = e.pageX - 10;
		cursorY = e.pageY - 10;
		context.clearRect(cursorX, cursorY, canvas.width(), canvas.height());
	}
});

function drawLine() {
	if (!started) {
		context.beginPath();
		context.moveTo(cursorX, cursorY);
		started = true;
	} 
	else {
		context.lineTo(cursorX, cursorY);
		context.strokeStyle = $("#color").val();
		context.lineWidth = $("#width_trait").val();
		context.stroke();
	}
}

$("#trait").click(function(e) {
	painting = false;
	erase = false;
	checkStroke = true;
	checkSquare = false;
	checkCircle = false;
	var stroke;

		canvas.click(function(e){
			if(checkStroke){
				if (!stroke) {
					context.beginPath();
					context.moveTo(e.pageX, e.pageY);
					stroke = true;
				} 
				else {
					context.lineTo(e.pageX, e.pageY);
					context.strokeStyle = $("#color").val();
					context.lineWidth = $("#width_trait").val();
					context.stroke();
					stroke = false;
				}
			}
		});
})

$("#square").click(function(e) {
	painting = false;
	erase = false;
	checkStroke = false;
	checkSquare = true;
	checkCircle = false;
	var square;

	canvas.click(function(e){
		if(checkSquare){
			if (!square) {
				context.beginPath();
				cursorX = e.pageX - 10;
				cursorY = e.pageY - 10;
				square = true;
			}
			else {
				cursorX2 = (e.pageX - 10) - cursorX ;
				cursorY2 = (e.pageY - 10) - cursorY ;
				if($("#forme")[0].checked) {
					context.fillStyle = $("#color").val();					
					context.fillRect(cursorX, cursorY, cursorX2, cursorY2);
				} else {
					context.rect(cursorX, cursorY, cursorX2, cursorY2);
					context.strokeStyle = $("#color").val();
				}
				context.lineWidth = $("#width_trait").val();
				context.stroke();
				square = false;
			}
		}
	});
})

$("#circle").click(function(e) {
	painting = false;
	erase = false;
	checkStroke = false;
	checkSquare = false;
	checkCircle = true;
	var circle;

	canvas.click(function(e){
		if(checkCircle){
			if (!circle) {
				context.beginPath();
				cursorX = e.pageX - 10;
				cursorY = e.pageY - 10;
				circle = true;
			}
			else {

				cursorX2 = (e.pageX - 10);
				cursorY2 = (e.pageY - 10);
				var value = Math.sqrt((cursorX2 - cursorX) * (cursorX2 - cursorX) + (cursorY2 - cursorY) * (cursorY2 - cursorY));

				context.arc(cursorX, cursorY, value, 0, 2 * Math.PI);

				if($("#forme")[0].checked){
					context.fillStyle = $("#color").val();
					context.fill();
				} else {
					context.strokeStyle = $("#color").val();
					context.stroke();
				}
				circle = false;
			}
		}
	});
})

function downloadCanvas(link, canvasId, filename, format) {
    link.href = document.getElementById(canvasId).toDataURL(format);
    link.download = filename;
}

$("#downloadPng").click(function() {
    downloadCanvas(this, 'canvas', 'my_paint.jpg', 'image/png');
});

$("#downloadJpg").click(function() {
    downloadCanvas(this, 'canvas', 'my_paint.jpg', 'image/jpeg');
});

$("#clear").click(function(){
	context.clearRect(0,0, canvas.width(), canvas.height());
});
