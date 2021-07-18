import * as React from 'react';

function parseTabList(children) {
  return children
    .map((node,index) => {
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
function alignInRange(value, transformMin, transformMax) {
  if (value < transformMin) {
    return transformMin;
  }
  if (value > transformMax) {
    return transformMax;
  }
  return value;
}
export { parseTabList, alignInRange };
