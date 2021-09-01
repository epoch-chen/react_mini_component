import React from 'react';
import { Nodes } from './utils';

export interface Props {
  nodes: Nodes;
  refs: (key: React.Key) => React.RefObject<HTMLDivElement>;
  onActiveKeyChange: (key: React.Key) => void;
  prefixCs: string;
}

const RenderNode: React.FC<Props> = (props: Props) => {
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
};
export default RenderNode;
