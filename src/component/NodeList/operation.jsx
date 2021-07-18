import React from 'react';

export default React.forwardRef(function operation(props, ref) {
  const { prefixCs, horizonal, operationHidden, onOperate, disabled } = props;
  const operationsHiddenClassName = operationHidden ? `${prefixCs}-operation-hidden` : '';
  const disabledClass = [
    disabled[0] ? `${prefixCs}-operation-disabled` : '',
    disabled[1] ? `${prefixCs}-operation-disabled` : '',
  ];

  const optionLeftClass = `${prefixCs}-operation ${prefixCs}-operation-${
    horizonal ? 'left' : 'top'
  } ${operationsHiddenClassName} ${disabledClass[0]}`;
  function onLeftClick() {
    if (disabled[0]) return;

    onOperate(horizonal ? 'left' : 'top');
  }
  const optionRightClass = `${prefixCs}-operation ${prefixCs}-operation-${
    horizonal ? 'right' : 'bottom'
  } ${operationsHiddenClassName} ${disabledClass[1]}`;

  function onRightClick() {
    if (disabled[1]) return;
    onOperate(horizonal ? 'right' : 'bottom');
  }
  return (
    <>
      <div ref={ref} className={optionLeftClass} onClick={onLeftClick} disabled >
        <span className={`${prefixCs}-operation-arrow`}></span>
      </div>
      <div ref={ref} className={optionRightClass} onClick={onRightClick} disabled >
        <span className={`${prefixCs}-operation-arrow`}></span>
      </div>
    </>
  );
});
