import React, { cloneElement, HTMLAttributes } from 'react';
import { DragResultStatusEnum, IDndManager, targetId } from './type';
export function droppableConnect(
  element: React.ReactElement,
  droppable: boolean,
  targetId: targetId,
  dndManager: IDndManager
): React.ReactElement {
  const dropHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const { sourceId } = dndManager.result;
    if (sourceId && dndManager.sourceMap[sourceId]) {
      if (dndManager.dropMode) e.dataTransfer.dropEffect = dndManager.dropMode;
      dndManager.changeResult({
        targetId: targetId,
        status: DragResultStatusEnum.DROP,
      });
    }
  };
  const dragOverHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const { sourceId } = dndManager.result;
    if (sourceId && dndManager.sourceMap[sourceId]) {
      if (dndManager.dropMode) e.dataTransfer.dropEffect = dndManager.dropMode;
      dndManager.changeResult({
        hoverId: targetId,
      });
    } else {
      // e.dataTransfer.effectAllowed = 'none';
      e.dataTransfer.dropEffect = 'none';
    }
  };
  const dragLeaveHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const { sourceId } = dndManager.result;

    if (sourceId && dndManager.sourceMap[sourceId]) {
      dndManager.changeResult({
        hoverId: null,
      });
    }
  };
  if (!element || !droppable || !React.isValidElement<HTMLAttributes<Element>>(element))
    return element;

  return cloneElement(element, {
    onDrop: dropHandler,
    onDragOver: dragOverHandler,
    onDragLeave: dragLeaveHandler,
  });
}
