// import {GoogleMap, GroundOverlay, GroundOverlayF, LoadScriptNext, MarkerF, useGoogleMap} from '@react-google-maps/api'
// import { useEffect, useMemo, useRef, useState } from 'react'
// import { getUrl } from './Map';


// const mapStyle = {
//   width: '100%',
//   height: '100%',
// }
// let orthoPhoth;
// function Map3() {

//   const [mapObj, setmapObj] = useState();
//   console.log('map: ', mapObj);
//   const [center, setCenter] = useState({
//     lat: 35.297847110719005,
//     lng: 126.70376411589496
//   });
//   const [zoom, setZoom] = useState(17);
//   const ref = useRef(null);

//   useEffect(() => {
//     initMap();
//   },[])

//   const initMap = () => {
//      const maps = new window.google.maps.Map();
//      setmapObj(maps)
//   }

//   function initOrthoPhto() {
//     const bounds = mapObj.getBounds();
//     const ne = bounds.getNorthEast();
//     const sw = bounds.getSouthWest();

//     const bounds2 = {
//       north: ne.lat(),
//       south: sw.lat(),
//       east: ne.lng(),
//       west: sw.lng(),
//     }

//     const width = mapObj.getDiv().offsetWidth;
//     const height = mapObj.getDiv().offsetHeight;

//     getOrthoPhoto(bounds2, width, height)
//   }

//   const getOrthoPhoto = (bound, width, heigth) => {
  
//     const bbox = `${ bound.west }, ${ bound.south }, ${ bound.east }, ${ bound.north }`;
//     const layerId = "ko-mapper:a785-cb1f-1aedb9cc-4ef318c1" // "lard_adm_sect_sgg", "lsmd_cont_ldreg"
    
//     const url = getUrl(layerId, bbox, width, heigth)
//     const img = new Image();
//     img.src = url;
//     img.id = layerId;
//   }

//   return (
//       <LoadScriptNext googleMapsApiKey={process.env.REACT_APP_MAP_API_KEY}>
//         <GoogleMap 
//         mapContainerStyle={ mapStyle }
//         center={center}
//         zoom={zoom} 
//         >
//           <GroundOverlay 
//             url=''
//             bounds=''
//           />

//         </GoogleMap>
//       </LoadScriptNext>
//   )
// }
// export default Map3;