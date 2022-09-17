
import Component from "./core/Component";
import { store, inputNumber } from "./store";
import ItemList from './components/ItemList';
import FilterList from './components/FilterList';


export default class App extends Component {
  
  template() {
    return `
      <header>
        <input class="inputNumber" placeholder="숫자를 입력하세요."/>
        <button class="inputBtn">입력</button>
      </header>
      <main class="itemList"></main>
      <footer class="filterList"></footer>
      <button class="clearEvent">이벤트 삭제</button>
    `
  }

  mounted() {
    this.$subcomponents.push(new ItemList(this.$target.querySelector('.itemList')));
    this.$subcomponents.push(new FilterList(this.$target.querySelector('.filterList')));
  }

  setEvent() {
    this.addEvent('keyup', '.inputNumber', ({ key, target }) => {
      if (key !== 'Enter') return;
      const value = target.value === '' ? null : Number(target.value);
      if (!value && value !== 0) return;
      store.dispatch(inputNumber({value}));
      target.value = '';
    })
    this.addEvent('click', '.inputBtn', () => {
      const inputTag = this.$target.querySelector('.inputNumber');
      const value = Number(inputTag.value);
      store.dispatch(inputNumber({value}));
      inputTag.value = '';
    })
    this.addEvent('click', '.clearEvent', () => {
      this.removeAllEvent();
    })
  }
}