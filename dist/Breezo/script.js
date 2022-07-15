// add mapbox api key
	mapboxgl.accessToken = 'pk.eyJ1IjoiaWFyYWtpc3RhaW4iLCJhIjoiY2w1a3B3YTMxMGNmbTNjbWd2ZTc3bmkyMiJ9.A9qFkPgG40gFsgruODOWRA';
// add breezometer api key
var apiKey = "796659107bd143aab7c9c8541a9b8744";

let style = {
        version: 8,
        sources: {},
        glyphs: "mapbox://fonts/mapbox/{fontstack}/{range}.pbf",
        layers: [
          {
            id: "background",
            type: "background",
            paint: {
              "background-color": "#000000"
            }
          },
        ]
      };

const map = new mapboxgl.Map({
        container: 'map',
        zoom: 2,
        center: [0,0],
        style: style,
        projection: 'globe'
    });

map.on('style.load', () => {
      
map.addSource("aqi", {
type: "raster",
attribution: "Breezometer",
tiles: [`https://tiles.breezometer.com/v1/air-quality/breezometer-aqi/current-conditions/{z}/{x}/{y}.png?key=${apiKey}&breezometer_aqi_color=indiper`],
          tileSize: 256,
          maxzoom: 8
        });
  
map.addSource("pollen", {
          type: "raster",
          attribution: "Breezometer",
          tiles: [`https://tiles.breezometer.com/v1/pollen/grass/forecast/daily/{z}/{x}/{y}.png?key=${apiKey}`],
          tileSize: 256,
          maxzoom: 8
        });
  
map.addLayer({
  id: 'satellite',
  source: {"type": "raster",  "url": "mapbox://mapbox.satellite", "tileSize": 256},
  type: "raster",
  paint: {
  'raster-saturation': -1,
  'raster-opacity': 0.5,
  }
});
  
map.addSource('mapbox.country-boundaries-v1', {
type: 'vector',
url: 'mapbox://mapbox.country-boundaries-v1'
});

var worldviewFilter = [
    "any",
    ["==", "all", ["get", "worldview"]],
    ["in", "US", ["get", "worldview"]]
  ];

map.addLayer({
'id': 'mapbox.country-boundaries-v1-outline',
'type': 'line',
'source': 'mapbox.country-boundaries-v1',
'source-layer':'country_boundaries',
'filter': worldviewFilter,
'layout': {},
'paint': {
'line-color': '#ffffff',
'line-width': 0.1,
'line-opacity': 0.25
}
});

map.addLayer(
          {
            id: "AQI",
            type: "raster",
            source: "aqi",
            minzoom: 0,
            maxzoom: 22,
            paint: {
              "raster-opacity": 0.6
            }
          });
  
map.addLayer(
          {
            id: "Pollen",
            type: "raster",
            source: "pollen",
            minzoom: 0,
            maxzoom: 22,
            layout:{
            visibility:'none'
            },
            paint: {
              "raster-opacity": 0.6
            }
          });  
  
  
   map.setFog({});
    });

    const secondsPerRevolution = 180;
    const maxSpinZoom = 5;
    const slowSpinZoom = 3;

    let userInteracting = false;
    let spinEnabled = true;

    function spinGlobe() {
        const zoom = map.getZoom();
        if (spinEnabled && !userInteracting && zoom < maxSpinZoom) {
            let distancePerSecond = 360 / secondsPerRevolution;
            if (zoom > slowSpinZoom) {
                const zoomDif =
                    (maxSpinZoom - zoom) / (maxSpinZoom - slowSpinZoom);
                distancePerSecond *= zoomDif;
            }
            const center = map.getCenter();
            center.lng -= distancePerSecond;
            map.easeTo({ center, duration: 1000, easing: (n) => n });
        }
    }
    map.on('mousedown', () => {
        userInteracting = true;
    });

    map.on('mouseup', () => {
        userInteracting = false;
        spinGlobe();
    });

    map.on('dragend', () => {
        userInteracting = false;
        spinGlobe();
    });
    map.on('pitchend', () => {
        userInteracting = false;
        spinGlobe();
    });
    map.on('rotateend', () => {
        userInteracting = false;
        spinGlobe();
    });

    map.on('moveend', () => {
        spinGlobe();
    });

    document.getElementById('btn-spin').addEventListener('click', (e) => {
        spinEnabled = !spinEnabled;
        if (spinEnabled) {
            spinGlobe();
            e.target.innerHTML = 'Pause rotation';
        } else {
            map.stop();
            e.target.innerHTML = 'Start rotation';
        }
    });

    spinGlobe();

map.once('load', () => {
if (!map.getLayer('AQI') || !map.getLayer('Pollen')) {
return;
}
 
const toggleableLayerIds = ['AQI', 'Pollen'];
 
for (const id of toggleableLayerIds) {
if (document.getElementById(id)) {
continue;
}
 
const link = document.createElement('a');
link.id = id;
link.href = '#';
link.textContent = id;
link.className = 'active';
 

link.onclick = function (e) {
const clickedLayer = this.textContent;
e.preventDefault();
e.stopPropagation();
 
const visibility = map.getLayoutProperty(
clickedLayer,
'visibility'
);
 
if (visibility === 'visible') {
map.setLayoutProperty(clickedLayer, 'visibility', 'none');
this.className = '';
} else {
this.className = 'active';
map.setLayoutProperty(
clickedLayer,
'visibility',
'visible'
);
}
};
 
const layers = document.getElementById('menu');
layers.appendChild(link);
}
});