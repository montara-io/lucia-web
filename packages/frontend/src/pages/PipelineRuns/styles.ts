import styled from 'styled-components';

export const GroupContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0 8px;
`;

export const PipelineTitle = styled.div`
  font-weight: 600;
  font-size: 1rem;
  line-height: 19px;
  color: #272d3b;
  overflow-x: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 15em;
`;

export const DivTitleContainer = styled.div`
  padding: 22px 0px 21px;
  font-weight: bold;
  font-size: 1.5rem;
  line-height: 19px;
  text-transform: uppercase;
  letter-spacing: 0px;
  opacity: 1;
  text-align: left;
`;

export const DivTitle = styled.div`
  padding: 30px 0px 6px 0px;
  font-weight: bold;
  font-size: 16px;
  line-height: 19px;
  text-transform: uppercase;
  letter-spacing: 0px;
  opacity: 1;
  text-align: left;
`;

export const SubTitleContainer = styled.div`
  padding: 0px;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0px;
  opacity: 1;
  text-align: left;
  padding-bottom: 21px;
`;

export const PipelineDateTitle = styled.div`
  font-size: 0.875rem;
  line-height: 18px;
  color: #272d3b;
  overflow-x: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-right: 15px;
  max-width: 17em;
`;
