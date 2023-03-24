1. google map

2. geojson google map에 불러오기
  -  Q. geojson 값을 width heigth bounds-box값을 onIdle 때마다 </br>
  호출하지 말고 docs 처럼 한번만 호출해도 괜찮지 않을까?
   => 어림도 없음 이미지 장당 10GB고 그럼 geojson 쓰는 의미가 없넹
  - 나머지 api는 호출시 인증 필요해서 login 구현

3. crypto로 login구현
  - 백엔드 쪽 코드가 crypto로 비교 확인이어서 프론트도 crypto 썼는데 오래되기도 했고 환경 설정 문제 때문에 react에서는 사용하기 매~우 어려웠음.. crypto browserify 해보다가 실력이슈로 실패함
  결국 react 다운그레이드로 해결했는데 다음에 기회되면 최신 업데이트 된 crypto.js 사용이 좋아보임 

4. proxy 설정 (개발시 Cors 에러방지 )
  - http-proxy-middleware 설치해서 하는데 에러 해결이 안돼서 보니까 기본 포트 설정이 3000 이어서 안됨.. 아래 코드 package.json에 추가!
```
"scripts": {
  "start": "set PORT=80 && react-scripts start",
}
```
5. polygon google map에 불러오기
  - 불러오는건 어렵지 않았는데 refresh 시켜주는데 혼났다.. 
  - 편집모드로 바꿀때 editable, draggable 객체를 바꿀껀지 새로 그려줄건지에 따라 코드차이가 나는거 같은데 고민해보자
```
let loadArr = [];

for 문 {
const polygonLoad = new window.google.maps.Polygon({
       map: map,
       paths: bounds,
       strokeColor: "#000000",
       strokeWeight: 1,
       fillColor: color,
       fillOpacity: 1,
       zIndex: 900,
       editable: dm,
       draggable: dm,
     })
     loadArr.push({ // 반복문으로 각 polygon을 배열에 담고
      id: i,
      polygonLoad
     })
}

// refresh 해줄 때 마다 모두 지우고 다시 만들었다.

function cleanUpPolygonLoad() {
  if(loadArr.length !== 0) {  
    for (let i=0; i<loadArr.length; i++) {
      loadArr[i].polygonLoad.setMap(null);
    }
    loadArr = [];
  }
}
```

=> setOptions 쓰니까 알아서 랜더링 시켜주길래 객체 바꾸는걸로 바꿈 근데 하다가 for문으로 안되던게 forEach문 쓰니까 됨 뭐지?
(1) 동기(sync), 비동기(async)의 차이

for는 동기방식이기 때문에 for문 안에 오류가 나면 에러 위치 이후의 이벤트들은 동작하지 않고 멈춰버린다.

foreach는 ES6 문법으로 콜백함수를 뿌린다. 비동기 방식으로 진행되기 때문에 foreach문 안에 에러가 발생하더라도 멈추지 않고 동작한다. 대신 원하는 순서와는 다르게 프로그램이 동작할 수 있다. 라고 하는데 잘 느낌이 안옴

```
const editPolygonHandler = (dm) => {
      loadArr.forEach((load, index) => {
        load.polygonLoad.setOptions({
          editable: dm,
          draggable: dm,
        })
      });
      buildArr.forEach((build, index) => {
        build.polygonBuild.setOptions({
          editable: dm,
          draggable: dm,
        })
      });
  }
```
6. react js pagination

7. Chat GPT
  - 세상에나... google map docs 구려서 찾으려고 그렇게 노력하던 메서드들 gpt가 한번에 정리해줌
  - Q. react-google-maps/api 에서 polygon에 사용하는 메서드를 모두 알려줘
  - A. react-google-maps/api 패키지에서 제공하는 Polygon 컴포넌트에서 사용할 수 있는 메서드들은 다음과 같습니다:
      getBounds(): 폴리곤의 경계 영역을 반환합니다.
      getDraggable(): 폴리곤이 드래그 가능한지 여부를 반환합니다.
      getEditable(): 폴리곤이 편집 가능한지 여부를 반환합니다.
      getMap(): 폴리곤이 추가된 지도 인스턴스를 반환합니다.
      getPath(): 폴리곤의 경로를 반환합니다.
      getPaths(): 다각형의 경로 배열을 반환합니다.
      getVisible(): 폴리곤이 보이는지 여부를 반환합니다.
      setDraggable(draggable: boolean): 폴리곤의 드래그 가능 여부를 설정합니다.
      setEditable(editable: boolean): 폴리곤의 편집 가능 여부를 설정합니다.
      setMap(map: google.maps.Map | null): 폴리곤을 추가할 지도 인스턴스를 설정합니다. null 을 지정하면 폴리곤을 지도에서 제거합니다.
      setOptions(options: PolygonOptions): 폴리곤의 옵션을 설정합니다.
      setPath(path: LatLng[] | MVCArray<LatLng>): 폴리곤의 경로를 설정합니다.
      setPaths(paths: LatLng[][] | MVCArray<LatLng[]>): 다각형의 경로 배열을 설정합니다.
      setVisible(visible: boolean): 폴리곤의 보이는 여부를 설정합니다.
      참고로, 이 메서드들은 Polygon 컴포넌트의 인스턴스 메서드입니다. react-google-maps/api 패키지에서 제공하는 usePolygon() 훅을 사용하여 함수 컴포넌트에서 폴리곤을 생성하는 경우에는 이러한 메서드들을 직접 호출할 수 없습니다. 대신, ref 속성을 사용하여 폴리곤의 인스턴스에 접근하여 메서드를 호출해야 합니다.

