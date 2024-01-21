import baseUrl from '../../config/hooks';
import { createApi } from '@reduxjs/toolkit/query/react';

export const adminApi = createApi({
	reducerPath: 'adminApi',
	baseQuery: baseUrl,
	tagTypes: ['Admin'],
	endpoints: (builder) => ({
		getAdmins: builder.query({
			query: () => ({
				url: '/admin',
				method: 'GET',
			}),
			providesTags: ['Admin'],
		}),
		createAdmin: builder.mutation({
			query: (data) => ({
				url: '/admin',
				method: 'POST',
				body: data,
			}),
			invalidatesTags: ['Admin'],
		}),
	}),
});

export const { useGetAdminsQuery, useCreateAdminMutation } = adminApi;
