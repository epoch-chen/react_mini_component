import React from 'react';
import { Dialog } from '../../src/component';

export enum dialogKeyEnum {
  NORMAL_DIALOG = 'normal',
}

export interface IProps {}

export interface IState {
  normalDialogVisible: dialogKeyEnum;
}

class DialogDemo extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      normalDialogVisible: null,
    };
  }

  openDialog = (key: dialogKeyEnum) => {
    this.setState({ normalDialogVisible: key });
  };
  closeDialog = () => {
    this.setState({ normalDialogVisible: null });
  };

  renderOperateBtn = () => {
    return (
      <>
        <div>
          <button onClick={() => this.openDialog(dialogKeyEnum.NORMAL_DIALOG)}>
            trigger normal dialog
          </button>
        </div>
        <div>
          <button
            style={{ marginTop: '400px' }}
            onClick={() => this.openDialog(dialogKeyEnum.NORMAL_DIALOG)}
          >
            trigger normal dialog1
          </button>
        </div>
      </>
    );
  };

  renderNormal = () => {
    const { normalDialogVisible } = this.state;
    return (
      <Dialog
        visible={normalDialogVisible === dialogKeyEnum.NORMAL_DIALOG}
        center={true}
        // mask={false}
        onClose={this.closeDialog}
      >
        <div>This is a dialog</div>
      </Dialog>
    );
  };
  render() {
    return (
      <div>
        {this.renderOperateBtn()}
        {this.renderNormal()}
      </div>
    );
  }
}

export default DialogDemo;
