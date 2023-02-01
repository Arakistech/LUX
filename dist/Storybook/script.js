mapboxgl.accessToken = 'pk.eyJ1IjoiaWFyYWtpc3RhaW4iLCJhIjoiY2t4NHBqNHd1MHRvaTJubnhodmxqdXhjbiJ9.T6OE8lXKHGCObadLCmIoqg';

      const geojson = {
        'type': 'FeatureCollection',
        'features': [
          {
            'type': 'Feature',
            'geometry': {
              'type': 'Point',
              'coordinates': [-77.032, 38.913]
            },
            'properties': {
              'title': 'Storybook Bridal',
              'description': 'Washington, D.C.'
            }
          },
          {
            'type': 'Feature',
            'geometry': {
              'type': 'Point',
              'coordinates': [150.8349539846573, -34.562933800157616]  
            },
            'properties': {
              'title': 'LStorybook Bridal',
              'description': 'Shop 1/6 Memorial Dr, Shellharbour City Centre NSW 2529'
            }
          }
        ]
      };

      const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/iarakistain/cl5m4fbq6000s14t98hkk3ulo',
        center: [150.8349539846573, -34.562933800157616],
        zoom: 16,
        pitch: 45,
        bearing: -17.6,
      });

      // add markers to map
      for (const feature of geojson.features) {
        // create a HTML element for each feature
        const el = document.createElement('div');
        el.className = 'marker';
       
        // make a marker for each feature and add it to the map
        new mapboxgl.Marker(el)
          .setLngLat(feature.geometry.coordinates)
          .setPopup(
            new mapboxgl.Popup({ offset: 25 }) // add popups
              .setHTML(
                `<h3>${feature.properties.title}</h3><p>${feature.properties.description}</p>`
              )
          )
          .addTo(map);  
        
      }





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
  
   const popup = new mapboxgl.Popup({
     closeButton: false,
     closeOnClick: false })
        .setLngLat([15.8966428711643, -34.424838253323756])
        .setHTML('')
        .addTo(map);
        });
