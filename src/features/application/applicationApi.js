import baseUrl from '../../config/hooks';
import { createApi } from '@reduxjs/toolkit/query/react';

export const applicationApi = createApi({
	baseQuery: baseUrl,
	endpoints: (builder) => ({
		getApplication: builder.query({
			query: () => ({
				url: '/application',
				method: 'GET',
			}),
			providesTags: ['application'],
		}),
		getApplicationDetail: builder.query({
			query: (id) => {
				return {
					url: `/application/${id}`,
					method: 'GET',
				};
			},
			providesTags: ['application'],
		}),
		deleteApplication: builder.mutation({
			query: (id) => ({
				url: `/application/${id}`,
				method: 'POST',
			}),
			invalidatesTags: ['application'],
		}),
	}),
});

export const {
	useGetApplicationQuery,
	useGetApplicationDetailQuery,
	useDeleteApplicationMutation,
} = applicationApi;
