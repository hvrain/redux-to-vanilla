import { observe } from "./Observe";

export default class Component {
  $target;
  $props;
  $state;
  $events = new Set();
  $subcomponents = [];
  
  constructor(target, props) {
    this.$target = target;
    this.$props = props;
    this.setup();
    // console.log(this.$target.className, 'setup1');
    this.setEvent();
  }

  setup() {
    // console.log(this.$target.className, 'setup');
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
    let fn = (event) => {
      if (!isTarget(event.target)) return false;
      callback(event);
    }
    this.$target.addEventListener(type, fn);
    this.$events.add({ type, fn });
  }
  removeAllEvent() {
    this.$events.forEach(({ type, fn }) => this.$target.removeEventListener(type, fn));
    this.$subcomponents.forEach((subcomponent) =>
      subcomponent.$events.forEach(({ type, fn }) => {
        subcomponent.$target.removeEventListener(type, fn)
      })
    );
  }
}