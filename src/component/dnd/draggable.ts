import React, { cloneElement, HTMLAttributes } from 'react';
import { DragResultStatusEnum, IDndManager, sourceId } from './type';
export function draggableConnect(
  element: React.ReactElement,
  draggable: boolean,
  sourceId: sourceId,
  dndManager: IDndManager
): React.ReactElement {
  const dragStartHandler = (e: React.DragEvent<HTMLDivElement>) => {
    if (dndManager.dropMode) e.dataTransfer.dropEffect = dndManager.dropMode;
    dndManager?.changeResult({
      status: DragResultStatusEnum.DRAG,
      sourceId: sourceId,
      hoverId: null,
      targetId: null,
    });
  };
  const dragEndHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!dndManager.result.sourceId || !dndManager.result.targetId) {
      dndManager?.changeResult({
        status: DragResultStatusEnum.CANCEL,
        hoverId: null,
        sourceId: null,
        targetId: null,
      });
      return;
    }
    dndManager?.changeResult({
      hoverId: null,
      sourceId: null,
      targetId: null,
    });
  };

  if (!element || !draggable || !React.isValidElement<HTMLAttributes<Element>>(element))
    return element;

  return cloneElement(element, {
    draggable: true,
    onDragStart: dragStartHandler,
    onDragEnd: dragEndHandler,
  });
}
