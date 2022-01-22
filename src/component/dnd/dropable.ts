import React, { cloneElement } from 'react';
import { DragResultStatusEnum, IDndManager, targetId } from './type';
export function dropabbleConnect(
  element: React.ReactElement,
  targetId: targetId,
  dndManager: IDndManager
): React.ReactElement {
  const dropHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const { sourceId } = dndManager.result;
    // if (sourceId && dndManager.sourceMap[sourceId]) {
    if (dndManager.dropMode) e.dataTransfer.dropEffect = dndManager.dropMode;
    console.log(e.dataTransfer, 'drop');
    dndManager.changeResult({
      targetId: targetId,
      // status: DragResultStatusEnum.DROP,
    });
    // }
  };
  const dragOverHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const { sourceId } = dndManager.result;
    // if (sourceId && dndManager.sourceMap[sourceId]) {
    if (dndManager.dropMode) e.dataTransfer.dropEffect = dndManager.dropMode;
    dndManager.changeResult({
      hoverId: targetId,
    });
    console.log(e.dataTransfer, 'over');
    // } else {
    //   // e.dataTransfer.effectAllowed = 'none';
    //   e.dataTransfer.dropEffect = 'none';
    // }
  };
  const dragLeaveHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    // const { sourceId } = dndManager.result;
    // if (sourceId && dndManager.sourceMap[sourceId]) {
    console.log(e.dataTransfer, 'leave');
    dndManager.changeResult({
      hoverId: null,
    });
    // }
  };
  if (!element || !targetId || !React.isValidElement<any>(element)) return element;

  return cloneElement(element, {
    onDrop: dropHandler,
    onDragOver: dragOverHandler,
    onDragLeave: dragLeaveHandler,
  });
}
