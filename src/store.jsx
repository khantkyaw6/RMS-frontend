import { create } from 'zustand';

const useStore = create((set) => ({
	sidebar: false,
	sidebarTrigger: () => {
		set((state) => ({ sidebar: !state.sidebar }));
	},
}));

export default useStore;
