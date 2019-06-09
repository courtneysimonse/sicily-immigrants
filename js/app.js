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
      // Papa.parse('data/sicily_passengers.csv', {
      //   download: true,
      //   dynamicTyping: true,
      //   // step: function(row) {
      // 	// 	console.log("Row:", row.data);
      // 	// },
      // 	complete: function(data) {
      // 		console.log("All done!");
      //     processData(sicily, data.data);
      // 	},
      //   header: true
      // });
      $.get('data/sicily_passengers.csv', function(data) {
          var passengers = data;
          console.log('All done!');
          processData(sicily, data)
          return passengers
      });
  })
  .fail(function(error) {
      // the data file failed to load
      console.log("Error... error...");
      // console.log(error);
  }); // end of $.getJSON()

  var years = [1890, 1891];
  // var geojson = {};
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

  function processData(sicily, passengers) {

    L.geoJSON(sicily, {
      style: {
        "color": "#006d2c",
        'fillColor': '#e5f5e0',
        'fillOpacity': .2,
        "clickable": true
      },
      onEachFeature: function (feature, layer) {
        layer.on('mouseover', function () {
          this.setStyle({
            'fillColor': '#a1d99b',
            'fillOpacity': .5
          });
        });
        layer.on('mouseout', function () {
          this.setStyle({
            'fillColor': '#e5f5e0',
            'fillOpacity': .2
          });
        });
      }
    }).bindTooltip(function(layer) {
        // add tooltip with province name
        return layer.feature.properties['NAME_2']
      }, {"sticky": true})
      // add event to filter passenger data by origin province
      .on('click', function(e) {
        updateMap(passengers, years, e.layer.feature.properties['NAME_2'])
      })
      .addTo(sicilyMap);

    drawMap(passengers);
    return passengers;
  };

  function drawMap(passengers) {
    $( "#ui-controls" ).slider({
      range: true,
      max: 1900,
      min: 1880,
      values: years,
      create: function(event, ui) {
        $("#handle-1").text(years[0]);
        $("#handle-2").text(years[1]);
      },
      slide: function (event, ui) {
        $("#handle-1").text(ui.values[0]);
        $("#handle-2").text(ui.values[1]);
      },
      change: function (event,ui) {
        console.log(ui.values);
        years = ui.values;
        updateMap(passengers, years);
        return years;
      }
    });
    // L.geoJSON(geojson).addTo(map)
    updateMap(passengers, years);
    // var flowmapLayer = L.canvasFlowmapLayer(geojson).addTo(map).addTo(sicilyMap);

  };

  function updateMap(passengers, years, province = "") {
    console.log('updateMap');
    console.log(passengers);

    markers.clearLayers();
    originMarkers.clearLayers();
    // flowmapLayer.clearLayers();
    // copyFlowmapLayer.clearLayers();

    // var filteredData = {};
    // filteredData.type = "FeatureCollection";
    // filteredData.features = [];

    // options = {
    //   // titles: ['index','LastName','FirstName','Age','Occupation','Literacy','origin_country','origin_city','destination_city','TransitTravelCompartment','ManifestID','Province','ShipName','Port','Arrival','destination_id','destination_lat','destination_lon','ArrivalYr','origin_id','origin_lon','origin_lat'],
    //   latitudeTitle: ['destination_lat'],
    //   longitudeTitle: ['destination_lon'],
    //   fieldSeparator: ',',
    //   firstLineTitles: true
    // }

    var geoLayer = L.geoCsv(passengers, {
      latitudeTitle: ['destination_lat'],
      longitudeTitle: ['destination_lon'],
      fieldSeparator: ',',
      firstLineTitles: true,
      filter: function (feature) {
        console.log(feature);
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

    console.log(geoLayer);

    // flowmapLayer.addLayer(L.canvasFlowmapLayer(filteredData));
    // copyFlowmapLayer.addLayer(L.canvasFlowmapLayer(filteredData));
    // map.addLayer(flowmapLayer);
    // sicilyMap.addLayer(copyFlowmapLayer);

  };

})();
