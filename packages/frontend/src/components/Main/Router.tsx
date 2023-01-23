import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import JobHistory from '../../pages/JobHistory';
import PipelineRun from '../../pages/PipelineRun/PipelineRun';

import PipelineRuns from '../../pages/PipelineRuns/PipelineRuns';
import PipelinesPage from '../../pages/Pipelines/Pipelines';
import JobsPage from '../../pages/Jobs';

enum Routes {
  pipelines = '/pipelines',
  jobs = '/jobs',
  pipelineRuns = '/pipeline/:pipelineId/runs',
  pipelineRun = '/pipeline/:pipelineId/runs/:pipelineRunId/jobs',
  jobHistory = '/job/:jobId',
}

const Router = () => {
  const router = createBrowserRouter([
    {
      path: '/',

      element: <Navigate to={Routes.pipelines} />,
    },
    {
      path: Routes.pipelines,
      element: <PipelinesPage />,
    },
    {
      path: '/jobs',
      element: <JobsPage />,
    },
    {
      path: '/pipeline/:pipelineId/runs/:pipelineRunId/jobs',
      element: <PipelineRun />,
      errorElement: <div>Something went wrong</div>,
    },
    {
      path: '/pipeline/:pipelineId/runs',
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
