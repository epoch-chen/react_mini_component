import * as React from 'react';
import classNames from 'classnames';
import CSSTransition from 'rc-motion';
export type MaskProps = {
  prefixCls: string;
  visible: boolean;
  style?: React.CSSProperties;
  maskProps?: React.HTMLAttributes<HTMLDivElement>;
};

export default function Mask(props: MaskProps) {
  const { prefixCls, style, visible, maskProps } = props;

  return (
    <CSSTransition
      key="mask"
      visible={visible}
      motionName={`${prefixCls}-fade`}
      leavedClassName={`${prefixCls}-mask-hidden`}
    >
      {({ className: motionClassName, style: motionStyle }) => (
        <div
          style={{ ...motionStyle, ...style }}
          className={classNames(`${prefixCls}-mask`, motionClassName)}
          {...maskProps}
        />
      )}
    </CSSTransition>
  );
}
