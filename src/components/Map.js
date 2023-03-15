import React, { Component, useCallback, useEffect, useRef } from "react";
import { Autocomplete, BicyclingLayer, DrawingManager, DrawingManagerF, GoogleMap, GroundOverlay, HeatmapLayer, KmlLayer, LoadScript, StreetViewPanorama, TrafficLayer, TransitLayer, useJsApiLoader,  } from "@react-google-maps/api";
import { useState } from "react";
import "../scss/main.css"
import axios from "axios";
import { useRecoilState, useRecoilValue } from "recoil";
import { centerState, drawingManager, mapState } from "../store/common";
import { axiosPost } from "../api/core";
axios.defaults.withCredentials = true;

const mapStyle = {
  width: '100%',
  height: '100%',
}

let orthoPhoth; // 변수 값 최상단으로!
let polygonBuild;
let polygonLoad;
const Map = () => {
  const { isLoaded } = useJsApiLoader({
    // id: process.env.REACT_APP_MAP_ID,
    googleMapsApiKey: process.env.REACT_APP_MAP_API_KEY,
    libraries:['drawing']
  });

  const [zoom, setZoom] = useState(18);
  const [mapObj, setMapObj] = useRecoilState(mapState);
  const [toggleOrthoPhoth, setToggleOrthoPhoth] = useState(false);
  const targetLayerId = useRecoilValue(centerState);
  const center = targetLayerId.target;
  const layerId = targetLayerId.layerId;
  const dm = useRecoilValue(drawingManager);
  console.log('dm: ', dm);

const onLoadMap = useCallback((map) => {
  // center 로 보낼 때 사용할것.
  // const bounds = new window.google.maps.LatLngBounds(center);
  // console.log('bounds: ', bounds);
  // map.fitBounds(bounds);
  
  setMapObj(map);
  drawingManagerHandler(map);
}, [])

const drawingManagerHandler = (map) => {
  const _dm = new window.google.maps.drawing.DrawingManager({
    drawingMode: window.google.maps.drawing.OverlayType.POLYGON,
    drawingControl: true,
    drawingControlOptions: {
      drawingModes: [
        window.google.maps.drawing.OverlayType.POLYGON
      ],
    },
    polygonOptions: {
      fillColor: '#ffff00',
      clickable: false,
      editable: true,
      zIndex: 999
    }
  })
  _dm.setMap(map);
}


const cleanUpOverlay = () => {
  if(orthoPhoth) orthoPhoth.setMap(null);
}
const cleanUpPolygonBuild = () => {
  if(polygonBuild) polygonBuild.setMap(null);
}
const cleanUpPolygonLoad = () => {
  if(polygonLoad) polygonLoad.setMap(null);
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

  if(!toggleOrthoPhoth) {
  getOrthoPhoto(map, bounds2, width, height);
  }
  setAIResultList(map, bounds2);
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

function setAIResultList(map, bounds) {
  const url = '/mosaic/get-ai-result-feature-list.do';
  const data = { bounds };

  axiosPost(url, data)
  .then((res) => {

    const features = res.data.aiResultFeatureList;
    const ai_build = [...features.ail_buld_gt];
    const ai_road = [...features.ail_road_gt];

    // ai build 폴리곤 띄워주기
    for (let i = 0; i<ai_build.length; i++) {
       const boundsArr = JSON.parse(ai_build[i].geojson).coordinates[0][0];
       const color = JSON.parse(ai_build[0].etc).color;
       let bounds = [];
       
      //  cleanUpPolygonBuild();
       for (let j = 0; j<boundsArr.length; j++) {
         const lng = boundsArr[j][0];
         const lat = boundsArr[j][1];
         bounds.push({lat, lng})
       }
      
      polygonBuild = new window.google.maps.Polygon({
        map: map,
        paths: bounds,
        strokeColor: "#000000",
        strokeWeight: 1,
        fillColor: color,
        fillOpacity: 1,
        zIndex: 900,
        editable: dm,
        draggable: dm,
      })
    }

    // ai road 폴리곤 띄워주기
    for (let i = 0; i<ai_road.length; i++) {
      const boundsArr = JSON.parse(ai_road[i].geojson).coordinates[0][0];
      const color = JSON.parse(ai_road[0].etc).color;
      let bounds = [];

      // cleanUpPolygonLoad();
      for (let j = 0; j<boundsArr.length; j++) {
        const lng = boundsArr[j][0];
        const lat = boundsArr[j][1];
        bounds.push({lat, lng})
      }
      
      polygonLoad = new window.google.maps.Polygon({
       map: map,
       paths: bounds,
       strokeColor: "#000000",
       strokeWeight: 1,
       fillColor: color,
       fillOpacity: 1,
       zIndex: 900,
       editable: dm,
       draggable: dm,
     })
   }
  })
  .catch((res) => {
    console.log(res)
  })
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

