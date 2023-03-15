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
4. polygon google map에 불러오기

