(function () {

  // US map options
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

  // Sicily map options
  var sicilyOpts = {
    zoomControl: false,
    attributionControl: false,
    center: [37.5, 14],
    zoom: 7,
    maxBounds: [[39.9, 17.8],[35.0, 10.2]]
  }
  var sicilyMap = L.map('sicilyMap', sicilyOpts);

  // request tiles and add to map
  var CartoDB_Positron = L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
  	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
  	subdomains: 'abcd',
  	maxZoom: 19
  }).addTo(sicilyMap);

  var CartoDB_DarkMatter = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
  	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
  	subdomains: 'abcd',
  	maxZoom: 19
  }).addTo(map);

  $.getJSON('data/sicily.geojson', function(sicily) {
      Papa.parse('data/sicily_passengers.csv', {
        download: true,
        dynamicTyping: true,
        // step: function(row) {
      	// 	console.log("Row:", row.data);
      	// },
      	complete: function(data) {
      		console.log("All done!");
          processData(data.data);
          drawMap(geojson, sicily);
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

  var yearsOrig = [1890, 1891];
  var years = yearsOrig
  var geojson = {};
  var clickID = null;
  var hoverID = null;
  var firstPass = true;

  // var flowmapLayer = L.layerGroup();
  // var copyFlowmapLayer = L.layerGroup(); // use copy to add layer to second map
  var markers = L.markerClusterGroup({
    showCoverageOnHover: false,
    maxClusterRadius: 30,
    chunkedLoading: true
  });
  var originMarkers = L.layerGroup();
  // var originMarkers = L.markerClusterGroup({
  //   showCoverageOnHover: false,
  //   maxClusterRadius: 20,
  //   chunkedLoading: true
  // });
  var markerOptions = {
    radius: 5,
    color: '#de2d26'
  }

  function processData(data) {

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

    // console.log(geojson);
    return geojson;
  };

  function drawMap(geojson, sicily) {
    var sicilyStyle = {
      "color": "#006d2c",
      'fillColor': '#006d2c',
      'fillOpacity': .2,
      "clickable": true
    };

    var sicilyColors = {
      "base": "",
      "selection": ""
    }

    // console.log(sicily);
    var sicilyLayer = L.geoJSON(sicily, {
      // set style for Sicily polygons
      style: sicilyStyle,
      // loop through each feature
      onEachFeature: function (feature, layer) {
        // set behavior on
        layer.on({
          // mouseover - temporarily highlight
          mouseover: highlight,
          // mouseout - reset to original styling
          mouseout: resetHighlight,
          // click - highlight selection until another click
          click: highlightSelection
        })
      }
    }).bindTooltip(function(layer) {
        // add tooltip with province name
        return layer.feature.properties['NAME_2']
      }, {"sticky": true})
      .addTo(sicilyMap);

    updateMap(geojson, yearsOrig);

    function highlight(e) {
      // if the feature's _leaflet_id is different than last click
      if (this._leaflet_id != clickID) {
        // style to highlight polygon
        this.setStyle({
          'fillColor': '#16dd66',
          'fillOpacity': .6
        });
      }
    }

    function resetHighlight(e) {
      hoverID = this._leaflet_id;
      // reset style on mouseout if the feature wasn't the last clicked
      if (hoverID != clickID) {
        sicilyLayer.resetStyle(e.target);
      }

    }

    function highlightSelection(e) {
      // save click selection
      clickID = this._leaflet_id;

      // reset the style of the previously clicked
      if (firstPass == false) {
        resetHighlight(previous)
      }
      previous = e;

      // set style of selection
      this.setStyle({
        'fillColor': '#16dd66',
        'fillOpacity': .9
        // 'color': '#16dd66'
      });
      firstPass = false;

      // add event to filter passenger data by origin province
      updateMap(geojson, years, this.feature.properties['NAME_2'])
    }

    // List of years 1880-1900
    var y = 1880;
    while (y <= 1900) {

      // add year to dropdown list
      $("#min-yr-list").append(
        '<a class="dropdown-item min-yr" href="#">'+y+'</a>'
      )
      $("#max-yr-list").append(
        '<a class="dropdown-item max-yr" href="#">'+y+'</a>'
      )
      y++
    }

    $(".min-yr").click(function(e) {

      years[0] = Number($(this).text());

      $("#min-yr").text(years[0]);
      updateMap(geojson, years);

      // clear Sicily province selection
      sicilyLayer.eachLayer(function (layer) {
        sicilyLayer.resetStyle(layer); // reset highlighting
      });
      clickID = null;
      return years;
    });

    $(".max-yr").click(function(e) {
      // console.log(Number($(this).text()));
      years[1] = Number($(this).text());
      // console.log(years);
      $("#max-yr").text(years[1]);
      updateMap(geojson, years);

      // clear Sicily province selection
      sicilyLayer.eachLayer(function (layer) {
        sicilyLayer.resetStyle(layer); // reset highlighting
      });
      clickID = null;
      return years;
    });

    // When "Reset" button clicked, reset map to original state
    $("#reset-btn").click(function() {

      map.setView(options.center, options.zoom);
      sicilyMap.setView(sicilyOpts.center, sicilyOpts.zoom);

      // clear Sicily province selection
      sicilyLayer.eachLayer(function (layer) {
        sicilyLayer.resetStyle(layer); // reset highlighting
      });
      clickID = null;

      // reset year buttons
      $("#min-yr").text(yearsOrig[0]);
      $("#max-yr").text(yearsOrig[1]);

      // clear passenger info box
      $("#info-list").empty();

      // remove marker from Sicily map
      originMarkers.clearLayers();

      updateMap(geojson, yearsOrig);
    });

    // L.geoJSON(geojson).addTo(map)
    // updateMap(geojson, years);
    // var flowmapLayer = L.canvasFlowmapLayer(geojson).addTo(map).addTo(sicilyMap);

  };  // end drawMap

  function updateMap(geojson, years, province = "") {
    // console.log('updateMap');
    originMarkers = L.layerGroup();

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
        var props = feature.properties
        markers.addLayer(L.circleMarker(latlng, markerOptions)
          .bindTooltip('Origin: ' + props['origin_city'] + ", " + props['Province'] + '<br>' +
            'Destination: ' + props['destination_city'] + '<br>' +
            'Arrival: ' + props['Arrival'])
          .on('click', function(e) {
            console.log(props);
            originMarkers.clearLayers();
            L.circleMarker([Number(props.origin_lat), Number(props.origin_lon)], markerOptions)
              .addTo(originMarkers);
            originMarkers.addTo(sicilyMap);
            // remove previous passenger info
            $("#info-list").empty();
            // add clicked passenger info
            $("#info-list").append(
              "<li>Name: "+props['FirstName']+" "+props['LastName']+"</li>"+
              "<li>Age: "+props['Age']+"</li>"+
              "<li>Occupation: "+props['Occupation']+"</li>"+
              "<li>Literacy: "+props['Literacy']+"</li>"+
              "<li>Origin: "+props['origin_city']+", "+props['Province']+"</li>"+
              "<li>Destination: "+props['destination_city']+"</li>"
            )

          }));
        // originMarkers.addLayer(
        //   L.circleMarker([Number(feature.properties.origin_lat), Number(feature.properties.origin_lon)], markerOptions)
        //     .bindTooltip('Origin: ' + feature.properties['origin_city'] + ", " + feature.properties['Province'] + '<br>' +
        //       'Destination: ' + feature.properties['destination_city'] + '<br>' +
        //       'Arrival: ' + feature.properties['Arrival']));
      }
    });
    map.addLayer(markers);

    // show origin point when clicking destinations
    // markers.on('click', function(e) {
    //   console.log(e);
    // });

    // sicilyMap.addLayer(originMarkers);

    // flowmapLayer.addLayer(L.canvasFlowmapLayer(filteredData));
    // copyFlowmapLayer.addLayer(L.canvasFlowmapLayer(filteredData));
    // map.addLayer(flowmapLayer);
    // sicilyMap.addLayer(copyFlowmapLayer);

  }; //end updateMap


})();
