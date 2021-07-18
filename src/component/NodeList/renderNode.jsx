import React from 'react';

export default function renderNode(props) {
  const { nodes, refs, onActiveKeyChange, prefixCs } = props;
  const render = () => {
    const nodeRender = nodes.map((node) => (
      <div
        key={`${prefixCs}_${node.key}`}
        ref={refs(node.key)}
        onClick={() => {
          onActiveKeyChange(node.key);
        }}
      >
        {node.node}
      </div>
    ));
    return nodeRender;
  };
  return <>{render()}</>;
}
