import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import JobHistory from '../../pages/JobHistory';
import PipelineRun from '../../pages/PipelineRun/PipelineRun';

import PipelineRuns from '../../pages/PipelineRuns';
import PipelinesPage from '../../pages/Pipelines';
import JobsPage from '../../pages/Jobs';
import { Routes } from '../../constants/routes';

const Router = () => {
  const router = createBrowserRouter([
    {
      path: '/',

      element: <Navigate to={Routes.Pipelines} />,
    },
    {
      path: Routes.Pipelines,
      element: <PipelinesPage />,
    },
    {
      path: Routes.Jobs,
      element: <JobsPage />,
    },
    {
      path: Routes.PipelineRun,
      element: <PipelineRun />,
      errorElement: <div>Something went wrong</div>,
    },
    {
      path: Routes.PipelineRuns,
      element: <PipelineRuns />,
    },
    {
      path: Routes.JobHistory,
      element: <JobHistory />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
