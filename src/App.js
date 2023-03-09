import "./scss/main.css"
import 로고 from "./asset/logo-komapper.png"
import Map from "./components/Map";

function App() {
  return (
    <div className="container">
    {/* header 부분입니다 */}
      <div className="header">
        <div className="header_logo">
          <img src={로고} alt="(주)코매퍼 로고" width={"150"} height={"25.34"}/>
        </div>
        <div className="header_version">for LAND</div>
      </div>

    {/* left panel & 메인지도 부분입니다 */}
      <div className="systemContainer">
        <div className="leftPanelContainer">
          <div className="leftPanelTab"></div>
          <div className="leftPanelMain"> </div>
        </div>
        <div className="map">

        {/* GoogleMap 컴포넌트 */}
          <Map />
        </div>
      </div>
    </div>
  );
}

export default App;
