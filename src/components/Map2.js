import { Wrapper } from "@googlemaps/react-wrapper";
import { useEffect, useRef, useState } from "react";

export default function Map2() {
  return (
  <Wrapper 
  apiKey={process.env.REACT_APP_MAP_API_KEY}
  version="beta"
   >
    <MyMap />
  </Wrapper>
  );
}

function MyMap() {
  const [map, setMap] = useState();
  console.log('map: ', map);
  const ref = useRef();
  const [zoom, setZoom] = useState(17);

  const mapOptions = {
    mapId: process.env.REACT_APP_MAP_ID,
    center: {lat: 35.297847110719005, lng: 126.70376411589496},
    zoom: zoom,
    disableDefaultUI: false,
    
  }

  useEffect(() => {
    const getMap = new window.google.maps.Map(ref.current, mapOptions);
    setMap(getMap)
  },[]);

  return (
  <>
    <div ref={ref} id="map" style={{width:'100%', height:'100%'}}/>
    {map && <ChildMap map={map}></ChildMap>}
  </>
  )
}

function ChildMap({ map }) {

console.log('child컴포넌트' + map);

  return (
    <>
      <div></div>
    </>
  )
}
