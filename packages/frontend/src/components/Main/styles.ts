import styled from 'styled-components';
import { theme } from '../../styles/Theme';

export const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  overflow: hidden;
`;

export const MenuWrapper = styled.div`
  font-size: 1.125rem;
`;

export const Context = styled.div<{ menuExpand: boolean }>`
  height: 100%;
  transition: margin 0.3s;
  margin-left: ${(props: { menuExpand: boolean }) =>
    props.menuExpand ? '15' : '3.2'}%;
  background: linear-gradient(#304e6f, #335171);
  margin-top: 3rem;
`;

export const TopPage = styled.div`
  height: 40px;
`;

export const Header = styled.div`
  height: 3.188rem;
`;

export const Body = styled.div`
  height: calc(100vh - 40px);
  background: #fff;
  border-top-left-radius: 25px;
  padding: 2rem;
  overflow: auto;
`;

export const SafeZoneBadge = styled.div`
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  top: 40px;
  font-size: 0.875em;
  z-index: 1100;
  position: absolute;
  transform: translateX(35%);
  width: 365px;
  color: ${theme.blue};
  height: 40px;
  text-align: center;
  font-weight: 600;
  background: ${theme.paleBlue} 0% 0% no-repeat padding-box;
  border-radius: 0px 0px 20px 20px;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    margin: 0 8px;
  }
`;

export const Shield = styled.img`
  height: 24px;
  width: 21px;
`;
