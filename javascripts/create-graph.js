/*
 * Parse the data and create a graph with the data.
 */
function parseData(createGraph) {
	Papa.parse("../data/data.gigrometer.csv", {
		download: true,
		complete: function(results) {
			createGraph(results.data);
		}
	});
}

function createGraph(data) {
	var timestamp = ['x'];
	var humidity = ["Humidity"];

	for (var i = 1; i < data.length-1; i++) {
		timestamp.push(new Date(data[i][0]).toISOString());
		humidity.push(data[i][2]);
	}

	console.log(timestamp);
	console.log(humidity);

	var chart = c3.generate({
		bindto: '#chart',
	    data: {
    			x: 'x',
					xFormat: '%Y-%m-%dT%H:%M:%S.%LZ',
					columns: [
						timestamp,
	        	humidity
	        ]
	    },
	    axis: {
				x: {
            type: 'timeseries',
            tick: {
                format: '%d/%m %H:%M'
            }
        }
	    },
	    zoom: {
        	enabled: true
    	},
	    legend: {
	        position: 'right'
	    }
	});
}

parseData(createGraph);
