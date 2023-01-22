import styled from 'styled-components';

export const ExploreButtonWrapper = styled.div`
  height: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  .action-button.p-button {
    padding: 0.65rem 0;
    width: 5.5rem;
    align-items: center;
    justify-content: center;
    text-transform: uppercase;
    font-size: 0.6rem;
    &:enabled:hover {
      background-color: #ebebeb !important;
    }
  }
`;
