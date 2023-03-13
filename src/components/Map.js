import React, { Component, useCallback, useEffect, useRef } from "react";
import { Autocomplete, BicyclingLayer, DrawingManager, DrawingManagerF, GoogleMap, GroundOverlay, HeatmapLayer, KmlLayer, LoadScript, StreetViewPanorama, TrafficLayer, TransitLayer, useJsApiLoader,  } from "@react-google-maps/api";
import { useState } from "react";
import "../scss/main.css"
import axios from "axios";
import { useRecoilState, useRecoilValue } from "recoil";
import { centerState, mapState } from "../store/common";
axios.defaults.withCredentials = true;

const mapStyle = {
  width: '100%',
  height: '100%',
}

let orthoPhoth; // 변수 값 최상단으로!
const Map = () => {
  const { isLoaded } = useJsApiLoader({
    id: process.env.REACT_APP_MAP_ID,
    googleMapsApiKey: process.env.REACT_APP_MAP_API_KEY
  });

  const [zoom, setZoom] = useState(18);
  const [mapObj, setMapObj] = useRecoilState(mapState);
  const [toggleOrthoPhoth, setToggleOrthoPhoth] = useState(false);
  const targetLayerId = useRecoilValue(centerState);
  const center = targetLayerId.target;
  const layerId = targetLayerId.layerId;

const onLoadMap = useCallback((map) => {
  // center 로 보낼 때 사용할것.
  // const bounds = new window.google.maps.LatLngBounds(center);
  // console.log('bounds: ', bounds);
  // map.fitBounds(bounds);
  
  setMapObj(map);
}, [])

const cleanUpOverlay = () => {
  if(orthoPhoth) orthoPhoth.setMap(null);
}
const onIdleMap = () => {
  // if (!orthoPhotoEnd) 
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

  getOrthoPhoto(map, bounds2, width, height);
}

const getOrthoPhoto = (map, bound, width, heigth) => {
  
  const bbox = `${ bound.west }, ${ bound.south }, ${ bound.east }, ${ bound.north }`;
  
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

const ToggleOrthoPhothHandler = () => {
  if (!toggleOrthoPhoth) {
    orthoPhoth.setOpacity(0);
    setToggleOrthoPhoth(true);
  } else {
    orthoPhoth.setOpacity(1);
    setToggleOrthoPhoth(false);
  }
}

  return( isLoaded && 
      <GoogleMap
        mapContainerStyle={ mapStyle }
        center={ center }
        zoom={ zoom }
        mapTypeId={ "hybrid" }
        onLoad={ onLoadMap }
        onIdle={ onIdleMap }
      >
      {/* 정사영상 toggle btn */}
        <div className="orthoPhotoBox">
          <button onClick={ToggleOrthoPhothHandler}>정사영상 {!toggleOrthoPhoth ? '끄기' : '켜기'}</button>
        </div>
      </GoogleMap>
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


// function setAIResultList(map, bounds) { // 로그인 후 구현할것
//   const url = process.env.REACT_APP_CONTEXT_PATH + '/mosaic/get-ai-result-feature-list.do';
//   const data = { bounds };

//   axios.post(url, data)
//   .then((res) => {
//     const features = res.data.aiResultFeatureList;
//     console.log('features: ', features);

//   })
//   .catch((res) => {
//     console.log(res)
//   })
// }