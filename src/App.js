import "./scss/main.css"
import 로고 from "./asset/logo-komapper.png"
import Map from "./components/Map";
import LeftPanel from "./components/LeftPanel";
import { useState } from "react";
import LoginModal from "./components/LoginModal";
import UploadModal from "./components/UploadModal";
import { useRecoilValue } from "recoil";
import { modalState } from "./store/common";

function App() {

  const [loginModal, setLoginModal] = useState(false);
  const loginHandler = () => {
    setLoginModal(true);
  }
  const modalIsOpen = useRecoilValue(modalState);
  console.log('modalIsOpen: ', modalIsOpen);

  return (
    <div className="container">
    {/* header 부분입니다 */}
      <div className="header">
        <div className="header_logo">
          <img src={로고} alt="(주)코매퍼 로고" width={"150"} height={"25.34"}/>
        </div>
        <span className="header_version">for LAND</span>
        <div className="login">
          <span onClick={loginHandler}>LOGIN</span>
        </div>
      </div>

    {/* left panel & 메인지도 부분입니다 */}
      <div className="systemContainer">
        <div className="leftPanelContainer">
          <div className="leftPanelTab"></div>
          <div className="leftPanelMain">
            
          {/* LeftPanel 컴포넌트 */}
            <LeftPanel />
          </div>
        </div>
        <div className="map">

        {/* GoogleMap 컴포넌트 */}
          {/* <Map /> */}
        </div>
      </div>

    {/* 로그인 모달 컴포넌트 */}
      {loginModal && <LoginModal setLoginModal={setLoginModal}/>}

    {/* 업로드 모달 컴포넌트 */}
      {modalIsOpen && <UploadModal />}
      
    </div>
  );
}

export default App;
