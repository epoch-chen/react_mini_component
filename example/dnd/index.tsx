import React, { ReactElement } from 'react';
import { DndManager, DndComponent, IResult, IDropEndResult } from '../../src/component';
import { Button, List, Tabs, TabsProps } from 'antd';
import VirtualList from 'rc-virtual-list';
import { useState } from 'react';
interface Props {}

function TestDnd({}: Props) {
  const [textArr, setTextArr] = React.useState<string[]>(() =>
    Array.from({ length: 10 }, (v, k) => `text ${k}`)
  );

  const moveNode = (result: IDropEndResult) => {
    console.log(result.source, result.target);
    setTextArr((preTextArr) => {
      const dragIndex = preTextArr.findIndex((item) => item === result.source.order);
      const dropIndex = preTextArr.findIndex((item) => item === result.target.order);
      const changeNode = preTextArr.splice(dragIndex, 1);
      preTextArr.splice(dropIndex, 0, changeNode[0]);
      return [...preTextArr];
    });
  };

  console.log(textArr);

  // return (
  //   <DndManager
  //     onDragEnd={(v) => {
  //       moveNode(v);
  //     }}
  //     dropMode="move"
  //   >
  //     <div style={{ margin: '100px 0' }}>
  //       {textArr.map((item, i) => (
  //         <DndComponent
  //           key={i + item}
  //           draggable={true}
  //           droppable={true}
  //           resultData={{ order: item }}
  //         >
  //           {({ isDragOver }) => (
  //             <span
  //               style={{
  //                 padding: '8px',
  //                 margin: '4px',
  //                 background: isDragOver ? '#e6f7ff' : '#eee',
  //                 border: '1px solid #aaa',
  //               }}
  //             >
  //               {item}
  //             </span>
  //           )}
  //         </DndComponent>
  //       ))}
  //     </div>
  //   </DndManager>
  // );
  const renderTabBar = (props, DefaultTabBar) => (
    <DefaultTabBar {...props}>
      {(node: React.ReactElement) => {
        return (
          <DndComponent draggable={true} droppable={true} resultData={{ order: node.key }}>
            {node}
          </DndComponent>
        );
      }}
    </DefaultTabBar>
  );
  return (
    <DndManager
      onDragEnd={(v) => {
        moveNode(v);
      }}
      dropMode="move"
    >
      <Tabs renderTabBar={renderTabBar} type="editable-card">
        {textArr.map((item) => {
          return (
            <Tabs.TabPane tab={item} key={item}>
              {item}
            </Tabs.TabPane>
          );
        })}
      </Tabs>
    </DndManager>
  );
}

function TestDnd2({}: Props) {
  const [textArr, setTextArr] = React.useState<string[]>(() =>
    Array.from({ length: 6 }, (v, k) => `text ${k}`)
  );
  const [dropArreaNode, setDropArreaNode] = React.useState<string[]>([]);

  const moveNode = (result: IDropEndResult) => {
    // const dragIndex = textArr.findIndex((item) => item + 2 === result.sourceId);
    // setDropArreaNode((preNode) => preNode.concat([`${textArr[dragIndex]}`]));
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
      dropMode="move"
    >
      <div style={{ display: 'flex', marginTop: '60px' }}>
        <div>
          {textArr.map((item, i) => (
            <DndComponent key={item + i} draggable>
              {({ isDragOver }) => (
                <div
                  key={item + 2}
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
        <DndComponent droppable>
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

// function SourceAndTarget() {
//   return (
//     <DndManager
//       onDragEnd={(v) => {
//         console.log(v);
//       }}
//     >
//       <div
//         style={{
//           display: 'flex',
//           justifyContent: 'space-between',
//           width: '300px',
//           marginTop: '200px',
//         }}
//       >
//         <DndComponent sourceId="source_1">
//           <button>Source</button>
//         </DndComponent>
//         <DndComponent targetId="target_1">
//           {({ isDragOver }) => (
//             <button style={{ background: isDragOver ? '#e6f7ff' : '#fff' }}>Target</button>
//           )}
//         </DndComponent>
//       </div>
//     </DndManager>
//   );
// }

export default function index({}: Props): ReactElement {
  const data = ['list1', 'list2', 'list4', 'list3'];
  const [s, sets] = useState<boolean>(true);
  const moveNode = (v: IDropEndResult) => {
    console.log(v.target, v.source);
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <DndManager
          onDragEnd={(v) => {
            moveNode(v);
          }}
          dropMode="copy"
        >
          <List>
            <VirtualList data={data} height={800} itemHeight={47} itemKey="email">
              {(item) => (
                <DndComponent draggable={true} resultData={{ order: item }}>
                  <div style={{ padding: '8px', margin: '8px', background: '#eee' }}>{item}</div>
                </DndComponent>
              )}
            </VirtualList>
          </List>
          <DndComponent droppable={true} resultData={{ order: 'panel' }}>
            {({ isDragOver }) => <div>{s ? <TestDnd></TestDnd> : 'test'}</div>}
          </DndComponent>
        </DndManager>
        {/* <TestDnd2></TestDnd2>
      <SourceAndTarget></SourceAndTarget> */}
      </div>
      <Button
        onClick={() => {
          sets((pre) => !pre);
        }}
      >
        change
      </Button>
    </>
  );
}
