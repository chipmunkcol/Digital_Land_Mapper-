import '../scss/main.css'
import { useRecoilValue, useSetRecoilState } from "recoil";
import { centerState, drawingManager, isProgressState, layerListState, modalState, progressState } from "../store/common";
import { useEffect, useRef, useState } from 'react';
import Pagination from 'react-js-pagination';
import { Scrollbar } from 'react-scrollbars-custom';
import ProgressBar from '@ramonak/react-progress-bar';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';
import { app } from '../api/firebase';
import { useInView } from 'react-intersection-observer';

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
              item.slice((page - 1) * 10, page * 10).map((layer, index) => 
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
        itemsCountPerPage={10}
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



let menubarIndex = null;
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

  
  // menubar (상세보기 / 다운로드 / 편집)
  const [isMenubar, setIsMenubar] = useState(false);
  const handleCloseMenubar = () => {
    if(isMenubar) {
      setIsMenubar(false);
    } 
  }
  const handleToggleMenubar = (index) => {
    if(isMenubar && index === menubarIndex) {
      setIsMenubar(false);
    } 
    if(!isMenubar) {
      setIsMenubar(true);
    }
    menubarIndex = index;
  }

  // intersection observer
  const obsRef = useRef(null);
  const inViewRef = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(obsHandler, { threshold: 0.95 });
    if(obsRef.current) {
      observer.observe(obsRef.current);
      console.log('obsRef: ', obsRef.current);
    }
    return () => {
      observer.disconnect();
    }
  }, [])

  const obsHandler = (entries) => {
    entries.forEach((entry) => {
      if(entry.isIntersecting) {
        inViewRef.current = true;
        console.log('inViewRef: ', inViewRef.current);
      } else {
        inViewRef.current = false;
        console.log('inViewRef: ', inViewRef.current);
      }
    })
    
  }

  return(
    <div className="layer_box" onClick={() => { getOrthoPhotoHandler(); handleCloseMenubar()}}>
      <div className="layer_title">{layerName}</div>
      <div className="layer_address">{layerAdress}</div>
      <i className={`menubar ${index === menubarIndex ? 'active' : ''}`} alt="상세보기/다운로드/편집menubar"
         onClick={ (e) => { e.stopPropagation(); handleToggleMenubar(index); } }
      />

      <div className="inView-check"
           ref={obsRef}
           >
      {
        isMenubar && index === menubarIndex &&
          <div className={ `menubar-wrap ${ !inViewRef.current ? 'last' : '' }` }>
              <div className="menubar-btn" >상세보기</div>
              <div className="menubar-btn" >다운로드</div>
              <div className="menubar-btn-last" >편 집</div>
          </div>
      }
      </div>

      <div className="layer_btn_box">
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


  // file download (CORS 문제로 인해 보류)
  // const downloadHandler = (fileName) => {
  //   const storage = getStorage(app);
  //   getDownloadURL(ref(storage, `images/${fileName}`))
  //     .then((url) => {
  //       const xhr = new XMLHttpRequest();
  //       xhr.responseType = 'blob';
  //       xhr.onload = (e) => {
  //         console.log(e);
  //         console.log(xhr.response);
  //       };
  //       xhr.open('GET', url);
  //       xhr.send();
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     })
  // }