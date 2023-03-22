import '../scss/main.css'
import { useSetRecoilState } from "recoil";
import { layerList } from "../db/data";
import { centerState, drawingManager } from "../store/common";
import { useEffect, useState } from 'react';
import Pagination from 'react-js-pagination';

const LeftPanel = () => {

  // Pagination 구현하기
  const [page, setPage] = useState(1);
  const [item, setItem] = useState(layerList);

  const handlePageChange = (page) => {
    setPage(page);
  }
  const totalCount = item.length;

  return(
    <>
    <div className="leftPanel">
      {
        item.slice((page - 1) * 8, page * 8).map((layer) => 
          <LayerList 
            key={layer.layerId}
            layer={layer}
          />
        )
      }
      <Pagination 
        activePage={ page }
        itemsCountPerPage={8}
        totalItemsCount={ totalCount }
        pageRangeDisplayed={5}
        prevPageText={"<"}
        nextPageText={">"}
        onChange={ handlePageChange }
      />

    </div>
    </>
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



// const [isActive, setIsActive] = useState(null);
// // const paginationArr = [1,2,3,4,5,6];

// // 클릭한 index만 넘겨줘서 index 번호로 클릭 한 거 구분해주자 
// const onclickActive = (index) => {
//   setIsActive(index);
// }

// {
//   paginationArr.map((number, index) => (
//     <span
//       key={number} 
//       className={`page ${isActive === index ? 'active' : ''}`}
//       onClick={ () => {onclickActive(index)} }
//     >
//       [{number}]
//     </span>
//   ))
// } 