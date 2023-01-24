import { useEffect, useState } from 'react';
import { get } from '../../../services/http.service';
import DataTable, {
  DataRow,
  HeaderRow,
} from '../../../stories/DataTable/DataTable';
import Loading from '../../../stories/Loading/Loading';

import { DivTitle, DivTitleContainer } from './styles';

export type DataFormatterResponse = {
  headerData: HeaderRow[];
  bodyData: DataRow[];
};

type PageWithTableProps = {
  fetchUrl: string;
  id: string;
  pageHeader: string;
  tableHeader?: string;
  children?: any;
  dataFormatterCallback: (responseData: any) => DataFormatterResponse;
  onData?: (data: any) => void;
  errorElement?: React.ReactElement;
};

function PageWithTable({
  fetchUrl,
  id,
  pageHeader,
  children,
  tableHeader,
  dataFormatterCallback,
  onData,
  errorElement,
}: PageWithTableProps) {
  const [headerData, setHeaderData] = useState([] as HeaderRow[]);
  const [bodyData, setBodyData] = useState([] as DataRow[]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const responseData = await get(fetchUrl);

        const { headerData, bodyData } = dataFormatterCallback(responseData);
        typeof onData === 'function' && onData(responseData);
        setHeaderData(headerData);
        setBodyData(bodyData);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return isLoading ? (
    <Loading />
  ) : (
    <>
      <DivTitleContainer>{pageHeader}</DivTitleContainer>

      {children}
      {tableHeader && <DivTitle>Run Details</DivTitle>}
      {!!bodyData?.length && (
        <DataTable
          id={id}
          headerData={headerData}
          bodyData={bodyData}
          defaultSortField={'name'}
        />
      )}
      {!bodyData?.length && errorElement && errorElement}
    </>
  );
}

export default PageWithTable;
