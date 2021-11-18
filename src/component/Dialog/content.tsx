import * as React from 'react';
import { useRef } from 'react';
import classNames from 'classnames';
import CSSMotion from 'rc-motion';
import type { IDialog } from './index';
import { getOffset } from './util';

const sentinelStyle = { width: 0, height: 0, overflow: 'hidden', outline: 'none' };

export type ContentProps = {
  prefixCls: string;
  onVisibleChanged: (visible: boolean) => void;
  onMouseDown: React.MouseEventHandler;
  onMouseUp: React.MouseEventHandler;
  mousePosition: { x: number; y: number };
  className?: string;
} & IDialog;

export type ContentRef = {
  focus: () => void;
  changeActive: (next: boolean) => void;
};

const Content = React.forwardRef<ContentRef, ContentProps>((props, ref) => {
  const {
    prefixCls,
    style,
    visible,
    width,
    height,
    children,
    onClose,
    onVisibleChanged,
    onMouseDown,
    onMouseUp,
    mousePosition,
    className,
  } = props;

  const sentinelStartRef = useRef<HTMLDivElement>();
  const sentinelEndRef = useRef<HTMLDivElement>();
  const dialogRef = useRef<HTMLDivElement>();

  // ============================== Ref ===============================
  React.useImperativeHandle(ref, () => ({
    focus: () => {
      sentinelStartRef.current?.focus();
    },
    changeActive: (next) => {
      const { activeElement } = document;
      if (next && activeElement === sentinelEndRef.current) {
        sentinelStartRef.current.focus();
      } else if (!next && activeElement === sentinelStartRef.current) {
        sentinelEndRef.current.focus();
      }
    },
  }));

  // ============================= Style ==============================
  const [transformOrigin, setTransformOrigin] = React.useState<string>();
  const contentStyle: React.CSSProperties = {};
  if (width !== undefined) {
    contentStyle.width = width;
  }
  if (height !== undefined) {
    contentStyle.height = height;
  }
  if (transformOrigin) {
    contentStyle.transformOrigin = transformOrigin;
  }

  function onPrepare() {
    const elementOffset = getOffset(dialogRef.current);

    setTransformOrigin(
      mousePosition
        ? `${mousePosition.x - elementOffset.left}px ${mousePosition.y - elementOffset.top}px`
        : ''
    );
  }

  // ============================= Render =============================

  const content = (
    <div className={`${prefixCls}-content`}>
      <div className={`${prefixCls}-body`}>{children}</div>
    </div>
  );

  return (
    <CSSMotion
      visible={visible}
      onVisibleChanged={onVisibleChanged}
      onAppearPrepare={onPrepare}
      onEnterPrepare={onPrepare}
      motionName={`${prefixCls}-zoom`}
      ref={dialogRef}
    >
      {({ className: motionClassName, style: motionStyle }, motionRef) => {
        console.log(motionStyle);
        return (
          <div
            key="dialog-element"
            role="document"
            ref={motionRef}
            style={{ ...motionStyle, ...style, ...contentStyle }}
            className={classNames(prefixCls, className, motionClassName)}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
          >
            <div tabIndex={0} ref={sentinelStartRef} style={sentinelStyle} aria-hidden="true" />
            {content}
            <div tabIndex={0} ref={sentinelEndRef} style={sentinelStyle} aria-hidden="true" />
          </div>
        );
      }}
    </CSSMotion>
  );
});

Content.displayName = 'Content';

export default Content;
