import React, { cloneElement } from 'react';
import { DragResultStatusEnum, IDndManager, sourceId } from './type';
export function draggableConnect(
  element: React.ReactElement,
  sourceId: sourceId,
  dndManager: IDndManager
): React.ReactElement {
  const dragStartHandler = (e: React.DragEvent<HTMLDivElement>) => {
    if (dndManager.dropMode) e.dataTransfer.dropEffect = dndManager.dropMode;
    console.log(e.dataTransfer, 'start');
    dndManager?.changeResult({
      status: DragResultStatusEnum.DRAG,
      sourceId: sourceId,
      hoverId: null,
      targetId: null,
    });
  };
  const dragEndHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    console.log(e.dataTransfer, 'end');
    if (dndManager.result.sourceId && dndManager.result.targetId) {
      dndManager?.changeResult({
        status: DragResultStatusEnum.DROP,
        hoverId: null,
      });
    } else {
      dndManager?.changeResult({
        status: DragResultStatusEnum.CANCEL,
        hoverId: null,
        sourceId: null,
        targetId: null,
      });
    }
    dndManager?.changeResult({
      hoverId: null,
      sourceId: null,
      targetId: null,
    });
  };

  if (!element || !sourceId || !React.isValidElement<any>(element)) return element;

  return cloneElement(element, {
    draggable: true,
    onDragStart: dragStartHandler,
    onDragEnd: dragEndHandler,
  });
}
