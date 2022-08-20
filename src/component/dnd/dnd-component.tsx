import React, { cloneElement, useMemo } from 'react';
import { DndManagerContext } from './constant';
import { draggableConnect } from './draggable';
import { droppableConnect } from './droppable';
import { getUUID } from './utils';

export interface IDragDropProps {
  children: React.ReactElement | (({ isDragOver }: { isDragOver: boolean }) => React.ReactElement);
  droppable?: boolean;
  draggable?: boolean;
  resultData?: Record<string, string | number>;
}

const DndComponent = ({
  children,
  droppable,
  draggable,
  resultData = {},
}: IDragDropProps): React.ReactElement => {
  const uuid = React.useRef<string>(getUUID());
  const dndManager = React.useContext(DndManagerContext);
  const result = useMemo(() => resultData, []);
  React.useEffect(() => {
    dndManager.removeTarget(uuid.current);
    if (droppable) {
      dndManager.addTarget(uuid.current, result);
    }
  }, [droppable, result]);

  React.useEffect(() => {
    dndManager.removeSource(uuid.current);
    if (draggable) {
      dndManager.addSource(uuid.current, result);
    }
  }, [draggable, result]);

  React.useEffect(() => {
    return () => {
      dndManager.removeSource(uuid.current);
      dndManager.removeTarget(uuid.current);
    };
  }, []);

  return cloneElement(
    droppableConnect(
      draggableConnect(
        typeof children === 'function'
          ? children({ isDragOver: dndManager.result.hoverId === uuid.current })
          : children,
        draggable,
        uuid.current,
        dndManager
      ),
      droppable,
      uuid.current,
      dndManager
    )
  );
};
export default DndComponent;
