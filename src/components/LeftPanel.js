import '../scss/main.css'
import { useRecoilValue, useSetRecoilState } from "recoil";
import { centerState, drawingManager, isProgressState, layerListState, modalState, progressState } from "../store/common";
import { useState } from 'react';
import Pagination from 'react-js-pagination';
import { Scrollbar } from 'react-scrollbars-custom';
import ProgressBar from '@ramonak/react-progress-bar';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';
import { app } from '../api/firebase';

const LeftPanel = () => {

  // Pagination 구현하기
  const [page, setPage] = useState(1);
  // const [item, setItem] = useState(layerList);
  const item = useRecoilValue(layerListState);
  const setModal = useSetRecoilState(modalState);

  const handlePageChange = (page) => {
    setPage(page);
  }
  const totalCount = item.length;

  return(
    <>
      <div className="leftPanel">
        <Scrollbar style={{ width: '100%', height: 'calc(100% - 60px)' }}>
          <div className='btn-wrap'>
            <button className="upload-btn" onClick={ (e) => {setModal(prev => !prev); e.stopPropagation()} }>
              업로드
            </button>
          </div>
          <div className='item-list'>
            {
              item.slice((page - 1) * 8, page * 8).map((layer, index) => 
                <LayerList 
                  key={ layer.layerId }
                  layer={ layer }
                  index={ index }
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
const layerFileName = layer.fileName;
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
  const progress = useRecoilValue(progressState);
  const isProgress = useRecoilValue(isProgressState);

  // file download
  const downloadHandler = (fileName) => {
    const storage = getStorage(app);
    getDownloadURL(ref(storage, `images/${fileName}`))
      .then((url) => {
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = (e) => {
          console.log(e);
          console.log(xhr.response);
        };
        xhr.open('GET', url);
        xhr.send();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  return(
    <div className="layer_box" onClick={getOrthoPhotoHandler}>
      <div className="layer_title">{layerName}</div>
      <div className="layer_address">{layerAdress}</div>
      <div className="layer_btn_box">
        {/* <button className="layer_btn" onClick={ (e) => {setModal(prev => !prev); e.stopPropagation()} }>
          업로드
        </button> */}
        
        <button className="layer_btn" onClick={ (e) => { e.stopPropagation(); downloadHandler(layerFileName) } }>
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
        {
          isProgress === layerId &&
            <div className='progressbar'>
               <ProgressBar 
                completed={ progress }
                maxCompleted={100}
               />
            </div>
        }
        
    </div>
  )
}

 // const downloadHandler = (index) => {
  //   setDownloadIndex(index);
  // }

  // useEffect(() => {
  //   if(downloadIndex)
  //     intervalRef.current = setInterval(() => {
  //       setCompleted(completed => {
  //         if (completed === 100) {
  //           clearInterval(intervalRef.current);
  //           return completed;
  //         } else {
  //           return completed + 10;
  //         }
  //       });
  //     }, 1000);
    
  //   return () => clearInterval(intervalRef.current);
  // }, [downloadIndex]);