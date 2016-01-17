var divWidth = $('#canvas').width() - 2*20;

var axisScale = d3.scale.linear()
                         .domain([0,100])
                         .range([0,divWidth]);

var svg = d3.select('#canvas')
    .append('svg')
    .attr('id', 'rect')
    .attr('width', divWidth)
    .attr('height', divWidth/2.5);

var color = d3.scale.category20();
    
var line = d3.svg.line();

var xAxis = d3.svg.axis()
                  .scale(axisScale)
                  .tickSize(10)
                  .orient('bottom');

var xAxisGroup = d3.select('#canvas')
    .append('svg')
    .attr("class", "x axis")
    .attr('width', divWidth)
    .attr('height', 60)
    .append("g")
    .call(xAxis);

var drawObj = {
    isDown: false,
    dataPoints: [],
    currentPath: null,
    color: 0
};
    
svg.on("mousedown", function(){
	drawObj.isDown = true;
    });

svg.on("mousemove", function(){
	var x, y;
	var offset = $('#rect').offset();
	var posY = offset.top - $(window).scrollTop();
	var posX = offset.left - $(window).scrollLeft(); 
	x = d3.event.x - posX;
	y = d3.event.y - posY;

	if (drawObj.isDown){        
	    if(drawObj.dataPoints.length > 0){
		if( x > drawObj.dataPoints[drawObj.dataPoints.length-1][0]){
		    drawObj.dataPoints.push([x, y]);
		}  
	    }else{
	        drawObj.dataPoints.push([x, y]);
	    }
	    
	    if (!drawObj.currentPath){
		drawObj.currentPath = svg.append("path")
		    .attr("class","currentPath")
		    .style("stroke-width", 1)
		    .style("stroke",color(drawObj.color))
		    .style("fill", "none");
	    }
	    drawObj.currentPath
		.datum(drawObj.dataPoints)
		.attr("d", line);
	}
    });

svg.on("mouseup", function(){
	drawObj.isDown = false;
	drawObj.currentPath.attr("class","oldPath");
	drawObj.dataPoints = [];
	drawObj.currentPath = null;
	if (++drawObj.color > 19) {
	    drawObj.color = 0;
	}
    })