import React, { useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import Mask from './mask';
import Content, { ContentRef } from './content';
import './asset/index.less';
import { MonitorClickEvent } from './util';

export interface IDialog {
  visible: boolean;
  style?: React.CSSProperties;
  center?: boolean;
  mask?: boolean;
  children?: React.ReactNode;
  onClose?: (e: React.SyntheticEvent) => void;
  width?: string;
  height?: string;
  afterClose?: () => void;
  focusTriggerAfterClose?: boolean;
  keyboard?: boolean;
  maskClosable?: boolean;
}

export interface IState {
  animationVisible: boolean;
}

const monitorClick = new MonitorClickEvent({ time: 100 });
// class Dialog<P> extends React.Component<IDialog & P, IState> {
//   private prefixCls: string;

//   private el: HTMLDivElement;

//   private wrapperRef: React.Ref<HTMLDivElement>;
//   private contentRef: React.Ref<ContentRef>;
//   private lastOutSideActiveElementRef: React.Ref<HTMLElement>
//   constructor(props: IDialog & P) {
//     super(props);
//     this.prefixCls = 'custom-dialog';
//     this.el = document.createElement('div');
//     this.el.className = 'dialog-root';
//     this.wrapperRef = React.createRef<HTMLDivElement>();
//     this.contentRef = React.createRef<ContentRef>();

//     this.state = {
//       animationVisible: props.visible,
//     };
//   }

//   componentDidMount() {
//     document.body.appendChild(this.el);
//   }

//   componentWillUnmount() {
//     document.body.removeChild(this.el);
//   }

//   onVisibleChanged = (newVisible: boolean) => {
//     const { mask, afterClose } = this.props;

//     if (newVisible) {
//       // Try to focus
//       if (!contains(wrapperRef.current, document.activeElement)) {
//         lastOutSideActiveElementRef.current = document.activeElement as HTMLElement;
//         contentRef.current?.focus();
//       }
//     } else {
//       // Clean up scroll bar & focus back
//       this.setState({ animationVisible: false });

//       if (mask && lastOutSideActiveElementRef.current && focusTriggerAfterClose) {
//         try {
//           lastOutSideActiveElementRef.current.focus({ preventScroll: true });
//         } catch (e) {
//           // Do nothing
//         }
//         lastOutSideActiveElementRef.current = null;
//       }

//       // Trigger afterClose only when change visible from true to false
//       if (this.state.animationVisible) {
//         afterClose?.();
//       }
//     }
//   };

//   onContentMouseDown() {}
//   onContentMouseUp() {}

//   onDialogClose(e: React.SyntheticEvent) {
//     this.props.onClose?.(e);
//   }
//   render() {
//     const { mask = true, visible, style, center, children, onClose, width, height } = this.props;
//     const wrapCls = `${this.prefixCls}-wrap`;
//     // const contentCls = `${this.prefixCls}-content`;
//     const defaultStyle = { width: '400px' };
//     const contentStyle = { ...defaultStyle, ...style };
//     console.log(monitorClick.mousePosition, 'position');

//     const dialogDom = (
//       <>
//         <Mask prefixCls={this.prefixCls} visible={mask && visible} />
//         <div
//           style={{ display: visible ? undefined : 'none' }}
//           ref={this.wrapperRef}
//           tabIndex={-1}
//           className={classnames(wrapCls, {
//             [`${wrapCls}-center`]: !!center,
//           })}
//           role="dialog"
//         >
//           <Content
//             ref={this.contentRef}
//             onMouseUp={this.onContentMouseUp}
//             onMouseDown={this.onContentMouseDown}
//             visible={visible}
//             // className={classnames(contentCls)}
//             style={contentStyle}
//             prefixCls={this.prefixCls}
//             mousePosition={monitorClick.mousePosition}
//             onVisibleChanged={this.onVisibleChanged}
//             width={width}
//             height={height}
//             onClose={onClose}
//           >
//             {children}
//           </Content>
//         </div>
//       </>
//     );
//     return ReactDOM.createPortal(dialogDom, this.el);
//   }
// }
function Dialog<P>({
  visible,
  focusTriggerAfterClose = true,
  onClose,
  mask = true,
  style,
  center,
  width,
  height,
  children,
  afterClose,
  keyboard,
  maskClosable = true,
}: IDialog & P) {
  const prefixCls = 'custom-dialog';
  const rootEl = useRef<HTMLDivElement>();

  const lastOutSideActiveElementRef = useRef<HTMLElement>();
  const wrapperRef = useRef<HTMLDivElement>();
  const contentRef = useRef<ContentRef>();

  const [animatedVisible, setAnimatedVisible] = React.useState(visible);

  React.useEffect(() => {
    if (!rootEl.current) {
      const el = document.createElement('div');
      el.className = 'dialog-root';
      rootEl.current = el;
      document.body.appendChild(el);
    }
    return () => {
      document.body.removeChild(rootEl.current);
    };
  }, []);

  const onVisibleChanged = (newVisible: boolean) => {
    if (newVisible) {
      // Try to focus
      if (!wrapperRef.current?.contains(document.activeElement)) {
        lastOutSideActiveElementRef.current = document.activeElement as HTMLElement;
        contentRef.current?.focus();
      }
    } else {
      // Clean up scroll bar & focus back
      setAnimatedVisible(false);

      if (mask && lastOutSideActiveElementRef.current && focusTriggerAfterClose) {
        try {
          lastOutSideActiveElementRef.current.focus({ preventScroll: true });
        } catch (e) {
          // Do nothing
        }
        lastOutSideActiveElementRef.current = null;
      }

      // Trigger afterClose only when change visible from true to false
      if (animatedVisible) {
        afterClose?.();
      }
    }
  };
  function onWrapperKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    console.log(e.keyCode);
    if (keyboard && e.keyCode === 27) {
      e.stopPropagation();
      onDialogClose(e);
      return;
    }

    // // keep focus inside dialog
    if (visible) {
      if (e.keyCode === 9) {
        contentRef.current.changeActive(!e.shiftKey);
      }
    }
  }

  const onDialogClose = (e: React.SyntheticEvent) => {
    onClose?.(e);
  };
  useEffect(() => {
    if (visible) {
      setAnimatedVisible(true);
    }
    return () => {};
  }, [visible]);
  const wrapCls = `${prefixCls}-wrap`;
  // const contentCls = `${this.prefixCls}-content`;
  const defaultStyle = { width: '400px' };
  const contentStyle = { ...defaultStyle, ...style };
  console.log(monitorClick.mousePosition, 'position');
  // >>> Content
  const contentClickRef = useRef(false);
  const contentTimeoutRef = useRef<NodeJS.Timeout>();

  // We need record content click incase content popup out of dialog
  const onContentMouseDown: React.MouseEventHandler = () => {
    clearTimeout(contentTimeoutRef.current);
    contentClickRef.current = true;
  };

  const onContentMouseUp: React.MouseEventHandler = () => {
    contentTimeoutRef.current = setTimeout(() => {
      contentClickRef.current = false;
    });
  };

  // >>> Wrapper
  // Close only when element not on dialog
  let onWrapperClick: (e: React.SyntheticEvent) => void = null;
  if (maskClosable) {
    onWrapperClick = (e) => {
      if (contentClickRef.current) {
        contentClickRef.current = false;
      } else if (wrapperRef.current === e.target) {
        onDialogClose(e);
      }
    };
  }
  const dialogDom = (
    <>
      <Mask prefixCls={prefixCls} visible={mask && visible} />
      <div
        onKeyDown={onWrapperKeyDown}
        style={{ display: animatedVisible ? undefined : 'none' }}
        ref={wrapperRef}
        tabIndex={-1}
        className={classnames(wrapCls, {
          [`${wrapCls}-center`]: !!center,
        })}
        role="dialog"
        onClick={onWrapperClick}
      >
        <Content
          ref={contentRef}
          onMouseUp={onContentMouseUp}
          onMouseDown={onContentMouseDown}
          visible={visible}
          // className={classnames(contentCls)}
          style={contentStyle}
          prefixCls={prefixCls}
          mousePosition={monitorClick.mousePosition}
          onVisibleChanged={onVisibleChanged}
          width={width}
          height={height}
          onClose={onClose}
        >
          {children}
        </Content>
      </div>
    </>
  );
  return rootEl.current ? ReactDOM.createPortal(dialogDom, rootEl.current) : null;
}
export default Dialog;
