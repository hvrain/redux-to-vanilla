import { createStore } from './core/createStore';

const initState = {
  items: [
    {
      id: 0,
      value: 10,
      active: true,
    }
  ],
}

const SET_A = 'SET_A';
const SET_B = 'SET_B';
const INPUT_NUMBER = 'INPUT_NUMBER';

export const store = createStore((state = initState, action = {}) => {
  let { items } = state;
  switch (action.type) {
    case INPUT_NUMBER:
      items = [
        ...items,
        { id: action.payload.id, value: action.payload.value, active: true }
      ]
      return {
        ...state,
        items
      }
    default:
      return state;
  }
})

export const inputNumber = (payload) => ({ type: INPUT_NUMBER, payload });
export const setA = (payload) => ({ type: SET_A, payload });
export const setB = (payload) => ({ type: SET_B, payload });