export enum DragResultStatusEnum {
  DRAG = 'DRAG',
  DROP = 'DROP',
  CANCEL = 'CANCEL',
}

export type sourceId = string | null;
export type targetId = string | null;
export type dropMode = DataTransfer['dropEffect'];
export type source = Record<string, string | number>;
export type target = Record<string, string | number>;

export type sourceMap = Record<string, source>;
export type targetMap = Record<string, target>;

export interface IResult {
  sourceId: sourceId;
  targetId: targetId;
  status: DragResultStatusEnum;
  hoverId: targetId;
}

export interface IDropEndResult {
  source: source;
  target: target;
  status: DragResultStatusEnum;
}
export interface IDndManager {
  dropMode: dropMode;
  sourceMap: sourceMap;
  targetMap: targetMap;
  result?: IResult;
  changeResult?: (result: Partial<IResult>) => void;
  addSource: (sourceId: sourceId, source: source) => void;
  removeSource: (sourceId: sourceId) => void;
  addTarget: (targetId: targetId, target: target) => void;
  removeTarget: (targetId: targetId) => void;
}
