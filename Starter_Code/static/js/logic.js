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

d3.json(link_earthquake, function(data) {
       earthquake_function(data.features);
});

function earthquake_function(info) {

    var marker = [];

    for (var i = 0; i < info.length; i++) {

        var mag = info[i].properties.mag
        var lat = info[i].geometry.coordinates[1]
        var lon = info[i].geometry.coordinates[0]
        var latlon = [lat, lon]
        var depth = info[i].geometry.coordinates[2]

        var color = "";

        if (depth < 10){
            color = "light pink"
        }
        else if (depth < 30) {
            color = "dark pink"
        }
        else if (depth < 50) {
            color = "purple"
        }
        else if (depth < 70) {
            color = "blue"
        }
        else if (depth < 90) {
            color = "dark blue"
        }
        else {
            color = "black"
        }
    marker.push(
        L.cirlce(latlon, {
            stroke: false, 
            fillOpacity: 0.5,
            color: "white",
            fillColor: color, 
            radius: mag*100000
        }).bindPopup("<h3" + info.properties.title + "</h3><hr><p>" + new Date(info[i].properties.time) + "</p>")
    )
    }
    var earthquake = L.layerGroup(marker)
    createImageBitmap(earthquake);
}
