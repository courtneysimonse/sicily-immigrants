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

  var sicilyMap = L.map('sicilyMap', {
          zoomControl: false,
          attributionControl: false,
          center: [37.5, 14],
          zoom: 7
      });

  // request tiles and add to map
  var CartoDB_Positron = L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
  	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
  	subdomains: 'abcd',
  	maxZoom: 19
  }).addTo(map);

  var CartoDB_DarkMatter = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
  	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
  	subdomains: 'abcd',
  	maxZoom: 19
  }).addTo(sicilyMap);

  $.getJSON('data/sicily.geojson', function(sicily) {
      Papa.parse('data/sicily_passengers.csv', {
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

  // var passengerData = d3.csv('data/sicily_passengers_small.csv'),
  //     sicilyData = d3.json('data/sicily.geojson')
  //
  // // when all data ARE loaded, call the ready function
  // Promise.all([passengerData, sicilyData]).then(ready)
  //
  //
  // function ready(data) {
  //
  //   // all data are in GeoJSON now and ready
  //   // separate out the data sets and parse CSV to GeoJSON
  //   processData(data[1],data[0]);
  //
  // }

  var years = [];

  $( "#ui-controls" ).slider({
    range: true,
    max: 1900,
    min: 1880,
    values: [1880, 1900],
    change: function (event,ui,geojson) {
      console.log(ui.values);
      console.log(geojson);
      years = ui.values;
      updateMap(geojson, years);
    }
  });

  function processData(sicily, data) {
    // console.log(sicily);
    L.geoJSON(sicily, {
      style: {
        "color": "green"
      }
    }).bindTooltip(function(layer) {
        return layer.feature.properties['NAME_2']
      }, {"sticky": true})
      .addTo(sicilyMap);

    // console.log(data);

    // build geojson structure
    var geojson = {};

    geojson.type = "FeatureCollection";
    geojson.features = [];

    // loop through data and create features
    data.forEach(function (datum) {
      //console.log(datum);
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
      feature.geometry.coordinates = [Number(datum.destination_lon), Number(datum.destination_lat)];

      if (isNaN(datum.destination_lat)) {
        // console.log(datum);
        // console.log(feature);
      } else {
        // push each feature to geojson
        geojson.features.push(feature)
      }

    });

    // console.log(geojson);
    drawMap(geojson);
    return geojson;
  };

  function drawMap(geojson) {
    // L.geoJSON(geojson).addTo(map);
    updateMap(geojson, [1890, 1895]);
    // var flowmapLayer = L.canvasFlowmapLayer(geojson).addTo(map).addTo(sicilyMap);
  };

  function updateMap(geojson, years) {
    var flowmapLayer = L.layerGroup();
    var markers = L.markerClusterGroup({
      showCoverageOnHover: false,
      maxClusterRadius: 30
    });
    L.geoJSON(geojson, {
      filter: function (feature) {
        arrival = feature.properties['ArrivalYr'];
        if (arrival >= years[0] && arrival <= years[1]) {
          flowmapLayer.addLayer(L.canvasFlowmapLayer(feature), {
            pathDisplayMode: 'selection'
          });
          return true
        }
      },
      pointToLayer: function (feature, latlng) {
        return markers.addLayer(L.marker(latlng)
          .bindTooltip('Origin: ' + feature.properties['origin_city'] + '<br>' +
            'Destination: ' + feature.properties['destination_city'] + '<br>' +
            'Arrival: ' + feature.properties['Arrival']));
      }
    });
    map.addLayer(markers);
    console.log(flowmapLayer);
    map.addLayer(flowmapLayer);
  };

})();
