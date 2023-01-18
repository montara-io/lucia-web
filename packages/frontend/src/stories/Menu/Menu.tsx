import React, { useState } from 'react';
import './Menu.scss';
import Tooltip from '../Tooltip/Tooltip';
import SideNav, { NavIcon, NavItem, NavText, Subtitle } from './StyledMenu';
import Avatar from '../Avatar';
import { Tooltip as PrimeTooltip } from 'primereact/tooltip';
import classNames from 'classnames';

type ItemType = {
  id: string;
  label: string;
  icon: string;
  command?: any;
  disabled?: boolean;
  addId?: boolean;
  tooltip?: {
    title: string;
    content: string | Element;
  };
};

export type GroupOfItems = {
  label: string;
  disabled?: boolean;
  tooltip?: {
    title: string;
    content: string;
  };
  items: ItemType[];
};

export type MenuProps = {
  id: string;
  defaultSelected: string;
  model: {
    body: GroupOfItems[];
    footer: GroupOfItems[];
  };
  onExpanded?: (expanded: boolean) => void;
  profileImage: string;
};

export const Menu: React.FunctionComponent<MenuProps> = (props) => {
  const [expanded, setExpanded] = useState(true);

  const onToggle = (expanded: any) => {
    setExpanded(expanded);
    props.onExpanded && props.onExpanded(expanded);
  };

  const renderItem = (
    item: {
      id: any;
      icon: any;
      disabled: any;
      command: any;
      label: any;
      tooltip?: any;
      addId: any;
    },
    expanded: boolean,
    selected: string
  ) => {
    const { id, icon, disabled, command, label, tooltip, addId } = item;

    return (
      <>
        <NavItem
          eventKey={id}
          className={classNames(
            `NavItem-${id}`,
            selected === id
              ? 'sidenav---selected---1EK3y '
              : disabled
              ? 'disabled'
              : ''
          )}
          key={id}
          {...(addId ? { id: id } : {})}
          {...(!disabled ? { onClick: command } : {})}
        >
          <NavIcon>
            <img src={icon} alt={label} />
          </NavIcon>
          <NavText className={disabled ? 'disabled' : ''}>
            {label}
            {tooltip?.title && tooltip?.content && (
              <PrimeTooltip
                className="menu-item"
                target={`.NavItem-${id}`}
                position="right"
                autoHide={false}
              >
                <div className="title">{tooltip?.title}</div>
                <div className="content">{tooltip?.content}</div>
              </PrimeTooltip>
            )}
          </NavText>
        </NavItem>
        {!expanded && <Tooltip position="right">{label}</Tooltip>}
      </>
    );
  };

  const renderGroup = (group, expanded: boolean, selected: string) => {
    return group.map(({ items, label, disabled, tooltip }) => [
      <div
        className={`m-subtitle ${!label && 'hide'} ${!expanded && 'collapsed'}`}
        key={label}
      >
        {(expanded || (!disabled && !expanded)) && <Subtitle>{label}</Subtitle>}
      </div>,
      items.map((sub: any) => renderItem(sub, expanded, selected)),
    ]);
  };

  return (
    <div className="m-menu" data-testid="m-menu">
      <SideNav
        className={`m-sidenav${expanded ? ' expanded' : ''}`}
        onToggle={onToggle}
        expanded={expanded}
      >
        <div className={`logo${expanded ? ' expanded' : ''}`} />
        <SideNav.Toggle expanded={true}>
          <span className="small-arrow" />
        </SideNav.Toggle>
        <SideNav.Nav defaultSelected={props.defaultSelected}>
          {renderGroup(props.model.body, expanded, props.defaultSelected)}
        </SideNav.Nav>
        {props.profileImage && (
          <div className="m-profile">
            <Avatar src={props.profileImage} />
          </div>
        )}
        <SideNav.Nav
          className={`m-footer${props.profileImage ? '' : '-without-img'}`}
        >
          {renderGroup(props.model.footer, expanded, props.defaultSelected)}
        </SideNav.Nav>
      </SideNav>
    </div>
  );
};

export default Menu;
