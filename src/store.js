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

const INPUT_NUMBER = 'INPUT_NUMBER';
const DELETE_ITEM = "DELETE_ITEM";

export const store = createStore((state = initState, action = {}) => {
  const { type, payload } = action;
  let newState = JSON.parse(JSON.stringify(state));
  if (type === INPUT_NUMBER) {
    let { items } = newState;
    const { value } = payload;
    const id = Math.max(0, items.map(item => Number(item.id)).reduce((p, c) => p > c ? p : c) + 1);
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
  return state;
})

export const inputNumber = (payload) => ({ type: INPUT_NUMBER, payload });
export const deleteItem = (payload) => ({ type: DELETE_ITEM, payload });