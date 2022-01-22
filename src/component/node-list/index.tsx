import React, { useEffect, useRef, useState } from 'react';
import ReactResizeObserver from 'rc-resize-observer';
import Operation from './operation';
import RenderNode from './render-node';
import { parseNodeList, alignInRange } from './utils';
import useRefs from './hook/useRefs';
import useOffsets from './hook/useOffsets';
import useVisibleRange from './hook/useVisibleRange';
import useTouchMove from './hook/useTouchMove';
import './asset/index.less';

export interface Props {
  direction: 'vertical' | 'horizonal';
  children: React.ReactElement[];
}

export type NodeSizeMap = Map<
  React.Key,
  { width: number; height: number; left: number; top: number }
>;
/** nodelist*/
const NodeList: React.FC<Props> = (props: Props) => {
  const { children, direction } = props;
  const nodesWrapperRef = useRef<HTMLDivElement>();
  const nodeListRef = useRef<HTMLDivElement>();
  const operationsRef = useRef<HTMLDivElement>();
  const [getNodeRef] = useRefs<HTMLDivElement>();

  const [wrapperScrollWidth, setWrapperScrollWidth] = useState<number>(0);
  const [wrapperScrollHeight, setWrapperScrollHeight] = useState<number>(0);
  const [wrapperWidth, setWrapperWidth] = useState<number>(null);
  const [wrapperHeight, setWrapperHeight] = useState<number>(null);
  const [nodesSizes, setNodesSizes] = useState<NodeSizeMap>(new Map());

  const [transformLeft, setTransformLeft] = useState<number>(0);
  const [transformTop, setTransformTop] = useState<number>(0);
  const [activeKey, setActiveKey] = useState<React.Key>('');
  const horizonal = direction !== 'vertical';
  const nodes = parseNodeList(children);
  const prefixCs = 'node-list';
  const operationsHiddenClassName = `${prefixCs}-operation-hidden`;

  function getRefBykey(key: React.Key) {
    return getNodeRef(key);
  }
  const resizeHandler = () => {
    const offsetWidth = nodesWrapperRef.current?.offsetWidth || 0;
    const offsetHeight = nodesWrapperRef.current?.offsetHeight || 0;
    const newOperationWidth = operationsRef.current?.offsetWidth || 0;
    const newOperationHeight = operationsRef.current?.offsetHeight || 0;

    const newWrapperScrollWidth = nodeListRef.current?.scrollWidth || 0;
    const newWrapperScrollHeight = nodeListRef.current?.scrollHeight || 0;

    setWrapperScrollWidth(newWrapperScrollWidth);
    setWrapperScrollHeight(newWrapperScrollHeight);

    const isOperationHidden = operationsRef.current?.className.includes(operationsHiddenClassName);
    setWrapperWidth(offsetWidth - (isOperationHidden ? 0 : newOperationWidth * 2));
    setWrapperHeight(offsetHeight - (isOperationHidden ? 0 : newOperationHeight * 2));
    setNodesSizes(() => {
      const newSizes = new Map();

      nodes.forEach(({ key }) => {
        const btnNode = getRefBykey(key).current;
        if (btnNode) {
          newSizes.set(key, {
            width: btnNode.offsetWidth,
            height: btnNode.offsetHeight,
            left: btnNode.offsetLeft,
            top: btnNode.offsetTop,
          });
        }
      });
      return newSizes;
    });
  };
  let transformMin = 0;
  let transformMax = 0;

  if (!horizonal) {
    transformMin = Math.min(0, wrapperHeight - wrapperScrollHeight);
    transformMax = 0;
  } else {
    transformMin = Math.min(0, wrapperWidth - wrapperScrollWidth);
    transformMax = 0;
  }

  const nodesOffset = useOffsets(nodes, nodesSizes, wrapperScrollWidth);

  function onNodeScroll(key = activeKey, toTopOrLeft?: boolean) {
    const nodeOffset = nodesOffset.get(key) || {
      width: 0,
      height: 0,
      left: 0,
      right: 0,
      top: 0,
    };

    if (horizonal) {
      // ============ Align with top & bottom ============
      let newTransform = transformLeft;
      if (toTopOrLeft) {
        newTransform = -nodeOffset.left;
      }
      // LTR
      else if (nodeOffset.left < -transformLeft) {
        newTransform = -nodeOffset.left;
      } else if (nodeOffset.left + nodeOffset.width > -transformLeft + wrapperWidth) {
        newTransform = -(nodeOffset.left + nodeOffset.width - wrapperWidth);
      }
      setTransformTop(0);
      setTransformLeft(alignInRange(newTransform, transformMin, transformMax));
    } else {
      // ============ Align with left & right ============
      let newTransform = transformTop;
      if (toTopOrLeft) {
        newTransform = -nodeOffset.top;
      } else if (nodeOffset.top < -transformTop) {
        newTransform = -nodeOffset.top;
      } else if (nodeOffset.top + nodeOffset.height > -transformTop + wrapperHeight) {
        newTransform = -(nodeOffset.top + nodeOffset.height - wrapperHeight);
      }

      setTransformLeft(0);
      setTransformTop(alignInRange(newTransform, transformMin, transformMax));
    }
  }
  const [visibleStart, visibleEnd] = useVisibleRange(
    nodesOffset,
    {
      width: wrapperWidth,
      height: wrapperHeight,
      left: transformLeft,
      top: transformTop,
    },
    { horizonal, nodes }
  );
  const startHiddenNodes = nodes.slice(0, visibleStart);
  const endHiddenNodes = nodes.slice(visibleEnd + 1);
  const hiddenNodes = [...startHiddenNodes, ...endHiddenNodes];

  useEffect(() => {
    onNodeScroll();
  }, [activeKey, nodesOffset, horizonal]);
  useEffect(() => {
    resizeHandler();
  }, [activeKey, nodes.map((tab) => tab.key).join('_')]);

  const onOperate = (dir: string) => {
    let scrollTokey: React.Key = '';
    const util = horizonal ? 'left' : 'top';
    const safeSize = nodesSizes.get(nodes[visibleStart]?.key) || {
      width: 0,
      height: 0,
      left: 0,
      right: 0,
      top: 0,
    };
    const size = horizonal ? -safeSize[util] + wrapperWidth : -safeSize[util] + wrapperHeight;
    if (dir === 'left' || dir === 'top') {
      const len = startHiddenNodes.length;
      scrollTokey = startHiddenNodes[len - 1].key;
      for (let i = 0; i < len; i += 1) {
        if (-nodesSizes.get(startHiddenNodes[i].key)[util] < size) {
          scrollTokey = startHiddenNodes[i].key;
          break;
        }
      }
    } else {
      scrollTokey = nodes[Math.min(visibleEnd + 1, nodes.length - 1)].key;
    }
    onNodeScroll(scrollTokey, true);
  };

  useTouchMove(nodesWrapperRef, (offsetX, offsetY) => {
    function doMove(setState: React.Dispatch<React.SetStateAction<number>>, offset: number) {
      setState((value) => {
        const newValue = alignInRange(value + offset, transformMin, transformMax);

        return newValue;
      });
    }

    if (horizonal) {
      // Skip scroll if place is enough
      if (wrapperWidth >= wrapperScrollWidth) {
        return false;
      }

      doMove(setTransformLeft, offsetX);
    } else {
      if (wrapperHeight >= wrapperScrollHeight) {
        return false;
      }

      doMove(setTransformTop, offsetY);
    }

    // clearTouchMoving();

    return true;
  });
  function onActiveKeyChange(key: React.Key) {
    setActiveKey(key);
    onNodeScroll(key);
  }
  const operationBaseOption = {
    ref: operationsRef,
    prefixCs: prefixCs,
    operationHidden: !(hiddenNodes.length > 0),
    onOperate: onOperate,
    horizonal: horizonal,
    disabled: [startHiddenNodes.length <= 0, endHiddenNodes.length <= 0] as [boolean, boolean],
  };

  return (
    <ReactResizeObserver onResize={resizeHandler}>
      <div
        ref={nodesWrapperRef}
        className={
          hiddenNodes.length > 0
            ? `${prefixCs} ${
                horizonal ? `${prefixCs}-with-hidden-node` : `${prefixCs}-with-hidden-node-vertical`
              }`
            : `${prefixCs}`
        }
      >
        <Operation {...operationBaseOption} />
        <div
          ref={nodeListRef}
          className={`${prefixCs}-content ${horizonal ? `` : `${prefixCs}-content-vertical`}`}
          style={{
            transform: `translate(${transformLeft}px, ${transformTop}px)`,
          }}
        >
          <RenderNode
            nodes={nodes}
            refs={getRefBykey}
            onActiveKeyChange={onActiveKeyChange}
            prefixCs={prefixCs}
          />
        </div>
      </div>
    </ReactResizeObserver>
  );
};
export default NodeList;
