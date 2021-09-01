import * as React from 'react';

export interface Node extends React.ReactElement {
  node: React.ReactElement;
}

export type Nodes = Node[];

function parseNodeList(children: React.ReactNode[]): Nodes {
  return children
    ?.map((node, index) => {
      if (React.isValidElement(node)) {
        const key = node.key !== undefined ? String(node.key) : index;
        return {
          key,
          ...node.props,
          node,
        };
      }
      return null;
    })
    .filter((node) => node);
}
function alignInRange(value: number, transformMin: number, transformMax: number): number {
  if (value < transformMin) {
    return transformMin;
  }
  if (value > transformMax) {
    return transformMax;
  }
  return value;
}
export { parseNodeList, alignInRange };
