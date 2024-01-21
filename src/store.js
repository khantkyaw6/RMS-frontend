import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import collapsedReducer from './features/layout/collapsedSlice';
import userReducer from './features/user/userSlice';
import { loginApi } from './features/login/loginApi';
import { applicationApi } from './features/application/applicationApi';
import { adminApi } from './features/admin/adminApi';

const store = configureStore({
	reducer: {
		collapsedReducer,
		user: userReducer,
		[loginApi.reducerPath]: loginApi.reducer,
		[adminApi.reducerPath]: adminApi.reducer,
		[applicationApi.reducerPath]: applicationApi.reducer,
	},

	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat([
			loginApi.middleware,
			applicationApi.middleware,
			adminApi.middleware,
		]),
});

setupListeners(store.dispatch);

export default store;
