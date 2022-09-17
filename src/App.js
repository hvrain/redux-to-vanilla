
import Component from "./core/Component";
import { store, inputNumber, deleteItem } from "./store";


export default class App extends Component {
  
  template() {
    const state = store.getState();
    return `
      <input class="inputNumber" placeholder="숫자를 입력하세요."/>
      <ul>
        ${state.items.map(item => `
          <li data-id="${item.id}">
            ${item.value}
            <button class="toggleBtn" style="color: ${item.active ? '#09f' : '#f90'}">
              ${item.active ? '활성' : '비활성'}
            </button>
            <button class="deleteBtn">삭제</button>
          </li>
        `).join('')}
      </ul>
      <div class="calculator">
        ${state.items.map(item => item.value).reduce((prev, curr) => prev + curr)}
      </div>
      <button class="filterBtn" data-is-filter="all">전체 보기</button>
      <button class="filterBtn" data-is-filter="active">활성 보기</button>
      <button class="filterBtn" data-is-filter="inactive">비활성 보기</button>
    `
  }

  setEvent() {
    console.log('setEvent');
    this.addEvent('keyup', '.inputNumber', ({ key, target }) => {
      if (key !== 'Enter') return;
      store.dispatch(inputNumber({
        value: Number(target.value),
      }));
    })
    this.addEvent('click', '.deleteBtn', ({ target }) => {
      store.dispatch(deleteItem({id: Number(target.closest('[data-id]').dataset.id)}));
    })  
  }
}