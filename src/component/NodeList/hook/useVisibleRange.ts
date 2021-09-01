import { useMemo } from 'react';
import { Nodes } from '../utils';
import { NodeOffsetMap } from './useOffsets';
const DEFAULT_SIZE = { width: 0, height: 0, left: 0, top: 0, right: 0 };

export default function useVisibleRange(
  tabOffsets: NodeOffsetMap,
  containerSize: { width: number; height: number; left: number; top: number },
  { nodes, horizonal }: { nodes: Nodes; horizonal: boolean }
): [number, number] {
  let unit: 'width' | 'height';
  let position: 'left' | 'top';
  let transformSize: number;

  if (horizonal) {
    unit = 'width';
    position = 'left';
    transformSize = Math.abs(containerSize.left);
  } else {
    unit = 'height';
    position = 'top';
    transformSize = -containerSize.top;
  }

  const basicSize = containerSize[unit];

  return useMemo(() => {
    if (!nodes.length) {
      return [0, 0];
    }

    const len = nodes.length;
    let endIndex = len - 1;
    for (let i = 0; i < len; i += 1) {
      const offset = tabOffsets.get(nodes[i].key) || DEFAULT_SIZE;
      const deltaOffset = Math.min(offset[unit], basicSize);
      if (offset[position] + deltaOffset > transformSize + basicSize) {
        endIndex = i - 1;
        break;
      }
    }

    let startIndex = 0;
    for (let i = len - 1; i >= 0; i -= 1) {
      const offset = tabOffsets.get(nodes[i].key) || DEFAULT_SIZE;
      if (offset[position] < transformSize) {
        startIndex = i + 1;
        break;
      }
    }

    return [startIndex, endIndex];
  }, [tabOffsets, transformSize, horizonal, nodes.map((tab) => tab.key).join('_')]);
}
