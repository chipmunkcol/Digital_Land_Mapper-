import { atom, selector } from "recoil";

const initialState = {
  target: { lat: 35.287655241484075, lng: 126.68514455541904,  },
  layerId: 'a785-cb1f-1aedb9cc-4ef318c1',
}

export const centerState = atom({
  key:'centerState',
  default: initialState,
})

export const mapState = atom({
  key:'mapState',
  default: {},
  dangerouslyAllowMutability: true,
})

export const drawingManager = atom({
  key:'drawingManager',
  default: false,
})

export const modalState = atom({
  key: 'modalState',
  default: false,
})

export const progressState = atom({
  key: 'progressState',
  default: 0,
})

export const isProgressState = atom({
  key: 'isProgressState',
  default: null,
})

export const testState = atom({
  key: 'testState',
  default: 1
});

export const testResultState = atom({
  key: 'testResultState',
  default: 0
})

export const testState2 = selector({
  key:'testState2',
  get: ({ get }) => {
    // return get(testState) * 2;
  },
  set: ({get, set}) => {
    const a = get(testState);
    const testA = a + 10;
    set(testResultState, testA);
  }
})

















export const layerListState = atom({
  key: 'layerListState',
  default: [{
    layerId: '1d12-35ba-ee15f434-52bb0e7e', 
    name: '양평 3지구', 
    address: '경기도 양평군', 
    bounds: [
      127.5152301916176,
      37.49228282851802,
      127.51810227080813,
      37.494589190964874
    ],
  },
  {layerId: 'a785-cb1f-1aedb9cc-4ef318c13', name: '평림댐1', address: '전라남도 장성군', bounds: [126.68159215524777,35.28579793376968,126.68869695559032,35.28951254919848]},
  {layerId: 'a785-cb1f-1aedb9cc-4ef318c14', name: '평림댐1', address: '전라남도 장성군', bounds: [126.68159215524777,35.28579793376968,126.68869695559032,35.28951254919848]},
  {layerId: 'a785-cb1f-1aedb9cc-4ef318c15', name: '평림댐1', address: '전라남도 장성군', bounds: [126.68159215524777,35.28579793376968,126.68869695559032,35.28951254919848]},
  {layerId: 'a785-cb1f-1aedb9cc-4ef318c16', name: '평림댐2', address: '전라남도 장성군', bounds: [126.68159215524777,35.28579793376968,126.68869695559032,35.28951254919848]},
  {layerId: 'a785-cb1f-1aedb9cc-4ef318c17', name: '평림댐2', address: '전라남도 장성군', bounds: [126.68159215524777,35.28579793376968,126.68869695559032,35.28951254919848]},
  {layerId: 'a785-cb1f-1aedb9cc-4ef318c18', name: '평림댐2', address: '전라남도 장성군', bounds: [126.68159215524777,35.28579793376968,126.68869695559032,35.28951254919848]},
  {layerId: 'a785-cb1f-1aedb9cc-4ef318c19', name: '평림댐2', address: '전라남도 장성군', bounds: [126.68159215524777,35.28579793376968,126.68869695559032,35.28951254919848]},
  {layerId: 'a785-cb1f-1aedb9cc-4ef318c10', name: '평림댐2', address: '전라남도 장성군', bounds: [126.68159215524777,35.28579793376968,126.68869695559032,35.28951254919848]},
  {layerId: 'a785-cb1f-1aedb9cc-4ef318c111', name: '평림댐2', address: '전라남도 장성군', bounds: [126.68159215524777,35.28579793376968,126.68869695559032,35.28951254919848]},
  {layerId: 'a785-cb1f-1aedb9cc-4ef318c112', name: '평림댐2', address: '전라남도 장성군', bounds: [126.68159215524777,35.28579793376968,126.68869695559032,35.28951254919848]},
  {layerId: 'a785-cb1f-1aedb9cc-4ef318c113', name: '평림댐3', address: '전라남도 장성군', bounds: [126.68159215524777,35.28579793376968,126.68869695559032,35.28951254919848]},
  {layerId: 'a785-cb1f-1aedb9cc-4ef318c114', name: '평림댐3', address: '전라남도 장성군', bounds: [126.68159215524777,35.28579793376968,126.68869695559032,35.28951254919848]},
  {layerId: 'a785-cb1f-1aedb9cc-4ef318c115', name: '평림댐3', address: '전라남도 장성군', bounds: [126.68159215524777,35.28579793376968,126.68869695559032,35.28951254919848]},
  {layerId: 'a785-cb1f-1aedb9cc-4ef318c116', name: '평림댐3', address: '전라남도 장성군', bounds: [126.68159215524777,35.28579793376968,126.68869695559032,35.28951254919848]},
  {layerId: 'a785-cb1f-1aedb9cc-4ef318c117', name: '평림댐3', address: '전라남도 장성군', bounds: [126.68159215524777,35.28579793376968,126.68869695559032,35.28951254919848]},
  {layerId: 'a785-cb1f-1aedb9cc-4ef318c118', name: '평림댐3', address: '전라남도 장성군', bounds: [126.68159215524777,35.28579793376968,126.68869695559032,35.28951254919848]},
  {layerId: 'a785-cb1f-1aedb9cc-4ef318c119', name: '평림댐3', address: '전라남도 장성군', bounds: [126.68159215524777,35.28579793376968,126.68869695559032,35.28951254919848]},
  {layerId: 'a785-cb1f-1aedb9cc-4ef318c120', name: '평림댐4', address: '전라남도 장성군', bounds: [126.68159215524777,35.28579793376968,126.68869695559032,35.28951254919848]},
  {layerId: 'a785-cb1f-1aedb9cc-4ef318c121', name: '평림댐4', address: '전라남도 장성군', bounds: [126.68159215524777,35.28579793376968,126.68869695559032,35.28951254919848]},
  {layerId: 'a785-cb1f-1aedb9cc-4ef318c122', name: '평림댐4', address: '전라남도 장성군', bounds: [126.68159215524777,35.28579793376968,126.68869695559032,35.28951254919848]},
  {layerId: 'a785-cb1f-1aedb9cc-4ef318c123', name: '평림댐4', address: '전라남도 장성군', bounds: [126.68159215524777,35.28579793376968,126.68869695559032,35.28951254919848]},
  {layerId: 'a785-cb1f-1aedb9cc-4ef318c124', name: '평림댐4', address: '전라남도 장성군', bounds: [126.68159215524777,35.28579793376968,126.68869695559032,35.28951254919848]},
  {layerId: 'a785-cb1f-1aedb9cc-4ef318c125', name: '평림댐4', address: '전라남도 장성군', bounds: [126.68159215524777,35.28579793376968,126.68869695559032,35.28951254919848]},
  {layerId: 'a785-cb1f-1aedb9cc-4ef318c126', name: '평림댐4', address: '전라남도 장성군', bounds: [126.68159215524777,35.28579793376968,126.68869695559032,35.28951254919848]},
  ]
})
