import React from 'react';
import { NodeList } from '../../src/component';
import './index.less';

export interface IProps {}

export interface IState {
  buttonTextArr: string[];
}
export default class NodeListDemo extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      buttonTextArr: [`button0`],
    };
  }

  onCreateButton = (n: number) => {
    this.setState({
      buttonTextArr: Array.from({ length: n }, (v, k) => `button${k + 1}`),
    });
  };

  renderButton = () => {
    const { buttonTextArr } = this.state;
    return buttonTextArr.map((item) => (
      <button className="demo-node-list-section-btn" key={item}>
        {item}
      </button>
    ));
  };
  renderCard = () => {
    const CardTextArr = Array.from({ length: 30 }, (v, k) => `Card${k + 1}`);
    return CardTextArr.map((item) => (
      <div className="demo-node-list-section-card" key={item}>
        {item}
      </div>
    ));
  };
  renderCardWithResize = () => {
    const CardTextArr = Array.from({ length: 7 }, (v, k) => `Card${k + 1}`);
    return CardTextArr.map((item) => (
      <div className="demo-node-list-section-card" key={item}>
        {item}
      </div>
    ));
  };
  render() {
    return (
      <div className="demo-node-list">
        <button
          onClick={() => {
            this.onCreateButton(100);
          }}
        >
          100
        </button>
        <button
          onClick={() => {
            this.onCreateButton(1000);
          }}
        >
          1000
        </button>
        <button
          onClick={() => {
            this.onCreateButton(10000);
          }}
        >
          10000
        </button>
        <section className="demo-node-list-section">
          <h5>Button list</h5>
          <div className="demo-node-list-section-btn-wrapper">
            {/* <NodeList direction="vertical"> */}
            {this.renderButton()}
            {/* </NodeList> */}
          </div>
        </section>
        <section className="demo-node-list-section">
          <h5>Card list</h5>
          <div className="demo-node-list-section-card-wrapper">
            <NodeList direction="horizonal">{this.renderCard()}</NodeList>
          </div>
        </section>
        <section className="demo-node-list-section">
          <h5>Card list With Resize</h5>
          <div className="demo-node-list-section-card-wrapper">
            <NodeList direction="horizonal">{this.renderCardWithResize()}</NodeList>
          </div>
        </section>
      </div>
    );
  }
}
