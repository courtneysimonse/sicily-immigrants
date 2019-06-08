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

  var years = [1890, 1891];
  var geojson = {};
  // var flowmapLayer = L.layerGroup();
  // var copyFlowmapLayer = L.layerGroup(); // use copy to add layer to second map
  var markers = L.markerClusterGroup({
    showCoverageOnHover: false,
    maxClusterRadius: 30,
    chunkedLoading: true
  });
  var originMarkers = L.markerClusterGroup({
    showCoverageOnHover: false,
    maxClusterRadius: 20,
    chunkedLoading: true
  });
  var markerOptions = {
    radius: 5,
    color: '#de2d26'
  }

  $( "#ui-controls" ).slider({
    range: true,
    max: 1900,
    min: 1880,
    values: years,
    change: function (event,ui) {
      console.log(ui.values);
      // console.log(geojson);
      years = ui.values;
      updateMap(geojson, years);
      return years;
    }
  });

  function processData(sicily, data) {

    // console.log(data);

    // build geojson structure
    // var geojson = {};

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

    // console.log(sicily);
    L.geoJSON(sicily, {
      style: {
        "color": "green",
        "clickable": true
      }
    }).bindTooltip(function(layer) {
        // add tooltip with province name
        return layer.feature.properties['NAME_2']
      }, {"sticky": true})

      // add event to filter passenger data by origin province
      .on('click', function(e) {
        console.log(e.layer.feature.properties['NAME_2']);

        updateMap(geojson, years, e.layer.feature.properties['NAME_2'])
      })
      .addTo(sicilyMap);

    // console.log(geojson);
    drawMap(geojson);
    return geojson;
  };

  function drawMap(geojson) {
    // L.geoJSON(geojson).addTo(map)
    updateMap(geojson, years);
    // var flowmapLayer = L.canvasFlowmapLayer(geojson).addTo(map).addTo(sicilyMap);

  };

  function updateMap(geojson, years, province = "") {
    // console.log('updateMap');

    markers.clearLayers();
    originMarkers.clearLayers();
    // flowmapLayer.clearLayers();
    // copyFlowmapLayer.clearLayers();

    // var filteredData = {};
    // filteredData.type = "FeatureCollection";
    // filteredData.features = [];

    L.geoJSON(geojson, {
      filter: function (feature) {
        arrival = feature.properties['ArrivalYr'];
        originProv = feature.properties['Province'];
        if (arrival >= years[0] && arrival <= years[1]) {
          if (province == "") {
            return true
          }
          else if (originProv == province) {
            // filteredData.features.push(feature);
            return true
          }
        }
      },
      pointToLayer: function (feature, latlng) {
        markers.addLayer(L.circleMarker(latlng, markerOptions)
          .bindTooltip('Origin: ' + feature.properties['origin_city'] + ", " + feature.properties['Province'] + '<br>' +
            'Destination: ' + feature.properties['destination_city'] + '<br>' +
            'Arrival: ' + feature.properties['Arrival']));
        // originMarkers.addLayer(
        //   L.circleMarker([Number(feature.properties.origin_lat), Number(feature.properties.origin_lon)], markerOptions)
        //     .bindTooltip('Origin: ' + feature.properties['origin_city'] + ", " + feature.properties['Province'] + '<br>' +
        //       'Destination: ' + feature.properties['destination_city'] + '<br>' +
        //       'Arrival: ' + feature.properties['Arrival']));
      }
    });
    map.addLayer(markers);
    // sicilyMap.addLayer(originMarkers);

    // flowmapLayer.addLayer(L.canvasFlowmapLayer(filteredData));
    // copyFlowmapLayer.addLayer(L.canvasFlowmapLayer(filteredData));
    // map.addLayer(flowmapLayer);
    // sicilyMap.addLayer(copyFlowmapLayer);

  };

})();
