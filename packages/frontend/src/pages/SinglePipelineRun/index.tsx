import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PageWithTable from '../../components/common/PageWithTable';
import { ApiUrls } from '../../constants/api-urls';
import { dataFormatterCallback } from './helpers';

const SinglePipelineRunPage = () => {
  const navigate = useNavigate();
  const { pipelineRunId = '', pipelineId } = useParams();
  const [pageHeader, setPageHeader] = useState('');
  return (
    <PageWithTable
      fetchUrl={ApiUrls.GetJobsByPipelineRunId.replace(
        ':pipelineRunId',
        pipelineRunId,
      )}
      dataFormatterCallback={(responseData) =>
        dataFormatterCallback({ navigate, responseData })
      }
      onData={() => setPageHeader(`${pipelineId} - Jobs`)}
      id={'pipelineRun'}
      pageHeader={pageHeader}
    />
  );
};

export default SinglePipelineRunPage;
