import baseUrl from '../../config/hooks';
import { createApi } from '@reduxjs/toolkit/query/react';

export const applicationApi = createApi({
	reducerPath: 'applicationApi',
	baseQuery: baseUrl,
	tagTypes: ['Application'],
	endpoints: (builder) => ({
		getApplication: builder.query({
			query: () => ({
				url: '/application',
				method: 'GET',
			}),
			providesTags: ['Application'],
		}),
		getApplicationDetail: builder.query({
			query: (id) => {
				return {
					url: `/application/${id}`,
					method: 'GET',
				};
			},
			providesTags: ['Application'],
		}),
		createApplication: builder.mutation({
			query: (data) => ({
				url: '/application',
				method: 'POST',
				body: data,
			}),
			invalidatesTags: ['Application'],
		}),
		updateApplication: builder.mutation({
			query: ({ id, data }) => ({
				url: `/application/${id}`,
				method: 'PUT',
				body: data,
			}),
			invalidatesTags: ['Application'],
		}),
		deleteApplication: builder.mutation({
			query: (id) => ({
				url: `/application/${id}`,
				method: 'POST',
			}),
			invalidatesTags: ['Application'],
		}),
	}),
});

export const {
	useGetApplicationDetailQuery,
	useCreateApplicationMutation,
	useUpdateApplicationMutation,
	useDeleteApplicationMutation,
	useGetApplicationQuery,
} = applicationApi;
