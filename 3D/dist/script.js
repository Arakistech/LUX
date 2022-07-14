mapboxgl.accessToken = 'pk.eyJ1IjoiaWFyYWtpc3RhaW4iLCJhIjoiY2w1a3B3YTMxMGNmbTNjbWd2ZTc3bmkyMiJ9.A9qFkPgG40gFsgruODOWRA';
    const map = new mapboxgl.Map({
        style: 'mapbox://styles/mapbox/light-v10',
        center: [150.8966428711643, -34.424838253323756],
        zoom: 15.5,
        pitch: 45,
        bearing: -17.6,
        container: 'map',
        antialias: true
    });

    map.on('load', () => {
        // Insert the layer beneath any symbol layer.
        const layers = map.getStyle().layers;
        const labelLayerId = layers.find(
            (layer) => layer.type === 'symbol' && layer.layout['text-field']
        ).id;

        // The 'building' layer in the Mapbox Streets
        // vector tileset contains building height data
        // from OpenStreetMap.
        map.addLayer(
            {
                'id': 'add-3d-buildings',
                'source': 'composite',
                'source-layer': 'building',
                'filter': ['==', 'extrude', 'true'],
                'type': 'fill-extrusion',
                'minzoom': 15,
                'paint': {
                    'fill-extrusion-color': '#aaa',

                    // Use an 'interpolate' expression to
                    // add a smooth transition effect to
                    // the buildings as the user zooms in.
                    'fill-extrusion-height': [
                        'interpolate',
                        ['linear'],
                        ['zoom'],
                        15,
                        0,
                        15.05,
                        ['get', 'height']
                    ],
                    'fill-extrusion-base': [
                        'interpolate',
                        ['linear'],
                        ['zoom'],
                        15,
                        0,
                        15.05,
                        ['get', 'min_height']
                    ],
                    'fill-extrusion-opacity': 0.6
                }
            },
            labelLayerId
        );
        
        
        
        const geojson = {
'type': 'FeatureCollection',
'features': [
{
'type': 'Feature',
'properties': {
'message': 'Foo',
'iconSize': [60, 60]
},
'geometry': {
'type': 'Point',
'coordinates': [150.8966428711643, -34.424838253323756]
}
},
{
'type': 'Feature',
'properties': {
'message': 'Bar',
'iconSize': [50, 50]
},
'geometry': {
'type': 'Point',
'coordinates': [-61.21582, -15.971891]
}
},
{
'type': 'Feature',
'properties': {
'message': 'Baz',
'iconSize': [40, 40]
},
'geometry': {
'type': 'Point',
'coordinates': [-63.292236, -18.281518]
}
}
]
};
 
const map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/mapbox/streets-v11',
center: [-65.017, -16.457],
zoom: 5
});
 
// Add markers to the map.
for (const marker of geojson.features) {
// Create a DOM element for each marker.
const el = document.createElement('div');
const width = marker.properties.iconSize[0];
const height = marker.properties.iconSize[1];
el.className = 'marker';
el.style.backgroundImage = `url(https://placekitten.com/g/${width}/${height}/)`;
el.style.width = `${width}px`;
el.style.height = `${height}px`;
el.style.backgroundSize = '100%';
 
el.addEventListener('click', () => {
window.alert(marker.properties.message);
});
 
// Add markers to the map.
new mapboxgl.Marker(el)
.setLngLat(marker.geometry.coordinates)
.addTo(map);
}
      
        
        
        
        
    });
