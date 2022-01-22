import React, { Component } from 'react';
import { DndManagerContext } from './constant';
import {
  DragResultStatusEnum,
  IDndManager,
  IResult,
  source,
  sourceId,
  sourceMap,
  target,
  targetId,
  targetMap,
} from './type';
import './index.less';
import { dropMode } from './type';
interface Props {
  children: React.ReactNode;
  onDragEnd: (result: IResult) => void;
  dropMode?: dropMode;
}
interface State {
  dropMode: dropMode;
  sourceMap: sourceMap;
  targetMap: targetMap;
  result: IResult;
}

export default class DndManager extends Component<Props, State> {
  state: State = {
    dropMode: this.props.dropMode || 'move',
    sourceMap: {},
    targetMap: {},
    result: {
      targetId: null,
      sourceId: null,
      status: null,
      hoverId: null,
    },
  };
  public changeResult(result: Partial<IResult>) {
    const { onDragEnd } = this.props;
    const newResult = { ...this.state.result, ...result };

    if (result.status && result.status === DragResultStatusEnum.DROP) {
      onDragEnd(newResult);
    }
    this.setState({ ...this.state, result: newResult });
  }
  public addSource(sourceId: sourceId, source: source) {
    this.setState((state) => {
      return { sourceMap: { ...state.sourceMap, [sourceId]: source } };
    });
  }
  public addTarget(targetId: targetId, target: target) {
    this.setState((state) => {
      return { targetMap: { ...state.targetMap, [targetId]: target } };
    });
  }
  public removeSource(sourceId: sourceId) {
    this.setState((state) => {
      return { sourceMap: { ...state.sourceMap, [sourceId]: undefined } };
    });
  }
  public removeTarget(targetId: targetId) {
    this.setState((state) => {
      return { targetMap: { ...state.targetMap, [targetId]: undefined } };
    });
  }

  componentWillReceiveProps(nextProps: Props) {
    const { dropMode } = this.state;
    if (dropMode !== nextProps.dropMode) {
      this.setState({
        dropMode: nextProps.dropMode,
      });
    }
  }

  render() {
    const { children } = this.props;

    return (
      // Every Context object comes with a Provider React component
      // that allows consuming components to subscribe to context changes
      <DndManagerContext.Provider
        value={{
          ...this.state,
          addSource: this.addSource.bind(this),
          addTarget: this.addTarget.bind(this),
          removeSource: this.removeSource.bind(this),
          removeTarget: this.removeTarget.bind(this),
          changeResult: this.changeResult.bind(this),
        }}
      >
        {children}
      </DndManagerContext.Provider>
    );
  }
}
