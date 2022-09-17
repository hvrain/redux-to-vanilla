
import Component from './../core/Component';
import { store, deleteItem, toggleItem } from '../store';

export default class ItemList extends Component {
  get filteredItems() {
    const { isFilter, items } = store.getState();
    return items.filter(item =>
      (item.active && isFilter === "active")
      || (!item.active && isFilter === 'inactive')
      || isFilter === 'all');
  }

  template() {
    const items = this.filteredItems;
    return `
      <ul>
        ${items.map(item => `
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
        ${items.length !== 0
          ? items.map(item => item.value).reduce((prev, curr) => prev + curr)
          : 0}
      </div>
    `
  }

  setEvent() {
    this.addEvent('click', '.deleteBtn', ({ target }) => {
      store.dispatch(deleteItem({ id: Number(target.closest('[data-id]').dataset.id) }));
    })
    this.addEvent('click', '.toggleBtn', ({ target }) => {
      store.dispatch(toggleItem({ id: Number(target.closest('[data-id]').dataset.id) }));
    })
  }
}