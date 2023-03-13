import { useSetRecoilState } from "recoil";
import { layerList } from "../db/data";
import { centerState } from "../store/common";

const LeftPanel = () => {

  return(
    <div className="leftPanel">
      {
        layerList.map((layer) => 
          <LayerList 
            key={layer.layerId}
            layer={layer}
          />
        )
      }
    </div>
  )
}

export default LeftPanel;

function LayerList({ layer }) {

const layerId = layer.layerId;
const layerName = layer.name;
const layerAdress = layer.address;
const layerLat = (layer.bounds[1]+layer.bounds[3]) / 2;
const layerLng = (layer.bounds[0]+layer.bounds[2]) / 2;

const setTargetLayerId = useSetRecoilState(centerState);

const getOrthoPhotoHandler = () => {
  setTargetLayerId((prev) => ({...prev, 
    target: {
      lat: layerLat,
      lng: layerLng,
    },
    layerId,
  }))
  
console.log('layerLng: ', layerLat, layerLng);
}

  return(
    <div className="layer_box" onClick={getOrthoPhotoHandler}>
      <div className="layer_title">{layerName}</div>
      <div className="layer_address">{layerAdress}</div>
    </div>
  )
}

// function getLayerList(sidCode, sggCode, query) { 로그인 후 구현할것!
//   const url = '/mosaic/get-orthophoto-list.do';
//   const data = {
//     sidCode,
//     sggCode,
//     searchQuery: query
//   }

//   axiosPost(url, data)
//   .then((res) => {
//     console.log('res: ', res);
//   })
//   .catch((res) => {
//     console.log('res: ', res);
//   })
// }