import styled from 'styled-components';
import { CardTitle } from '../../../styles/Typography';

export const Container = styled.div<{ small: boolean | undefined }>`
  height: ${({ small }) => (small ? '13.75' : '17.5')}em;
  padding: 0 18px;
`;

export const NumericContainer = styled.div`
  padding: 4px 0;
  margin-right: 1rem;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
`;

export const ChartContainer = styled.div<{ small: boolean | undefined }>`
  height: ${({ small }) => (small ? '8.7' : '12.5')}em;
  width: 100%;
`;

export const StyledCardTitle = styled(CardTitle)`
  padding-left: 0;
`;

export const BlockedContainer = styled.div`
  height: 8.7em;
`;

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
