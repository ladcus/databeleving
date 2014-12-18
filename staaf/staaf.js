    var csv = d3.dsv(';');

    function createScale(data, maxWidth) {
        return d3.scale.linear()
            .domain([0, d3.max(data)])
            .range([0, maxWidth])
    }

    function redrawShops(data) {

			var values = data.map(function(d) {
            return parseInt(d.value);
        });

		
        var scale = createScale(
            values,
            parseInt(d3.select('#staaf').style('width'))
        );
		
		
        d3.select('#staaf').selectAll('div')
            .data(data)
            .transition()
            .duration(1000)
            .style('width', function(d) {
                return scale(d.value) + 'px';
            })
            .text(function(d) {
                return d.key + ' (' + d.value + ')';
            })
    }

    function drawShops(data) {


			var values = data.map(function(d) {
            return parseInt(d.value);
        });

		
        var scale = createScale(
            values,
            parseInt(d3.select('#staaf').style('width'))
        );
		
		
        d3.select('#staaf').selectAll('div')
            .data(data)
            .enter()
            .append('div')
            .style('width', function(d) {
                return scale(d.value) + 'px';
            })
            .text(function(d) {
                return d.key + ' (' + d.value + ')';
            })
    }

   function loadBarChart(csvfile, drawType) {
        csv(csvfile, function(err, data) {
            data = d3.entries(data[0]);
		
		
            if (drawType === 'draw') {
			
                drawShops(data);
            } else {
		                redrawShops(data);
            }
        });
    }
	

    d3.select('#but1').on('click', function() {
        loadBarChart('data1.csv', 'redraw');
    });

    d3.select('#but2').on('click', function() {
        loadBarChart('data2.csv', 'redraw');
    });

    loadBarChart('data1.csv', 'draw');
