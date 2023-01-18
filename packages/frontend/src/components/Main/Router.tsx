import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import JobHistory from '../../pages/JobHistory';
import PipelineRun from '../../pages/PipelineRun/PipelineRun';

import PipelineRuns from '../../pages/PipelineRuns/PipelineRuns';
import PipelinesPage from '../../pages/Pipelines/Pipelines';
import JobsPage from '../../pages/Jobs';

const Router = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <PipelinesPage />,
    },
    {
      path: '/pipelines',
      element: <PipelinesPage />,
    },
    {
      path: '/jobs',
      element: <JobsPage />,
    },
    {
      path: '/pipeline/:pipelinId/runs/:pipelineRunId/jobs',
      element: <PipelineRun />,
      errorElement: <div>Something went wrong</div>,
    },
    {
      path: '/pipeline/:pipelinId/runs',
      element: <PipelineRuns />,
    },
    {
      path: '/job/:jobId',
      element: <JobHistory />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
