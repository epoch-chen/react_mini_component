export interface IState {
  time: number;
}

export class MonitorClickEvent {
  constructor(state: IState) {
    this.init();
    this.time = state.time || 100;
  }
  private time: number;
  public mousePosition: { x: number; y: number } | null;
  getClickPosition = (e: MouseEvent) => {
    this.mousePosition = {
      x: e.pageX,
      y: e.pageY,
    };
    // 100ms 内发生过点击事件，则从点击位置动画展示
    // 否则直接 zoom 展示
    // 这样可以兼容非点击方式展开
    setTimeout(() => {
      this.mousePosition = null;
    }, this.time);
  };

  // 只有点击事件支持从鼠标位置动画展开
  init() {
    document.documentElement.addEventListener('click', this.getClickPosition, true);
  }
}

function getScroll(w: Window, top?: boolean): number {
  let ret = w[`page${top ? 'Y' : 'X'}Offset`];
  const method = `scroll${top ? 'Top' : 'Left'}`;
  if (typeof ret !== 'number') {
    const d = w.document;
    // @ts-ignore
    ret = d.documentElement[method];
    if (typeof ret !== 'number') {
      // @ts-ignore
      ret = d.body[method];
    }
  }
  return ret;
}

type CompatibleDocument = {
  parentWindow?: Window;
} & Document;

export function getOffset(el: Element) {
  const rect = el.getBoundingClientRect();
  const pos = {
    left: rect.left,
    top: rect.top,
  };
  const doc = el.ownerDocument as CompatibleDocument;
  const w = doc.defaultView || doc.parentWindow;
  pos.left += getScroll(w);
  pos.top += getScroll(w, true);
  return pos;
}
