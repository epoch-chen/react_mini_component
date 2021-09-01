import React, { ReactElement } from 'react';
import { NodeList } from '../../src';
import './index.less';
export default function NodeListDemo(): ReactElement {
  const renderButton = () => {
    const buttonTextArr = Array.from({ length: 30 }, (v, k) => `button${k + 1}`);
    return buttonTextArr.map((item) => (
      <button className="demo-node-list-section-btn" key={item}>
        {item}
      </button>
    ));
  };
  const renderCard = () => {
    const CardTextArr = Array.from({ length: 30 }, (v, k) => `Card${k + 1}`);
    return CardTextArr.map((item) => (
      <div className="demo-node-list-section-card" key={item}>
        {item}
      </div>
    ));
  };
  const renderCardWithResize = () => {
    const CardTextArr = Array.from({ length: 7 }, (v, k) => `Card${k + 1}`);
    return CardTextArr.map((item) => (
      <div className="demo-node-list-section-card" key={item}>
        {item}
      </div>
    ));
  };
  return (
    <div className="demo-node-list">
      <section className="demo-node-list-section">
        <h5>Button list</h5>
        <div className="demo-node-list-section-btn-wrapper">
          <NodeList direction="vertical">{renderButton()}</NodeList>
        </div>
      </section>
      <section className="demo-node-list-section">
        <h5>Card list</h5>
        <div className="demo-node-list-section-card-wrapper">
          <NodeList direction="horizonal">{renderCard()}</NodeList>
        </div>
      </section>
      <section className="demo-node-list-section">
        <h5>Card list With Resize</h5>
        <div className="demo-node-list-section-card-wrapper">
          <NodeList direction="horizonal">{renderCardWithResize()}</NodeList>
        </div>
      </section>
    </div>
  );
}
