import styled from 'styled-components';

export const Flex = styled.div`
  display: grid;
  width: 100%;
  grid-gap: 0rem;
  grid-template-columns: auto max-content;
  .m-card .children-container {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
`;
