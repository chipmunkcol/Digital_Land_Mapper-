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
