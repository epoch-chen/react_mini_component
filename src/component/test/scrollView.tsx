import React, { ReactElement } from 'react';

interface Props {}

export default function ScrollView({}: Props): ReactElement {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [nextTransfrom, setNextTransfrom] = React.useState<number>(0);
  const [count, setCount] = React.useState<[number, number]>([1, 1]);
  const onscrollTo: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: 0,
        left: count[0] * 120,
      });
      setCount((pre) => [pre[0] + 1, pre[1]]);
    }
  };

  const onTransform: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setNextTransfrom(-(count[1] * 120));
    setCount((pre) => [pre[0], pre[1] + 1]);
  };

  const renderChildren = () => {
    return Array.from({ length: 300 }, (v, i) => `node${i}`).map((item) => (
      <span key={item}>{item}</span>
    ));
  };

  const startRender = () => {
    setInterval(() => {
      console.log(scrollRef.current.getBoundingClientRect());
    }, 1000);
  };

  const renderScrollTo = () => (
    <>
      <div ref={scrollRef} style={{ width: '800px', overflow: 'hidden' }}>
        {renderChildren()}
      </div>
      <button onClick={onscrollTo}>next scroll</button>
    </>
  );

  const renderTransform = () => {
    return (
      <>
        <div
          style={{
            width: '800px',
            overflow: 'hidden',
          }}
        >
          <div style={{ transform: `translate(${nextTransfrom}px, 0px)`, willChange: 'transform' }}>
            {renderChildren()}
          </div>
        </div>
        <button onClick={onTransform}>next transform</button>
      </>
    );
  };

  const renderStartBtn = () => <button onClick={startRender}> start</button>;
  return (
    <div>
      {renderScrollTo()}
      {renderTransform()}
      {renderStartBtn()}
    </div>
  );
}
