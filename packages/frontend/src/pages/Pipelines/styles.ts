import WAvatar from '../../stories/Avatar';
import styled from 'styled-components';

export const Avatar = styled(WAvatar)`
  img {
    height: 30px;
    width: 30px;
  }
  margin-right: 17px;
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

export const NoJobsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 85%;
  justify-content: center;
`;
