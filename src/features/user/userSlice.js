import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	token: null, // Initial token state
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setToken: (state, action) => {
			state.token = action.payload;
		},
		clearToken: (state) => {
			state.token = null;
		},
	},
});

export const { setToken, clearToken } = userSlice.actions;

export const selectToken = (state) => state.user.token; // Selector to access the token

export default userSlice.reducer;
