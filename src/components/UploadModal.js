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
  const [file, setFile] = useState(null);
  // const imgRef = useRef(null);

  const closeModal = () => {
    setIsOpen(false);
  }
  
  const onChangeFileInput = (e) => {
    setFile(e.target.files[0]);
  };


  const uploadFile_FB = async(e) => {
    e.preventDefault();

    const storage = getStorage(app);
    const fileRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(fileRef, file);
    let My_init = true;
    uploadTask.on("state_changed",
      (snapshot) => {
        if(My_init) {
          setIsOpen(false);

          const copy = [...layerList];
          const newLayer = {
            layerId: String(Math.random()),
            name: 'test',
            address: 'test',
            bounds: [
              127.5152301916176,
              37.49228282851802,
              127.51810227080813,
              37.494589190964874
            ],
            fileName: file.name,
          }
          copy.unshift(newLayer);
          setLayerList(copy);
          My_init = false;

          setIsProgress(newLayer.layerId);
        }
        const progress_ = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgress(progress_);
      },
      (err) => {
        console.log(err);
      },
      (complete) => {
        setIsProgress(false);
        setProgress(complete + '업로드 완료');
      }
    );
  }


  return(
    <div className="wrap" onClick={ closeModal }>
      <div className="modal" onClick={ (e) => { e.stopPropagation() } }>
        <form onSubmit={ uploadFile_FB }>
          <input 
          type="file" 
          accept="image/*"
          onChange={ onChangeFileInput } 
          required/>
          <button type="submit">업로드</button>
        </form>
      </div>
    </div>
  )
}

export default UploadModal;