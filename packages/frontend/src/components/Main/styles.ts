import styled from 'styled-components';

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
