// Creating the map object
let myMap = L.map("map", {
    center: [20.7128, -74.0059], 
    zoom: 3
}); 

// Adding the tile layer 
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// Use this link to get the GepJSON data
var link_earthquake = " https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.geojson"

let mapStyle = {
    color: "white",
    fillColor: "pink",
    fillOpacity: 0.5,
    weight: 1.5 
};

d3.json(link_earthquake, function(data) {
    earthquakeFunction(data.features);
});

function earthquakeFunction(info) {

var marker = [];


    for (var i = 0; i < info.length; i++) {

        var magnitude = info[i].properties.mag
        var lat = info[i].geometry.coordinates[1]
        var lng = info[i].geometry.coordinates[0]
        var latlng = [lat, lng]
        var depth = info[i].geometry.coordinates[2]

        var color = "";

        if (depth < 10){
            color = "red"
        }
        else if (depth < 30) {
            color = "green"
        }
        else if (depth < 50) {
            color = "green"
        }
        else if (depth < 70) {
            color = "blue"
        }
        else if (depth < 90) {
            color = "blue"
        }
        else {
        
            color = "purple"
        }
    }

d3.json(link_earthquake).then(
    function(data) {
        L.geoJson(data, {
            style:function (feature) {
                return {
                    color: "white",
                    fillColor: chooseColor(feature.properties.depth),
                    fillOpacity: 0.5,
                    weight: 1.5
                };
            }, 
            onEachFeature: function(feature, layer) {
                layer.on
            }
        }).addTo(myMap);
    }
);
    //     marker.push(
    //     L.circle(latlon, {
    //         stroke: false,
    //         fillOpacity: 50,
    //         color: "white",
    //         fillColor: color,
    //         radius: magnitude*50000
    //     }).bindPopup("<h3>" + info[i].properties.title +
    //       "</h3><hr><p>" + new Date(info[i].properties.time) + "</p>")
    // )

//   var earthquakes = L.layerGroup(marker)

//   createMap(earthquakes)


}


