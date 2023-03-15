import '../scss/main.css'
import { useSetRecoilState } from "recoil";
import { layerList } from "../db/data";
import { centerState, drawingManager } from "../store/common";

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

// const useState()

const setDrawingManager = useSetRecoilState(drawingManager);

const onClickTemplate = (layerId) => {
  // if(layer.layerId === layerId) {
    setDrawingManager((prev) => !prev);
  // }
}

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
}

  return(
    <div className="layer_box" onClick={getOrthoPhotoHandler}>
      <div className="layer_title">{layerName}</div>
      <div className="layer_address">{layerAdress}</div>
      <div className="layer_btn_box">
        <button className="layer_btn" 
          onClick={(e)=>{
            e.stopPropagation();
            onClickTemplate(layer.layerId)
            }}>
              편집
        </button>
      </div>
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