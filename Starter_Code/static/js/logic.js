// Create a tile layer 
var defaultMap = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

// Create basemap
let basemap = { 
    default: defaultMap
};

// Map object 
var myMap = L.map("map", {
    center: [35, -119],
    zoom: 5,
    layers: [defaultMap]
});

// Add default map to map 
defaultMap.addTo(myMap);

// Earthquake variable
let earthquake = new L.LayerGroup();

d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.geojson")
.then(function(data) {
    L.geoJson(data,{

        color: "yellow",
        weight: 1

    }).addTo(earthquake);
});

// Add to map
earthquake.addTo(myMap);

// New variable
earthquake_added = new L.LayerGroup();

d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.geojson").then(
    function(earthquakes) {

        // Console log 
        console.log(earthquakes); 

        // Make a function
        function dataColor(depth) {
            if (depth > 90)
                return "red";
            else if(depth > 70)
                return "#fc4903";
            else if(depth > 50)
                return "#fc8403";
            else if(depth > 30)
                return "#fcad03";
            else if(depth > 10)
                return "#cafc03";
            else
                return "green";
        }

        function radiusSize(mag) {
            if (mag==0)
            return 1;
            else 
            return mag*5;
        }

        function dataStyle(feature)
        {
            return { 
              opacity: 0.5,
              fillOpacity: 0.5,
              fillColor: dataColor(feature.geometry.coordinates[2]), 
              color: "000000", 
              radius: radiusSize(feature.properties.mag), 
              weight: 0.5,
              stroke: true
            }
        }

        L.geoJson(earthquakes, {
            
            pointToLayer: function(feature, latLng) {
                return L.circleMarker(latLng);
            },
            
            style: dataStyle,
           
            onEachFeature: function(feature, layer){
              layer.bindPopup(`Magnitude: <b>${feature.properties.mag}</b><br>
                            Depth: <b>${feature.geometry.coordinates[2]}</b><br>
                            Location: <b>${feature.properties.place}</b>`); 
            }
        }).addTo(earthquake_added);

    }
);

earthquake_added.addTo(myMap);

// Legend
let legend = L.control({
    position: "bottomright"
});

// Add to map
legend.addTo(myMap);