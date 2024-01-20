import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { getLocalStorage } from '../../utils/localStorage';
import { useDispatch } from 'react-redux';
import { setToken } from '../../features/user/userSlice';

const PrivateRoutes = ({ children }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();

	const checkToken = async () => {
		const userData = await getLocalStorage('user');

		if (userData?.token) {
			dispatch(setToken(userData.token));
			location.pathname == '/' || location.pathname == '/login'
				? navigate('/dashboard')
				: navigate(location.pathname);
		} else {
			navigate('/login');
		}
	};

	useEffect(() => {
		checkToken();
	}, [navigate]);

	return children;
};

export default PrivateRoutes;
