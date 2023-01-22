import { BrowserHistory } from 'history';
import { useEffect, useState } from 'react';
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
        <img src="/assets/icons/breadcrumbs.svg" alt="" />

        <span>{'>'}</span>
        <span>{pageTitle}</span>
      </span>
    </BreadCrumbContainer>
  );
};
