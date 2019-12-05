(function () {

  // hide arrows
  $("#arrow-2").hide();
  $("#arrow-3").hide();

  var sicilyColors = chroma.scale('Accent').colors(9);

  // US map options
  var options = {
        zoomSnap: .5,
        center: [39, -97],
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
    center: [37.5, 13.5],
    zoom: 7,
    minZoom: 6.5,
    zoomSnap: .2,
    maxBounds: [[41, 20],[33, 8]]
  }
  var sicilyMap = L.map('sicilyMap', sicilyOpts);

  // request tiles and add to map
  var CartoDB_PositronNoLabels = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png', {
  	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
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
        header: true,
        // step: function(row) {
      	// 	console.log("Row:", row.data);
      	// },
      	complete: function(data) {
          $.getJSON('data/sicily-labels.json', function(labels) {
            drawLabels(labels);
          }).fail(function(error) {
              // the data file failed to load
              console.log("Error... error...");
              // console.log(error);
          });
      		console.log("All done!");
          processData(data.data);
          drawMap(geojson, sicily);
      	}
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

  var yearsOrig = [1885, 1890];
  var years = yearsOrig;
  // show year range in UI control area
  var year0 = $("#year-0").html(years[0]);
  var year1 = $("#year-1").html(years[1]);
  var geojson = {};
  var clickID = null;
  var hoverID = null;
  var firstPass = true;
  var province = "";

  // create slider for year range
  var slider = document.getElementById('slider');

  noUiSlider.create(slider, {
      start: yearsOrig,
      connect: true,
      range: {
          'min': 1880,
          'max': 1900
      },
      step: 1,
      format: {
        to: function (value) {
          return value.toFixed(0);
        },
        from: function (value) {
          return Number(value);
        }
      },
      tooltips: [true, true]
      // pips: {
      //   mode: 'range',
      //   density: 3
      // }
  });

  // var flowmapLayer = L.layerGroup();
  // var copyFlowmapLayer = L.layerGroup(); // use copy to add layer to second map
  var markers = L.markerClusterGroup({
    showCoverageOnHover: false,
    maxClusterRadius: 30,
    chunkedLoading: true,
    spiderLegPolylineOptions: {
      color: "#fee0d2"
    }
  })
  // .on('spiderfied', function (e) {
  //   map.flyTo(e.cluster._latlng);
  //   e.cluster.spiderfy();
  // });
  //
  var originMarkers = L.layerGroup();
  // var originMarkers = L.markerClusterGroup({
  //   showCoverageOnHover: false,
  //   maxClusterRadius: 20,
  //   chunkedLoading: true
  // });
  var markerOptions = {
    radius: 5,
    color: '#de2d26',
    fillColor: "#fff7d4",
    fillOpacity: .5
  }
  var originMarkerOpts = {
    radius: 5,
    color: '#de2d26',
    fillColor: '#fff7d4',
    fillOpacity: 0.8
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
        // filter out generic data - after researching, Altona looks like a transcription
        // error. The documents say "United States of America"
        if (datum.destination_city == "Usa" | datum.destination_city == "Altona") {

        }else {
          // push each feature to geojson
          geojson.features.push(feature)
        }
      }

    });

    // console.log(geojson);
    return geojson;
  };

  function drawMap(geojson, sicily) {

    // console.log(sicily);
    var sicilyLayer = L.geoJSON(sicily, {
      // set style for Sicily polygons
      style: function (feature) {
        return {
          fillColor: sicilyColors[feature.properties.ID],
          color: sicilyColors[feature.properties.ID],
          fillOpacity: .4
        }
      },
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
    }).addTo(sicilyMap);

    // updateMap(geojson, yearsOrig);

    function highlight(e) {
      // if the feature's _leaflet_id is different than last click
      if (this._leaflet_id != clickID) {
        // style to highlight polygon
        this.setStyle({
          // 'fillColor': '#16dd66',
          'fillOpacity': .7
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
        // 'fillColor': '#16dd66',
        'fillOpacity': .9
        // 'color': '#16dd66'
      });
      firstPass = false;

      province = this.feature.properties['NAME_2'];

      // hightlight step-two
      $("li").removeClass("next");
      $("#arrow-1").hide();
      $("#step-two").addClass("next");
      $("#arrow-2").show();

      // clear markers on Sicily map
      originMarkers.clearLayers();

      // add event to filter passenger data by origin province
      updateMap(geojson, years, province);
      return province;
    }  //end highlightSelection()

    slider.noUiSlider.on('slide', function () {
      $(".spinner-border").show()
    });

    slider.noUiSlider.on('change', function (values) {

      // set years to new slider values and display on ui-controls
      years[0] = values[0];
      year0.html(values[0]);
      years[1] = values[1];
      year1.html(values[1]);

      updateMap(geojson, years, province);

      // hightlight step-three
      $("li").removeClass("next");
      $("#arrow-2").hide();
      $("#step-three").addClass("next");
      $("#arrow-3").show();

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

      // reset year slider
      slider.noUiSlider.set([1885,1890]);
      // years = yearsOrig;  //why doesn't this work??
      years = [1885,1890];


      // reset ui-controls highlighting
      $("li").removeClass("next");
      $("#arrow-2").hide();
      $("#arrow-3").hide();

      // highlight step-one
      $("#step-one").addClass("next");
      $("#arrow-1").show();

      // remove marker from Sicily map
      originMarkers.clearLayers();

      updateMap(geojson, years);
    });

    // L.geoJSON(geojson).addTo(map)
    updateMap(geojson, years);
    // var flowmapLayer = L.canvasFlowmapLayer(geojson).addTo(map).addTo(sicilyMap);

  };  // end drawMap

  function updateMap(geojson, years, province = "") {
    // console.log('updateMap');

    $(".spinner-border").show();

    // originMarkers = L.layerGroup();

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
          .bindTooltip(props['FirstName']+" "+props['LastName']+"<br>"+
            "Age: "+props['Age']+"<br>"+
            "Occupation: "+props['Occupation']+"<br>"+
            "Literacy: "+props['Literacy']+"<br>"+
            'Origin: ' + props['origin_city'] + ", " + props['Province'] + '<br>' +
            'Destination: ' + props['destination_city'] + '<br>' +
            'Arrival: ' + props['Arrival'])
          .bindPopup(props['FirstName']+" "+props['LastName']+"<br>"+
            "Age: "+props['Age']+"<br>"+
            "Occupation: "+props['Occupation']+"<br>"+
            "Literacy: "+props['Literacy']+"<br>"+
            'Origin: ' + props['origin_city'] + ", " + props['Province'] + '<br>' +
            'Destination: ' + props['destination_city'] + '<br>' +
            'Arrival: ' + props['Arrival'])
          .on('mouseover', function (e) {
            e.target.setStyle({
              fillOpacity: 1
            });
          })
          .on('mouseout', function (e) {
            e.target.setStyle(markerOptions);
          })
          .on('click', function(e) {
            // console.log(props);
            // clear marker on Sicily map from prev click
            originMarkers.clearLayers();
            // create marker at origin city coords and add to map
            var originCoords = [Number(props.origin_lat), Number(props.origin_lon)];
            L.circleMarker(originCoords, originMarkerOpts)
              .addTo(originMarkers);
            originMarkers.addTo(sicilyMap);
            // center passenger marker
            // console.log(e.target._latlng);
            // map.flyTo(e.target._latlng)
            // zoom to origin marker
            sicilyMap.flyTo(originCoords, 7.5);

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
    $(".spinner-border").hide();
  }; //end updateMap

  function drawLabels(labelsJSON) {
    L.geoJSON(labelsJSON, {
      pointToLayer: function (feature, latlng) {
        // console.log(feature);
        var labelIcon = L.divIcon({
          html: feature.properties.name,
          className: 'label-icon'
        });
        return L.marker(latlng, {
          icon: labelIcon,
          interactive: false
        }).bindTooltip();
      }
    }).addTo(sicilyMap);
  }; //end drawLabels


})();
