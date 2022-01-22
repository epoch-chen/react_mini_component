import { ComponentType } from 'react';
import { targetId, sourceId, IDndManager } from './type';

export function isRefForwardingComponent(C: any) {
  const item = C;
  return item?.$$typeof?.toString() === 'Symbol(react.forward_ref)';
}
export function isClassComponent(Component: ComponentType) {
  return Component && Component.prototype && typeof Component.prototype.render === 'function';
}
export function isRefable(C: ComponentType) {
  return isClassComponent(C) || isRefForwardingComponent(C);
}
