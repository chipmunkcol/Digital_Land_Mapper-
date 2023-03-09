import React, { Component, useCallback, useEffect } from "react";
import { Autocomplete, BicyclingLayer, DrawingManager, DrawingManagerF, GoogleMap, GroundOverlay, HeatmapLayer, KmlLayer, LoadScript, StreetViewPanorama, TrafficLayer, TransitLayer,  } from "@react-google-maps/api";
import { useState } from "react";
import "../scss/main.css"

const MAP_API = process.env.REACT_APP_MAP_API_KEY;
const mapStyle = {
  width: '100%',
  height: '100%',
}

const Map = () => {

  const [zoom, setZoom] = useState(15)
  const [mapObj, setMapObj] = useState(null)
  console.log('mapObj: ', mapObj);
  // const [bounds, setBounds] = useState(null)
  const center = { 
    lat: 35.297847110719005,
    lng: 126.70376411589496
  };

const onLoadMap = useCallback((map) => {
  map.panTo({ lng: 126.6833149543654, lat: 35.28658554630178 });

  setMapObj(map);
}, [])

let orthoPhoth;
let orthoPolygon;
const cleanUpOverlay = () => {
  if(orthoPhoth) orthoPhoth.setMap(null);
}
const onIdleMap = () => {
  refreshMap(mapObj);
}

function refreshMap(map) {
  const bounds = map.getBounds();
  const ne = bounds.getNorthEast();
  const sw = bounds.getSouthWest();

  const bounds2 = {
    north: ne.lat(),
    south: sw.lat(),
    east: ne.lng(),
    west: sw.lng(),
  }

  const width = map.getDiv().offsetWidth;
  const height = map.getDiv().offsetHeight;

  getOrthoPhoto(map, bounds2, width, height)
}

const getOrthoPhoto = (map, bound, width, heigth) => {
  
  const bbox = `${ bound.west }, ${ bound.south }, ${ bound.east }, ${ bound.north }`;
  const layerId = "ko-mapper:a785-cb1f-1aedb9cc-4ef318c1" // "lard_adm_sect_sgg", "lsmd_cont_ldreg"
  
  const url = getUrl(layerId, bbox, width, heigth)

  const img = new Image();
  img.src = url;
  img.id = layerId;
  
  img.onload = () => {
    cleanUpOverlay();
    orthoPhoth = new window.google.maps.GroundOverlay(img.src, bound)
    orthoPhoth.setMap(map);
  }

}

  return(
    <LoadScript googleMapsApiKey={ MAP_API }>
      <GoogleMap
        mapContainerStyle={ mapStyle }
        center={ center }
        zoom={ 15 }
        mapTypeId={ "hybrid" }
        onLoad={ onLoadMap }
        // onIdle={ cleanUpOverlay }
        onIdle={ onIdleMap }
        // onDragStart={ cleanUpOverlay }
        // onZoomChanged={ cleanUpOverlay }
      >
      </GoogleMap>
    </LoadScript>
  )
}

export default React.memo(Map);


function getUrl(layerId, bbox, width, height) {
  return process.env.REACT_APP_GEOSERVER_URL + '/ko-mapper/wms'
          + '?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&FORMAT=image/png&TRANSPARENT=true'
          + '&exceptions=application/vnd.ogc.se_inimage'
          + '&LAYERS=' + layerId
          + '&WIDTH=' + width
          + '&HEIGHT=' + height
          + '&BBOX=' + bbox;
}