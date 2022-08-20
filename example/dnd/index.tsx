import React, { ReactElement } from 'react';
import { DndManager, DndComponent, IDropEndResult } from '../../src/component';

function TestDnd() {
  const [textArr, setTextArr] = React.useState<string[]>(() =>
    Array.from({ length: 10 }, (v, k) => `text ${k}`)
  );

  const moveNode = (result: IDropEndResult) => {
    setTextArr((preTextArr) => {
      const dragIndex = preTextArr.findIndex((item) => item === result.source.id);
      const dropIndex = preTextArr.findIndex((item) => item === result.target.id);
      const changeNode = preTextArr.splice(dragIndex, 1);
      preTextArr.splice(dropIndex, 0, changeNode[0]);
      return [...preTextArr];
    });
  };

  return (
    <DndManager
      onDragEnd={(v) => {
        moveNode(v);
        console.log(v);
      }}
      dropMode="move"
    >
      <div style={{ margin: '100px 0' }}>
        {textArr.map((item, i) => (
          <DndComponent key={i + item} draggable droppable resultData={{ id: item }}>
            {({ isDragOver }) => (
              <span
                style={{
                  padding: '8px',
                  margin: '4px',
                  background: isDragOver ? '#e6f7ff' : '#eee',
                  border: '1px solid #aaa',
                }}
              >
                {item}
              </span>
            )}
          </DndComponent>
        ))}
      </div>
    </DndManager>
  );
}

function SourceAndTarget() {
  return (
    <DndManager
      onDragEnd={(v) => {
        console.log(v);
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '300px',
          marginTop: '200px',
        }}
      >
        <DndComponent draggable>
          <button>Source</button>
        </DndComponent>
        <DndComponent droppable>
          {({ isDragOver }) => (
            <button style={{ background: isDragOver ? '#e6f7ff' : '#fff' }}>Target</button>
          )}
        </DndComponent>
      </div>
    </DndManager>
  );
}

export default function index(): ReactElement {
  return (
    <div>
      <TestDnd></TestDnd>
      <SourceAndTarget></SourceAndTarget>
    </div>
  );
}
