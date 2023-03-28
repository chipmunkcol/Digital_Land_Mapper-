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
  {layerId: '41ed-1ec3-cd4e4cf2-2c11d2f0', name: '원효대교', address: '서울특별시 용산구', bounds: [126.95031936324452,37.52878222488751,126.95353484172449,37.531402907484335]},
  {layerId: '7853-328c-a5ece884-4fd77499', name: '양평', address: '경기도 양평군', bounds: [127.52423178801054,37.45882053385269,127.5327248158296,37.46111096894662]},
  {layerId: 'a785-cb1f-1aedb9cc-4ef318c1', name: '평림댐', address: '전라남도 장성군', bounds: [126.68159215524777,35.28579793376968,126.68869695559032,35.28951254919848]},
  {layerId: 'a785-cb1f-1aedb9cc-4ef318c12', name: '더미데이터', address: '더미남도 더미군', bounds: [126.68159215524777,35.28579793376968,126.68869695559032,35.28951254919848]},],
})

export const isProgressState = atom({
  key: 'isProgressState',
  default: null,
})