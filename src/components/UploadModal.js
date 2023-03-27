import { useRecoilState, useSetRecoilState } from "recoil";
import { isProgressState, layerListState, modalState, progressState } from "../store/common";
import "../scss/main.css"
import { app, storage } from "../api/firebase";
import { getDownloadURL, getStorage, ref, uploadBytes, uploadBytesResumable } from "firebase/storage";
import { useState } from "react";
import ProgressBar from "@ramonak/react-progress-bar";

const UploadModal = () => {

  const setIsOpen = useSetRecoilState(modalState);
  // const [progress, setProgress] = useState(0);
  const [progress, setProgress] = useRecoilState(progressState);
  const [layerList, setLayerList] = useRecoilState(layerListState);
  const setIsProgress = useSetRecoilState(isProgressState);
  // const [file, setFile] = useState(null);
  // const imgRef = useRef(null);

  const closeModal = () => {
    setIsOpen(false);
  }
  
  const onChangeFileInput = (e) => {
    const file = e.target.files;
    const storage = getStorage(app);
    const fileRef = ref(storage, `images/${file[0].name}`);
    const uploadTask = uploadBytesResumable(fileRef, file[0]);
    let init = 0;
    uploadTask.on("state_changed",
      (snapshot) => {
        if(!init) {
          setIsProgress(true);
          const copy = [...layerList];
          const newLayer = {
            layerId: new Date(),
            name: 'test',
            address: 'test',
            bounds: [
              127.5152301916176,
              37.49228282851802,
              127.51810227080813,
              37.494589190964874
            ],
          }
          copy.unshift(newLayer);
          setLayerList(copy);
          init = 1;
        }
        const progress_ = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgress(progress_);
      },
      (err) => {
        console.log(err);
      },
      (complete) => {
        setIsProgress(false);
      }
    );
  };


  const uploadFile_FB = async(e) => {
    e.preventDefault();

    console.log("보류")
    // const imageFile = e.target.files;
    // console.log('imageFile: ', imageFile);
    
  }


  return(
    <div className="wrap" onClick={ closeModal }>
      <div className="modal" onClick={ (e) => { e.stopPropagation() } }>
        {/* <form onSubmit={ uploadFile_FB }> */}
          <input 
          type="file" 
          accept="image/*"
          // ref={imgRef} 
          onChange={ onChangeFileInput } 
          required/>
          <button type="submit">업로드</button>
        {/* </form> */}
        {/* <ProgressBar 
        completed={ progress }
        maxCompleted={100}
        /> */}

        {/* { imageUrl && 
          <img src={ imageUrl } alt="firebase 업로드 imageURL"
               width={200}
               height={200}
          />
        } */}
      </div>
    </div>
  )
}

export default UploadModal;