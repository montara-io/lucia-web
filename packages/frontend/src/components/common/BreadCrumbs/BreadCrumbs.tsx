import { BrowserHistory } from 'history';
import { useEffect, useState } from 'react';
import { ButtonIcon } from '../../../stories/ButtonIcon';
import { BreadCrumbContainer } from './styles';

const pageTitles = {
  '/pipelines': 'Pipelines',
  '/jobs': 'Jobs',
};

export const BreadCrumbs = ({ history }: { history: BrowserHistory }) => {
  const [pageTitle, setPageTitle] = useState('');
  useEffect(() => {
    setPageTitle(pageTitles[history.location.pathname]);
  }, [history.location.pathname]);

  return (
    <BreadCrumbContainer>
      <span>
        <ButtonIcon iconName="arrow-left" onClick={() => history.back()} />

        {/* <img src="/assets/internal-link-arrow.svg" alt="" /> */}
        {/* <span>{'>'}</span>
        <span>{pageTitle}</span> */}
      </span>
    </BreadCrumbContainer>
  );
};
