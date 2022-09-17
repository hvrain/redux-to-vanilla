import { observe } from "./Observe";

export default class Component {
  $target;
  $props;
  $state;
  
  constructor(target, props) {
    this.$target = target;
    this.$props = props;
    this.setup();
    this.render();
    this.setEvent();
    this.mounted();
  }

  setup() {
    observe(() => {
      this.render();
      this.mounted();
    })
  }
  template() { return '' }
  render() { this.$target.innerHTML = this.template() }
  setEvent() { }
  mounted() { }
  addEvent(type, selector, callback) { 
    const isTarget = (target) => target.closest(selector);
    this.$target.addEventListener(type, event => {
      if (!isTarget(event.target)) return false;
      callback(event);
    })
  }
}