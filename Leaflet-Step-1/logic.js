// for proj3 cal fire data display

// Add a tile layer.
var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
})

var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'

});

//https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_week.geojson
//https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson
var qurl_all = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

let mage = [];
// Perform a GET request to the query URL/
d3.json(qurl_all).then(function (data) {
  // Once we get a response, send the data.features object to the createFeatures function.
  createFeatures(data.features);
  console.log(data.features);
 // });

 function createFeatures(earthquakeData) {

  // Define a function that we want to run once for each feature in the features array.
  // Give each feature a popup that describes the place and time of the earthquake.
  function onEachFeature(feature, layer) {
    var mage = feature.properties.mag;
    layer.bindPopup(`<h3>${feature.properties.place}</h3><p>Magnitude: ${(feature.properties.mag)}</p>`);
  }

  // Create a GeoJSON layer that contains the features array on the earthquakeData object.
  // Run the onEachFeature function once for each piece of data in the array.
  //  var mage = feature.properties.mag;

   var geojsonMarkerOptions = {
    radius: mage*10,
    fillColor: "green",
    color: "green",
    weight: 2,
    opacity: 1,
    fillOpacity: 0.5
   };

   var earthquakes = L.geoJSON(earthquakeData, {
     onEachFeature: onEachFeature,
     pointToLayer: function (feature, latlng) {
         return L.circleMarker(latlng, geojsonMarkerOptions);
     }
    });
 //
    // for marker size use acresburned
    function markerSize(magnitude) {
      // return Math.sqrt(magnitude) * 10000 ;
      return magnitude*10 ;
    }

  var overlayMaps = {
  "Earthquakes last 30 days": earthquakes
  };

 // Create basemap selections
 var baseMaps = {
   "Street Map": street,
   "Satellite": Esri_WorldImagery
 };

 // Create a map object.
 var myMap = L.map("map", {
   center: [25.2020457, -47.0986204],
   zoom: 2,
   layers: [street]
 });

 // controls open
 L.control.layers(baseMaps, overlayMaps, {
  collapsed: false
 }).addTo(myMap);

 // end of then
}});
