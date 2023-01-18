import WAvatar from '../../stories/Avatar';
import styled from 'styled-components';

export const Avatar = styled(WAvatar)`
  img {
    height: 30px;
    width: 30px;
  }
  margin-right: 17px;
`;

export const GroupContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0 8px;
`;

export const GroupCell = styled.div<{ isActive: boolean | undefined }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  cursor: ${({ isActive }) => (isActive ? 'pointer' : 'auto')};
`;

export const Severity = styled.span`
  display: block;
  border-radius: 50px;
  width: 1.6em;
  margin-left: auto;
  margin-right: auto;
  border-width: 0.15em;
  border-style: solid;
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

export const ExploreButton = styled.div`
  height: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  .action-button.p-button {
    padding: 0.65rem 0;
    width: 6.5rem;
    align-items: center;
    justify-content: center;
    text-transform: uppercase;
    font-size: 0.6rem;
    &:enabled:hover {
      background-color: #ebebeb !important;
    }
  }
`;
