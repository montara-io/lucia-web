import { useEffect, useState } from 'react';
import { get } from '../../../services/http.service';
import DataTable, {
  DataRow,
  HeaderRow,
} from '../../../stories/DataTable/DataTable';
import Loading from '../../../stories/Loading/Loading';

import { DivTitle, DivTitleContainer } from './styles';

type PageWithTableProps = {
  fetchUrl: string;
  fallbackHeaderData?: any;
  fallbackBodyData?: any;
  id: string;
  pageHeader: string;
  tableHeader?: string;
  children?: any;
  dataFormatterCallback?: (
    responseData: any,
  ) => { headerData: HeaderRow[]; bodyData: DataRow[] };
};

function PageWithTable({
  fetchUrl,
  fallbackHeaderData,
  fallbackBodyData,
  id,
  pageHeader,
  children,
  tableHeader,
  dataFormatterCallback,
}: PageWithTableProps) {
  const [headerData, setHeaderData] = useState([] as HeaderRow[]);
  const [bodyData, setBodyData] = useState([] as DataRow[]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const responseData = await get(fetchUrl);
        if (dataFormatterCallback) {
          const { headerData, bodyData } = dataFormatterCallback(responseData);
          setHeaderData(headerData);
          setBodyData(bodyData);
          return;
        } else if (fallbackHeaderData && fallbackBodyData) {
          setHeaderData(fallbackHeaderData);
          setBodyData(fallbackBodyData);
        }
      } catch (error) {
        console.error(error);
        setHeaderData(fallbackHeaderData);
        setBodyData(fallbackBodyData);
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
      {tableHeader && <DivTitle>All Runs</DivTitle>}
      <DataTable
        id={id}
        headerData={headerData}
        bodyData={bodyData}
        defaultSortField={'name'}
      />
    </>
  );
}

export default PageWithTable;
