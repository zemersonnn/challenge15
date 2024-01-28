// Creating the map object
let myMap = L.map("map", {
    center: [20.7128, -74.0059], 
    zoom: 3
}); 

// Adding the tile layer 
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);


// Use this linko tp get the GepJSON data
let link_earthquake = " https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.geojson"

let mapStyle = {
    color: "white", 
    fillColor: "green",
    fillOpactiy: 0.5, 
    weight:1.5
};

d3.json(link_earthquake).then(
    function(data) {
        L.geoJson(data, {
            style: mapStyle
        }).addTo(myMap);
    }
);