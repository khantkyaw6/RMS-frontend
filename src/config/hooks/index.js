import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { getLocalStorage } from '../../utils/localStorage';
const url = 'http://localhost:7000/api/v1/';

const baseUrl = fetchBaseQuery({
	baseUrl: url,
	prepareHeaders: async (headers, { _ }) => {
		const user = await getLocalStorage('user');
		if (user) {
			headers.set('Authorization', `Bearer ${user.token}`);
			headers.set('Cache-Control', 'no-cache');
		}
		return headers;
	},
});

export default baseUrl;
