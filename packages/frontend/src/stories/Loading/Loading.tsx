import { FunctionComponent } from 'react';
import './Loading.scss';
import { ProgressBar } from 'primereact/progressbar';
import classNames from 'classnames';

export type LoadingProps = {
  id: string;
  mode: 'dark' | 'light';
  className?: string;
};

const Loading: FunctionComponent<LoadingProps> = ({ mode, id, className }) => {
  return (
    <div
      id={id}
      data-testid="m-loading"
      className={classNames(
        `m-loading-${mode === 'dark' ? 'dark' : 'light'}`,
        className,
      )}
    >
      <ProgressBar mode="indeterminate" />
    </div>
  );
};
const WrappedLoading = (props) => {
  return <Loading {...props} />;
};
export default WrappedLoading;
