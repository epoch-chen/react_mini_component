import React, { ReactElement } from 'react';
import { DndManager, DndComponent, IResult } from '../../src/component';

interface Props {}

function TestDnd({}: Props) {
  const [textArr, setTextArr] = React.useState<string[]>(() =>
    Array.from({ length: 10 }, (v, k) => `text ${k}`)
  );

  const moveNode = (result: IResult) => {
    setTextArr((preTextArr) => {
      const dragIndex = preTextArr.findIndex((item) => item === result.sourceId);
      const dropIndex = preTextArr.findIndex((item) => item === result.targetId);
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
          <DndComponent key={i + item} sourceId={item} targetId={item}>
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

function TestDnd2({}: Props) {
  const [textArr, setTextArr] = React.useState<string[]>(() =>
    Array.from({ length: 6 }, (v, k) => `text ${k}`)
  );
  const [dropArreaNode, setDropArreaNode] = React.useState<string[]>([]);

  const moveNode = (result: IResult) => {
    const dragIndex = textArr.findIndex((item) => item + 2 === result.sourceId);

    setDropArreaNode((preNode) => preNode.concat([`${textArr[dragIndex]}`]));
    // setTextArr((preTextArr) => {
    //   preTextArr.splice(dragIndex, 1);
    //   console.log(preTextArr, 'old');
    //   return [...preTextArr];
    // });
  };

  return (
    <DndManager
      onDragEnd={(v) => {
        moveNode(v);
        console.log(v);
      }}
      dropMode="copy"
    >
      <div style={{ display: 'flex', marginTop: '60px' }}>
        <div>
          {textArr.map((item, i) => (
            <DndComponent key={item + i} sourceId={item + 2}>
              {({ isDragOver }) => (
                <div
                  style={{
                    padding: '8px',
                    margin: '4px',
                    background: isDragOver ? '#e6f7ff' : '#fff',
                    border: '1px solid #aaa',
                    width: '100px',
                  }}
                >
                  {item}
                </div>
              )}
            </DndComponent>
          ))}
        </div>
        <DndComponent targetId="dropArea">
          {({ isDragOver }) => (
            <div
              style={{
                marginLeft: '32px',
                border: '1px solid #aaa',
                width: '300px',
                background: isDragOver ? '#e6f7ff' : '#fff',
              }}
            >
              {dropArreaNode.map((item, i) => (
                <div
                  key={item + i}
                  style={{
                    padding: '8px',
                    margin: '4px',
                    background: '#eee',
                    border: '1px solid #aaa',
                    width: '100px',
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
          )}
        </DndComponent>
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
        <DndComponent sourceId="source_1">
          <button>Source</button>
        </DndComponent>
        <DndComponent targetId="target_1">
          {({ isDragOver }) => (
            <button style={{ background: isDragOver ? '#e6f7ff' : '#fff' }}>Target</button>
          )}
        </DndComponent>
      </div>
    </DndManager>
  );
}

export default function index({}: Props): ReactElement {
  return (
    <div>
      <TestDnd></TestDnd>
      <TestDnd2></TestDnd2>
      <SourceAndTarget></SourceAndTarget>
    </div>
  );
}
