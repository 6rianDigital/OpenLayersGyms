/*
  Program: main.js
  Programmer: Brian Gauthier
  Purpose: To build the foundation of a web mapping application displaying the best gyms in Le Plateau Mont-Royal
  Date: March 11, 2025
*/


// import custom styles
import '../css/style.css';

// import map-related modules
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import StadiaMaps from 'ol/source/StadiaMaps.js';
import { fromLonLat } from 'ol/proj';

// import modules for mouse coordinate control
import MousePosition from 'ol/control/MousePosition.js';
import { createStringXY } from 'ol/coordinate';

// import modules for adding GeoJSON layers
import VectorLayer from 'ol/layer/Vector.js';
import GeoJSON from 'ol/format/GeoJSON.js';
import { Vector as VectorSource } from 'ol/source';

// import modules for styling layers
import Icon from 'ol/style/Icon.js';
import Style from 'ol/style/Style.js';
import Stroke from 'ol/style/Stroke.js';

// create eventlistener that will run the init function when the DOM/HTML file is done loading
document.addEventListener("DOMContentLoaded", init);


function init() {

  // define basemap layers
  let streetMap = new TileLayer({
    source: new OSM({
      "url": "https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    })
  });

  let greyMap = new TileLayer({
    source: new OSM({
      "url": "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}"
    })
  });

  let terrainMap = new TileLayer({
    source: new StadiaMaps({
      layer: "stamen_terrain"
    })
  });

  let artMap = new TileLayer({
    source: new StadiaMaps({
      layer: "stamen_watercolor"
    })
  });


  // define the array of basemap layers for toggling function
  let currBasemap = [streetMap, greyMap, terrainMap, artMap];

  // create map instance and set map properties
  const map = new Map({
    target: 'mapDiv',
    layers: [artMap, terrainMap, greyMap, streetMap],
    view: new View({
      center: fromLonLat([-73.582263, 45.522008]),
      zoom: 13.5
    })
  });


  // define the Mouse Control
  const mousePositionControl = new MousePosition({
    coordinateFormat: createStringXY(4),
    projection: 'EPSG:4326',
    className: 'custom-mouse-position',
    target: document.getElementById('mouse-position'),
  });

  // add mouse control to map
  map.addControl(mousePositionControl);

  // declare variables and call the montrealLayers function to add layers to map
  let gymLayer, roadLayer, boroughLayer;
  [boroughLayer, roadLayer, gymLayer] = montrealLayers(map);

  // create eventlistener for gym checkbox
  let chkGYM = document.getElementById('GYM');
  chkGYM.addEventListener("click", function (event) {
    layerToggleGym(gymLayer, this)
  });

  // create eventlistener for roads checkbox
  let chkROAD = document.getElementById('ROAD');
  chkROAD.addEventListener("click", function (event) {
    layerToggleRoad(roadLayer, this)
  });

  // create eventlistener for borough checkbox
  let chkBOROUGH = document.getElementById('BOROUGH');
  chkBOROUGH.addEventListener("click", function (event) {
    layerToggleBorough(boroughLayer, this)
  });

  // create event listener for the Street Map radio button
  let streetMapRadio = document.getElementById('STREETMAP');
  streetMapRadio.addEventListener("change", function (event) {
    if (streetMapRadio.checked) {
      setBasemapVisible(0);
    }
  });

  // create event listener for the Grey Map radio button
  let greyMapRadio = document.getElementById('GREYMAP');
  greyMapRadio.addEventListener("change", function (event) {
    if (greyMapRadio.checked) {
      setBasemapVisible(1);
    }
  });

  // create event listener for the Terrain Map radio button
  let terrainMapRadio = document.getElementById('TERRAINMAP');
  terrainMapRadio.addEventListener("change", function (event) {
    if (terrainMapRadio.checked) {
      setBasemapVisible(2);
    }
  });

  // create event listener for the Water Colour Map radio button
  let waterColourMapRadio = document.getElementById('WATERCOLOURMAP');
  waterColourMapRadio.addEventListener("change", function (event) {
    if (waterColourMapRadio.checked) {
      setBasemapVisible(3);
    }
  });

  
  function setBasemapVisible(index) {
    // Hide all basemaps
    currBasemap.forEach(layer => layer.setVisible(false));
    // Show the selected basemap
    currBasemap[index].setVisible(true);
  }

}

function layerToggleBorough(boroughLayer, obj) {

  if (obj.checked) {
    boroughLayer.setVisible(true);
  } else {
    boroughLayer.setVisible(false);
  }
}

function layerToggleGym(gymLayer, obj) {

  if (obj.checked) {
    gymLayer.setVisible(true);
  } else {
    gymLayer.setVisible(false);
  }
}

function layerToggleRoad(roadLayer, obj) {

  if (obj.checked) {
    roadLayer.setVisible(true);
  } else {
    roadLayer.setVisible(false);
  }
}


function montrealLayers(map) {

  // define the style of the gym points
  let gymStyle = new Style({
    image: new Icon({
      src: './icons/dumbbell.png',
      scale: .1
    })
  });

  // define gyms (point) GeoJSON file
  let gymFile = './geojsons/gyms.geojson';
  let gymLayer = new VectorLayer({
    source: new VectorSource({
      url: gymFile,
      format: new GeoJSON()
    }),
    style: gymStyle
  });

  // define road style
  let roadStyle = new Style({
    stroke: new Stroke({
      color: 'grey',
      width: 5,
    })
  });

  // define roads (linestring) GeoJSON file
  let roadFile = './geojsons/roads.geojson';
  let roadLayer = new VectorLayer({
    source: new VectorSource({
      url: roadFile,
      format: new GeoJSON()
    }),
    style: roadStyle
  });

  // define the style for boroughs layer
  let boroughStyle = new Style({
    stroke: new Stroke({
      color: 'blue',
      width: 5
    }),
  })

  // define boroughs (polygon) GeoJSON file
  let boroughFile = './geojsons/borough.geojson';
  let boroughLayer = new VectorLayer({
    source: new VectorSource({
      url: boroughFile,
      format: new GeoJSON()
    }),
    style: boroughStyle
  });

  // add layers to map
  map.getLayers().extend([boroughLayer, roadLayer, gymLayer]);

  // return the map layers to the init function
  return [boroughLayer, roadLayer, gymLayer];
}

