import React, { useMemo } from 'react';
import { NodeSizeMap } from '../index';
import { Nodes } from '../utils';
const DEFAULT_SIZE = { width: 0, height: 0, left: 0, top: 0 };

export type NodeOffset = {
  width: number;
  height: number;
  left: number;
  top: number;
  right: number;
};
export type NodeOffsetMap = Map<React.Key, NodeOffset>;
export default function useOffsets(
  nodes: Nodes,
  nodeSizes: NodeSizeMap,
  holderScrollWidth: number
) {
  return useMemo(() => {
    const map: NodeOffsetMap = new Map();

    const lastOffset = nodeSizes.get(nodes[0]?.key) || DEFAULT_SIZE;
    const rightOffset = lastOffset.left + lastOffset.width;

    for (let i = 0; i < nodes.length; i += 1) {
      const { key } = nodes[i];
      let data = nodeSizes.get(key);

      // Reuse last one when not exist yet
      if (!data) {
        data = nodeSizes.get(nodes[i - 1]?.key) || DEFAULT_SIZE;
      }

      const entity = (map.get(key) || { ...data }) as NodeOffset;

      // Right
      entity.right = rightOffset - entity.left - entity.width;

      // Update entity
      map.set(key, entity);
    }

    return map;
  }, [nodes.map((tab) => tab.key).join('_'), nodeSizes, holderScrollWidth]);
}
