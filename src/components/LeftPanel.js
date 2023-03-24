import '../scss/main.css'
import { useRecoilState, useSetRecoilState } from "recoil";
import { layerList } from "../db/data";
import { centerState, drawingManager, modalState } from "../store/common";
import { useCallback, useEffect, useRef, useState } from 'react';
import Pagination from 'react-js-pagination';
import { Scrollbar } from 'react-scrollbars-custom';
import ProgressBar from '@ramonak/react-progress-bar';

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
        <Scrollbar style={{ width: '100%', height: 'calc(100% - 60px)' }}>
        <div className='item-list'>
          {
            item.slice((page - 1) * 8, page * 8).map((layer, index) => 
              <LayerList 
                key={layer.layerId}
                layer={layer}
                index={index}
              />
            )
          }
        </div>
        </Scrollbar>

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

function LayerList({ layer, index }) {

const setDrawingManager = useSetRecoilState(drawingManager);

const onClickTemplate = () => {
    setDrawingManager((prev) => !prev);
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

  // progressbar
  const [completed, setCompleted] = useState(0);
  const [downloadIndex, setDownloadIndex] = useState(null);
  const intervalRef = useRef(null);
  
  const downloadHandler = (index) => {
    setDownloadIndex(index);
  }

  useEffect(() => {
    if(downloadIndex)
      intervalRef.current = setInterval(() => {
        setCompleted(completed => {
          if (completed === 100) {
            clearInterval(intervalRef.current);
            return completed;
          } else {
            return completed + 10;
          }
        });
      }, 1000);
    
    return () => clearInterval(intervalRef.current);
  }, [downloadIndex]);
  
  // 업로드
  const setModal = useSetRecoilState(modalState);

  return(
    <div className="layer_box" onClick={getOrthoPhotoHandler}>
      <div className="layer_title">{layerName}</div>
      <div className="layer_address">{layerAdress}</div>
      <div className="layer_btn_box">
        <button className="layer_btn" onClick={ (e) => {setModal(prev => !prev); e.stopPropagation()} }>
          업로드
        </button>
        
        <button className="layer_btn" onClick={ (e) => {downloadHandler(index + 1); e.stopPropagation()} }>
          다운로드
        </button>
        
        <button className="layer_btn" 
          onClick={(e)=>{
            e.stopPropagation();
            onClickTemplate();
            }}>
              편집
        </button>
      </div>
      <div className='progressbar'>
        {
          index + 1 === downloadIndex ?
            <ProgressBar 
              completed={ completed }
              maxCompleted={ 100 }
            /> : null
        }
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