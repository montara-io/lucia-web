import { BrowserHistory } from 'history';
import { ButtonIcon } from '../../../stories/ButtonIcon';
import { BreadCrumbContainer } from './styles';

export const BreadCrumbs = ({ history }: { history: BrowserHistory }) => {
  return (
    <BreadCrumbContainer>
      <span>
        <ButtonIcon iconName="arrow-left" onClick={() => history.back()} />
      </span>
    </BreadCrumbContainer>
  );
};
