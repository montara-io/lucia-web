import styled from 'styled-components';

export const BreadCrumbContainer = styled.div`
  position: relative;
  font-size: 0.75em;
  color: ${({ theme: { blue } }) => blue};
  text-transform: uppercase;
  font-weight: 500;

  span {
    padding-left: 4px;
    display: flex;
  }
`;
