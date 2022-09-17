import { createStore } from './core/createStore';

const initState = {
  isFilter: 'all',
  items: [
    {
      id: 0,
      value: 10,
      active: true,
    }
  ],
}

const INPUT_NUMBER = 'INPUT_NUMBER';
const DELETE_ITEM = "DELETE_ITEM";
const TOGGLE_ITEM = "TOGGLE_ITEM";
const SET_FILTER = 'SET_FILTER';
const DELETE_ALL_ITEMS = 'DELETE_ALL_ITEMS';

export const store = createStore((state = initState, action = {}) => {
  const { type, payload } = action;
  let newState = JSON.parse(JSON.stringify(state));
  if (type === INPUT_NUMBER) {
    let { items } = newState;
    const { value } = payload;
    const id = Math.max(-1, items.length !== 0
      ? items.map(item => Number(item.id)).reduce((p, c) => p > c ? p : c) + 1
      : 0);
    items.push({ id, value, active: true });
    return { ...newState, items };
  }
  if (type === DELETE_ITEM) {
    const { id } = payload;
    let {items} = newState;
    const index = items.findIndex(item => item.id === id)
    items.splice(index, 1);
    return { ...newState, items };
  }
  if (type === DELETE_ALL_ITEMS) {
    const items = [];
    return { ...newState, items };
  }
  if (type === TOGGLE_ITEM) {
    const { id } = payload;
    let { items } = newState;
    items = items.map(item => item.id === id ? { ...item, active: !item.active } : item);
    return { ...newState, items };
  }
  if (type === SET_FILTER) {
    const { isFilter } = payload;
    return { ...newState, isFilter };
  }
  return state;
})

export const inputNumber = (payload) => ({ type: INPUT_NUMBER, payload });
export const deleteItem = (payload) => ({ type: DELETE_ITEM, payload });
export const deleteAllItems = (payload) => ({ type: DELETE_ALL_ITEMS, payload });
export const toggleItem = (payload) => ({ type: TOGGLE_ITEM, payload });
export const setFilter = (payload) => ({ type: SET_FILTER, payload });
