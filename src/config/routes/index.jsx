import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from '../../components/authentication/login';
import ErrorPage from '../../components/error-page';
import AppLayout from '../../components/layout';
import Application from '../../components/application';
import Dashboard from '../../components/dashboard';
import PrivateRoutes from './PrivateRoutes';
import WorkExperience from '../../components/work-experience';

function Router() {
	const router = createBrowserRouter([
		{
			path: '/login',
			element: (
				<PrivateRoutes>
					<Login />
				</PrivateRoutes>
			),
		},
		{
			path: '/',
			element: (
				<PrivateRoutes>
					<AppLayout />
				</PrivateRoutes>
			),
			children: [
				{
					path: '/dashboard',
					element: <Dashboard />,
				},
				{
					path: '/application',
					element: <Application />,
				},
				{
					path: '/experience',
					element: <WorkExperience />,
				},
			],
		},
		{
			path: '*',
			element: <ErrorPage />,
		},
	]);

	return <RouterProvider router={router} />;
}

export default Router;
