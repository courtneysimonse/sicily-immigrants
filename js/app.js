(function () {

  // map options
  var options = {
    zoomSnap: .1,
    center: [38, 14], // center of Sicily
    zoom: 6,
    minZoom: 4,
    zoomControl: false,
    attributionControl: false
    // maxZoom: 15
  }

  // create map
  var map = L.map('map', options);

  // request tiles and add to map
  var CartoDB_Positron = L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
  	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
  	subdomains: 'abcd',
  	maxZoom: 19
  }).addTo(map);

  // first make sure all data are loaded using deferred requests
  var passengersData = d3.csv("data/sicily_passengers.csv"),
      sicilyData = d3.json("data/sicily.geojson")

  // when all data ARE loaded, call the ready function
  Promise.all([passengersData, sicilyData]).then(ready)


  function ready(data) {

    // all data are in GeoJSON now and ready
    // separate out the data sets and parse CSV to GeoJSON
    drawMap(parseCSV(data[0]), data[1]);

  }

  function parseCSV(data) {

    console.log(data[0])

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
      feature.geometry.coordinates = datum.latlong

      // push each feature to geojson
      geojson.features.push(feature)
    })
    // return complete geojson
    console.log(geojson)
    return geojson
  }

  function drawMap(passengersData, sicilyData) {

    var sicilyLayer = L.geoJson(sicilyData, {
      // style Sicily province lines
      style: function (feature) {
        return {
          color: 'red',
          weight: 2
        };
      }
    }).addTo(map);

    var passengersLayer = L.geoJson(passengersData).addTo(map)

  } // end drawMap

})();
