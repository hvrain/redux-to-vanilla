
import Component from './../core/Component';
import { store, setFilter, deleteAllItems } from './../store';

export default class FilterList extends Component {
  template() {
    const { isFilter } = store.getState();
    return `
      <div>${isFilter}</div>
      <ul>
        <button class="filterBtn" data-is-filter="all">전체 보기</button>
        <button class="filterBtn" data-is-filter="active">활성 보기</button>
        <button class="filterBtn" data-is-filter="inactive">비활성 보기</button>
      </ul>
      <button class='deleteAllBtn'>모두 삭제</button>
    `
  }

  setEvent() {
    this.addEvent('click', '.filterBtn', ({ target }) => {
      const { isFilter } = target.dataset;
      store.dispatch(setFilter({ isFilter }));
    })
    this.addEvent('click', '.deleteAllBtn', () => {
      store.dispatch(deleteAllItems());
    })
  }
}