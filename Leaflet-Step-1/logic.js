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

// Perform a GET request to the query URL/
d3.json(qurl_all).then(function (data) {
  // Once we get a response, send the data.features object to the createFeatures function.
  // createFeatures(data.features);
  console.log(data.features);
});

// function createFeatures(earthquakeData) {

//   // Define a function that we want to run once for each feature in the features array.
//   // Give each feature a popup that describes the place and time of the earthquake.
//   function onEachFeature(feature, layer) {
//     layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Mag(feature.properties.mag)}</p>`);
//   }

//   // Create a GeoJSON layer that contains the features array on the earthquakeData object.
//   // Run the onEachFeature function once for each piece of data in the array.
//   var earthquakes = L.geoJSON(earthquakeData, {
//     onEachFeature: onEachFeature
//   });
// }

//   // for marker size use acresburned
//   function markerSize(AcresBurned) {
//     return Math.sqrt(AcresBurned) * 100 ;
//   }

//   // dropdown selection

//   d3.selectAll("#selectYear").on("change", updateMap);

//   //use selection to update map

//    function updateMap() {
//     // Use D3 to select the dropdown menu
//     var dropdownMenu = d3.select("#selectYear");
//     // Assign the value of the dropdown menu option to a variable
//     var yearset = dropdownMenu.property("value");

//     // console.log(yearset);
//     //variable for refresh
//     let yearlist = [] ;

//     for (var i = 0; i < data.length; i++) {
//      if (data[i].ArchiveYear == yearset) {
//        // push to a layer to draw
//        let fire = L.circle([data[i].Latitude, data[i].Longitude], {
//          fillOpacity: 0.4,
//          color: "turquoise",
//          fillColor: "turquoise",
//        // Setting our circle's radius to equal the output of our markerSize() function:
//          radius: markerSize(data[i].AcresBurned)
//        }).bindPopup(`<h4>Name: ${data[i].FireName}</h4><h5>Duration: ${data[i].Duration}</h5>`)
//        //push to make a layer for display
//        yearlist.push(fire);
//        }
//      else {
//      };
//     };
//     // refresh with new selection
//     myMap.removeLayer(blanky);
//     blanky=L.layerGroup(yearlist);
//     blanky.addTo(myMap);
//   }; 

// // end of pull down options

//   // write data to console
//   console.log(data);

//   // set variables
//   var AllFires = [];
//   var yearfires = [];
//   var marker1 = [];
//   var dixie = [];
//   var blank = [];

//   // loop through data
//   for (var i = 0; i < data.length; i++) {

//     // layer for all fires with marker size acrage burned
//     AllFires.push(L.circle([data[i].Latitude, data[i].Longitude], {
//         fillOpacity: 0.5,
//         color: "red",
//         fillColor: "orange",
//       // Setting our circle's radius to equal the output of our markerSize() function:
//         radius: markerSize(data[i].AcresBurned)
//       }).bindPopup(`<h4>Name: ${data[i].FireName}</h4><h5>Duration: ${data[i].Duration}</h5>`)
//       // .addTo(myMap)
//     );
//   //end i loop
//   };
  
//   
//   // create overlays.
//   var mark = L.layerGroup(marker1);
//   var fires = L.layerGroup(AllFires);
//   var firesy = L.layerGroup(yearfires);
//   var dixief = L.layerGroup(dixie);
//   var blanky = L.layerGroup(blank);

//   var overlayMaps = {
//   "Near Fresno": mark,
//   "Dixie Fire": dixief,
//   "All Fires with Acrerage": fires,
//   "All Fires by year": firesy,
//   };

 // Create basemap selections
 var baseMaps = {
   "Street Map": street,
   "Satellite": Esri_WorldImagery
 };

 // Create a map object.
 var myMap = L.map("map", {
   center: [37.420258, -120.622549],
   zoom: 6,
   layers: [street]
 });

//  // controls open
//  L.control.layers(baseMaps, ove, {
//   collapsed: false
//  }).addTo(myMap);

// end of then
// });

