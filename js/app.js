(function () {

  // map options
  var options = {
        zoomSnap: .5,
        center: [38, -85],
        zoom: 4,
        minZoom: 2,
        zoomControl: false,
        attributionControl: false
      }

  // create map
  var map = L.map('map', options);

  // request tiles and add to map
  var CartoDB_Positron = L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
  	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
  	subdomains: 'abcd',
  	maxZoom: 19
  }).addTo(map);

  // AJAX request for GeoJSON data
  // $.getJSON("data/sicily.geojson", function(sicily) {
  //     Papa.parse('data/sicily_passengers_small.csv', {
  //       download: true,
  //       step: function(row) {
  //     		console.log("Row:", row.data);
  //     	},
  //     	complete: function() {
  //     		console.log("All done!");
  //     	},
  //       header: true,
  //       worker: true,
  //       complete: function(data) {
  //               processData(sicily, data);
  //             }
  //     });
  // })
  $.getJSON('data/sicily.geojson', function(sicily) {
      Papa.parse('data/sicily_passengers_small.csv', {
        download: true,
        dynamicTyping: true,
        // step: function(row) {
      	// 	console.log("Row:", row.data);
      	// },
      	complete: function(data) {
      		console.log("All done!");
          processData(sicily, data.data);
      	},
        header: true
      });
  })
  .fail(function(error) {
      // the data file failed to load
      console.log("Error... error...");
      // console.log(error);
  }); // end of $.getJSON()

  function processData(sicily, data) {

    console.log(data);

    // build geojson structure
    var geojson = {};

    geojson.type = "FeatureCollection";
    geojson.features = [];

    // loop through data and create features
    data.forEach(function (datum) {
      var feature = {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": []
        }
      }
      // add all data as props
      feature.properties = datum;
      // add coordinate info
      feature.geometry.coordinates = [+datum.lng, +datum.lat]

      // push each feature to geojson
      geojson.features.push(feature)
    });
    // return complete geojson
    //return geojson

    //console.log(data);
    L.geoJSON(geojson).addTo(map);
  };

})();
