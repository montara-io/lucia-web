import styled from 'styled-components';

export const DashboardTitle = styled.h1`
  font-size: 2.25em;
  color: ${({ theme: { blue } }) => blue};
  font-weight: 300;
  margin: 0;

  & img {
    padding-left: 20px;
  }
`;

export const MainPageTitle = styled.div`
  display: flex;
  font-weight: 600;
  text-transform: uppercase;
  color: ${({ theme: { primary } }) => primary};
  font-size: 1.625em;

  img {
    min-width: 14px;
    margin-right: 14px;
  }
`;

export const MainPageSubTitle = styled.div`
  color: ${({ theme: { primary } }) => primary};
  padding-bottom: 21px;
`;

export const InnerPageTitle = styled.div`
  font-weight: 600;
  color: ${({ theme: { primary } }) => primary};
  font-size: 1.625rem;
`;

export const DriverStatus = styled.div`
  font-weight: 500;
  color: ${({ theme: { primary } }) => primary};
  font-size: 1.35em;
`;

export const HighlightDescription = styled.div`
  font-weight: 600;
  color: ${({ theme: { primary } }) => primary};
  font-size: 1.125em;
`;

export const PageSubTitle = styled.div`
  font-weight: bold;
  text-transform: uppercase;
  color: ${({ theme: { primary } }) => primary};
  font-size: 1rem;
  padding: 1.875rem 0 1.25rem 0;
`;

export const CardHeader = styled.div`
  font-weight: 600;
  color: ${({ theme: { primary } }) => primary};
  font-size: 1em;
`;

export const DriverSubStatus = styled.div`
  font-weight: normal;
  color: #272d3b;
  font-size: 0.875rem;
  padding: 2px 0;
`;

export const FocusAreaTitle = styled.div`
  font-weight: 600;
  font-size: 1rem;
  text-transform: capitalize;
  padding-right: 8px;
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

export const CardTitle = styled.div`
  font-weight: bold;
  text-transform: uppercase;
  color: ${({ theme: { primary } }) => primary};
  font-size: 0.75rem;
  padding: 8px;
`;

export const InformationalText = styled.div`
  display: flex;
  align-items: center;
  color: ${({ theme: { primary } }) => primary};
  font-size: 0.75rem;
  padding: 4px 0;
`;

export const InformationalTextTitle = styled.div`
  display: flex;
  align-items: center;
  font-weight: 500;
  color: ${({ theme: { primary } }) => primary};
  font-size: 0.75rem;
  padding: 4px 0;
  margin-right: 6px;
`;

export const InfoCardDetails = styled.div`
  display: flex;
  align-items: center;
  font-weight: normal;
  color: ${({ theme: { primary } }) => primary};
  font-size: 0.875rem;
  padding: 4px 0;
  margin-right: 6px;
`;

export const InfoCardTitle = styled.div`
  display: flex;
  align-items: center;
  font-weight: 600;
  color: ${({ theme: { primary } }) => primary};
  font-size: 0.875rem;
  padding: 4px 0;
  margin-right: 6px;
  text-transform: capitalize;
`;

export const InsightText = styled.span<{ bold?: boolean | undefined }>`
  font-weight: ${({ bold }) => (bold ? 600 : 400)};
  color: ${({ theme: { primary } }) => primary};
  font-size: 0.938rem;
`;

export const InformationalNumber = styled.span`
  color: ${({ theme: { primary } }) => primary};
  font-size: 0.75rem;
  font-weight: 500;
  padding: 1.5px 5.6px;
  margin-right: 4px;
  background: ${({ theme: { gray240 } }) => gray240};
  border-radius: 50%;
`;

export const SpotlightHeader = styled.div`
  font-size: 1rem;
  color: ${({ theme: { blue } }) => blue};
  padding-bottom: 8px;
`;

export const N2 = styled.h2`
  font-size: 4.545rem;
  font-weight: 400;
  margin: 0;
  padding: 0;
`;

export const PageBreakdownTitle = styled.div`
  font-size: 0.688rem;
  color: ${({ theme: { primary } }) => primary};
  font-weight: 500;
  text-transform: uppercase;
  padding-bottom: 18px;
  padding-top: 24px;
`;

export const TooltipText = styled.div`
  font-size: 0.688rem;
  color: ${({ theme: { white } }) => white};
  font-weight: 500;
`;

export const N3 = styled.h3`
  font-size: 4.545rem;
  font-weight: 500;
  margin: 0;
  padding: 0;
`;

export const AuthLoading = styled.h1`
  display: block;
  font-size: 1.25rem;
  color: #fff;
  font-weight: 500;
  margin: 0;
  padding: 0;
`;

export const AuthSmall = styled.h4`
  font-size: 0.75rem;
  color: #fff;
  text-align: center;
  font-weight: 500;
  margin: 0;
  padding: 0;
`;

export const LoggedOutContainer = styled.div`
  display: flex;
  flex-direction: column;
  display: block;
  font-size: 1.25rem;
  color: #fff;
  font-weight: 500;
  text-align: center;
  justify-content: space-between;
`;

export const AuthContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`;

export const Flex = styled.div`
  display: flex;
  justify-content: center;
`;

export const Help = styled.div`
  color: ${({ theme: { blue } }) => blue};
  font-size: 0.75rem;

  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;
