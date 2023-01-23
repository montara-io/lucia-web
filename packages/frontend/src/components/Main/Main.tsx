import { createBrowserHistory } from 'history';

import { useState } from 'react';
import Menu from '../../stories/Menu/Menu';
import { BreadCrumbs } from '../common/BreadCrumbs/BreadCrumbs';
import Router from './Router';

import { Body, Context, MenuWrapper, Wrapper } from './styles';

export const Main = (props: any): JSX.Element => {
  const history = createBrowserHistory();
  const [menuExpand, setMenuExpand] = useState(true);
  const [selected, setSelected] = useState('pipelines');

  const buildMenu = () => {
    const menu = [
      {
        label: '',
        items: [
          {
            id: 'pipelines',
            label: 'pipelines',
            icon: '/assets/menu-icons/Engagement.svg',
          },
          {
            id: 'jobs',
            label: 'jobs',
            icon: '/assets/menu-icons/Productivity.svg',
          },
        ],
      },
    ];
    return menu?.map((menuData) => {
      return {
        ...menuData,
        label: menuData.label?.length > 0 ? menuData.label : '',
        items: menuData?.items?.map((item) => {
          return {
            ...item,
            label: item.label.toUpperCase(),
            command: () => handleMenuClick(item.id),
          };
        }),
      };
    });
  };

  const handleMenuClick = (selected: string) => {
    setSelected(selected);
    history.push('/' + selected);
  };

  const getMenuProps = () => {
    return {
      id: 'menu',
      profileImage: props?.user?.avatar,
      model: {
        body: buildMenu() || [],
        footer: [],
      },
      onExpanded: (e: boolean) => setMenuExpand(e),
    };
  };

  return (
    <Wrapper>
      <MenuWrapper>
        <Menu {...getMenuProps()} defaultSelected={selected} />
      </MenuWrapper>
      <Context menuExpand={menuExpand}>
        <Body>
          <BreadCrumbs history={history} />
          <Router />
        </Body>
      </Context>
    </Wrapper>
  );
};

export default Main;
