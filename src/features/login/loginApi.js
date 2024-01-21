import baseUrl from '../../config/hooks';
import { createApi } from '@reduxjs/toolkit/query/react';

export const loginApi = createApi({
	reducerPath: 'loginApi',
	baseQuery: baseUrl,
	endpoints: (builder) => ({
		postLogin: builder.mutation({
			query: (data) => ({
				url: 'auth/login',
				method: 'POST',
				body: data,
			}),
		}),
	}),
});

export const { usePostLoginMutation } = loginApi;
