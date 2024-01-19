import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from '../../components/authentication/login';
import ErrorPage from '../../components/error-page';
import AppLayout from '../../components/layout';
import Application from '../../components/application';
import Dashboard from '../../components/dashboard';

function Router() {
	const router = createBrowserRouter([
		{
			path: '/login',
			element: <Login />,
		},
		{
			path: '/',
			element: <AppLayout />,
			children: [
				{
					path: '/dashboard',
					element: <Dashboard />,
				},
				{
					path: '/application',
					element: <Application />,
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
