var margin = {top: 30, right: 20, bottom: 50, left: 50},
    width = 600,
    height = 350;

var parseDate = d3.time.format("%d-%b-%y").parse;

var x = d3.time.scale().range([0, width]);
var y = d3.scale.linear().range([height, 0]);

var xAxis = d3.svg.axis().scale(x)
    .orient("bottom").ticks(5);

var yAxis = d3.svg.axis().scale(y)
    .orient("left").ticks(5);

var valueline = d3.svg.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.close); });

var svg = d3.select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Get the data
d3.csv("data1.csv", function(error, data) {
    data.forEach(function(d) {
        d.date = parseDate(d.date);
        d.close = +d.close;
    });

    // Scale the range of the data
    x.domain(d3.extent(data, function(d) { return d.date; }));
    y.domain([0, d3.max(data, function(d) { return d.close; })]);

    svg.append("path").attr("class", "line")          // Add the valueline path.
        .attr("d", valueline(data));

    svg.append("g")                     // Add the X Axis
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("g")                     // Add the Y Axis
        .attr("class", "y axis")
        .call(yAxis);

});

function updateData(csvbestand) {

    // Get the data again
    d3.csv(csvbestand, function(error, data) {
        data.forEach(function(d) {
                d.date = parseDate(d.date);
                d.close = +d.close;
            });

        // Scale the range of the data again
        x.domain(d3.extent(data, function(d) { return d.date; }));
        y.domain([0, d3.max(data, function(d) { return d.close; })]);

    // Select the section we want to apply our changes to
    var svg = d3.select("body").transition();

    // Make the changes
    svg.select(".line")   // change the line
        .duration(1000)
        .attr("d", valueline(data));
    svg.select(".x.axis") // change the x axis
        .duration(1000)
        .call(xAxis);
    svg.select(".y.axis") // change the y axis
        .duration(1000)
        .call(yAxis);

    });
}


