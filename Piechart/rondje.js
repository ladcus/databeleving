var goals = [438,26];
var goals2 = [48,26];
var color = ["#2600BD","#FF32AC"];

var width =  70;
var height = 70;
var radius = Math.min(width, height) / 2;
var pie = d3.layout.pie().sort(null);
var arc = d3.svg.arc().innerRadius(radius-30).outerRadius(radius-5);
var svg = d3.select("section").append("svg")
	.attr("width", width)
	.attr("height", height)
	.attr("class","grafiek")
	.append("g")
	.attr("transform", "translate("+width/2+","+height/2+")");
	
var path = svg.selectAll("path")
	.data(pie(goals))
	.enter().append("path")
	.attr("fill", function (d,i) {return color[i];})
	.attr("d",arc);
	

path.transition()
    .duration(500)
    .attr("fill", function(d, i) {
        return color[i];
    })
    .attr("d", arc)
    .each(function(d) {
        this._current = d;
    }); 
	
	function change(data) {
    path.data(pie(data));
    path.transition().duration(750).attrTween("d", arcTween); 

}

function arcTween(a) {
    var i = d3.interpolate(this._current, a);
    this._current = i(0);
    return function(t) {
        return arc(i(t));
    };
	}

		
var enter = svg.selectAll("path").on("mouseenter", function(d,i)
{
	d3.select(this)
	.transition()
	.ease("cubic-in")
	.duration("500")
	.style("fill", "#000");
});

var leave = svg.selectAll("path").on("mouseleave", function(d,i)
{
	d3.select(this)
	
	.transition()
	.ease("cubic-out")
	.duration("500")
	.style("fill", color[i]);
});

    d3.select('#but1').on('click', function() {
        change(goals);
    });

    d3.select('#but2').on('click', function() {
        change(goals2);
    });