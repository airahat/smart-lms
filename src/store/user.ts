import { defineStore } from "pinia";

export const useUserStore = defineStore('user', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user') || 'null'), 
  }),
  getters: {
    isAdmin: (state) => state.user?.role_id === 1,
  },
  actions: {
    setUser(userData: any) {
      this.user = userData; 
      localStorage.setItem('user', JSON.stringify(userData)); 
    },
    clearUser() {
      this.user = null;
      localStorage.removeItem('user');
    }
  }
});
