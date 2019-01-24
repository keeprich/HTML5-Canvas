var canvas, ctx, brush = {
    x: 0,
    y: 0,
    color: "#000000",
    size: 20,
    down: false
},

strokes = [],
currentStroke = null;

function redraw() {
    ctx.clearRect(0, 0, canvas.width(), canvas.height());
    // ctx.lineCap = round;
    for (var i = 0; i < strokes.length; i++) {
        var s = strokes[i];
        ctx.strokeStyle = s.color;
        ctx.lineWidth = s.size;
        ctx.beginPath();
        ctx.moveTo(s.points[0].x, s.points[0].y);
        for (var j = 0; j < s.points.length; j++) {
            var p = s.points[j];
            ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();
    }

}

function init() {
    canvas = $("#draw");
    canvas.attr({
        width: window.innerHeight,
    height: window.innerHeight,
    });
    ctx = canvas[0].getContext("2d");

    // mouseEvents
    function mouseEvents(event) {
        brush.x = event.pageX;
        brush.y = event.pageY;

        currentStroke.points.push({
            x: brush.x,
            y: brush.y,
        });
                redraw();
    }

    // event listners
    canvas.mousedown(function(event) {
        brush.down = true;

        // when press down
        currentStroke = {
            color: brush.color,
            size: brush.size,
            points: [],
        };
        strokes.push(currentStroke);
        mouseEvents(event);


    }).mouseup(function(event) {
        brush.down = false;
        mouseEvents(event);
        currentStroke = null;

    }).mousemove(function(event){
        if (brush.down) 
            mouseEvents(event)
    });

    // Saving page to url
    $("#save-btn").click(function() {
        window.open(canvas[0].toDataURL());
    });

    $("#undo-btn").click(function() {
          strokes.pup();
          redraw();

})

    $("#clear-btn").click(function() {
        strokes = [];
        redraw();
    });

    // Getting value from color chosen
    $("#color-picker").on("input", function () {
        brush.color = this.value;
    });

    $("#backgorund-color").on("input", function () {
        brush.color = this.value;
    });

    $("#brush-size").on("input", function () {
        brush.size = this.value;
    })

}

// thus when the documents is ready
$(init)