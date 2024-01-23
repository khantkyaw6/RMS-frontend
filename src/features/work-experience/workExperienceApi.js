import baseUrl from '../../config/hooks';
import { createApi } from '@reduxjs/toolkit/query/react';

export const workExperienceApi = createApi({
	reducerPath: 'workExperienceApi',
	baseQuery: baseUrl,
	tagTypes: ['WorkExperience'],
	endpoints: (builder) => ({
		getExperience: builder.query({
			query: () => ({
				url: '/experience',
				method: 'GET',
			}),
			providesTags: ['WorkExperience'],
		}),
		createExperience: builder.mutation({
			query: (data) => ({
				url: '/experience',
				method: 'POST',
				body: data,
			}),
			invalidatesTags: ['WorkExperience'],
		}),
		updateExperience: builder.mutation({
			query: ({ id, data }) => ({
				url: `/experience/${id}`,
				method: 'PUT',
				body: data,
			}),
			invalidatesTags: ['WorkExperience'],
		}),
		deleteExperience: builder.mutation({
			query: (id) => ({
				url: `/experience/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['WorkExperience'],
		}),
	}),
});

export const {
	useGetExperienceQuery,
	useCreateExperienceMutation,
	useUpdateExperienceMutation,
	useDeleteExperienceMutation,
} = workExperienceApi;
