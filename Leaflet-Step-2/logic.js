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

var plate = "Resources/plate_bound.json"

//for depth colors
function chooseColor(depth) {
  if (depth <= 5) return "yellow";
  else if (depth <= 15) return "red";
  else if (depth <= 30) return "orange";
  else if (depth <= 60) return "green";
  else return "purple";
}

d3.json(plate).then(function (datap) {
  console.log(datap.features);

  // function oneachp (feature, layer){
  //  linep = datap.features.geometry.coordinates;

  //   // return L.polyline(datap.features.geometry.coordinates, {color: 'red'});
  // }
  // var plates = L.geoJSON((datap.features),{
  //   onEachFeature: oneachp,
  //   return L.polyline(linep, {color: 'red'}),
  // });


// Perform a GET request to USGS earthquatkes/
d3.json(qurl_all).then(function (data) {
  // Once we get a response, send the data.features object to the createFeatures function.
  createFeatures(data.features);
  console.log(data.features);

 function createFeatures(earthquakeData) {

  // Define a function that we want to run once for each feature in the features array.
  // Give each feature a popup that describes the place and time of the earthquake.
  function onEachFeature(feature, layer) {
    layer.bindPopup(`<h3>${feature.properties.place}</h3><p>Magnitude: ${(feature.properties.mag)}</p>`);
  }

  // Create a GeoJSON layer that contains the features array on the earthquakeData object.
  // Run the onEachFeature function once for each piece of data in the array.

   var geojsonMarkerOptions = {
    weight: 2,
    opacity: 1,
    fillOpacity: 0.5
   };

   var earthquakes = L.geoJSON(earthquakeData, {
     style: function(feature) {
       return { 
         radius: feature.properties.mag,
         color: chooseColor(feature.geometry.coordinates[2]),
       };
     },
     onEachFeature: onEachFeature,
     pointToLayer: function (feature, latlng) {
         return L.circleMarker(latlng, geojsonMarkerOptions);
     }
    });
 //
  var overlayMaps = {
  "Earthquakes last 30 days": earthquakes,
  // "Plate Boundaries": plates,
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

 // end earthquake then
}});
//end plate then
});