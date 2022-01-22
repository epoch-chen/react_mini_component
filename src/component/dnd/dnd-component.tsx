import React, { cloneElement } from 'react';
import { DndManagerContext } from './constant';
import { draggableConnect } from './draggable';
import { dropabbleConnect } from './dropable';

export interface IDragDropProps {
  children: React.ReactElement | (({ isDragOver }: { isDragOver: boolean }) => React.ReactElement);
  sourceId?: string;
  targetId?: string;
}

const DndComponent = ({ children, sourceId, targetId }: IDragDropProps): React.ReactElement => {
  const dndContainerRef = React.useRef<HTMLElement>();
  const dndManager = React.useContext(DndManagerContext);

  React.useEffect(() => {
    if (targetId) {
      dndManager.addTarget(targetId, dndContainerRef);
    }
    if (sourceId) {
      dndManager.addSource(sourceId, dndContainerRef);
    }
  }, [children, sourceId, targetId]);

  React.useEffect(() => {
    return () => {
      if (sourceId) dndManager.removeSource(sourceId);
      if (targetId) dndManager.removeTarget(targetId);
    };
  }, []);

  return cloneElement(
    dropabbleConnect(
      draggableConnect(
        typeof children === 'function'
          ? children({ isDragOver: dndManager.result.hoverId === targetId })
          : children,
        sourceId,
        dndManager
      ),
      targetId,
      dndManager
    ),
    { ref: dndContainerRef }
  );
};
export default DndComponent;
