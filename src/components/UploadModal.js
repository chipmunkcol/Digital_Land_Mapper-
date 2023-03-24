import { useRecoilState, useSetRecoilState } from "recoil";
import { modalState } from "../store/common";
import "../scss/main.css"

const UploadModal = () => {

  const setIsOpen = useSetRecoilState(modalState);
  const closeModal = () => {
    setIsOpen(false);
  }

  return(
    <div className="wrap" onClick={ closeModal }>
      <div className="modal" onClick={ (e) => { e.stopPropagation() } }>
        
      </div>
    </div>
  )
}

export default UploadModal;