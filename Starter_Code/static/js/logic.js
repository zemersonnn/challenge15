// Creating the map object
let myMap = L.map("map", {
    center: [40.7128, -74.0059], 
    zoom: 11
}); 

// Adding the tile layer 
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);


// Use this linko tp get the GepJSON data
let link = " https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.geojson"

d3.json(link).then(
    function(data) {
        
    };
);