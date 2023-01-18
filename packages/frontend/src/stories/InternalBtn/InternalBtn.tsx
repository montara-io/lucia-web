import classNames from 'classnames';
import React from 'react';
import './InternalBtn.scss';

export interface InternalBtnProps {
  id?: string;
  text: string;
  callback: () => void;
  disabled?: boolean;
}

const InternalBtn: React.FunctionComponent<InternalBtnProps> = ({
  callback,
  text,
  id,
  disabled = false,
}) => {
  return (
    <button
      className={classNames('internal-button', disabled ? 'internal-button-disabled' : '')}
      data-testid={`internal-button-${id}`}
      onClick={callback}
      disabled={disabled}
    >
      {text}
      {!disabled && <img src="/assets/internal-link-arrow.svg" alt={text} />}
    </button>
  );
};

export default InternalBtn;
