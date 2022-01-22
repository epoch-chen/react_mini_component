import React from 'react';
import { IDndManager } from './type';

const defaultContext: IDndManager = {
  dropMode: 'move',
  sourceMap: {},
  targetMap: {},
  addSource: console.log,
  removeSource: console.log,
  addTarget: console.log,
  removeTarget: console.log,
};

// Context lets us pass a value deep into the component tree
// without explicitly threading it through every component.
export const DndManagerContext = React.createContext<IDndManager>(defaultContext);
