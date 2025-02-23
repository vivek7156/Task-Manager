import { create } from 'zustand';
import toast from 'react-hot-toast';

const url='http://localhost:5000';

const useAuthStore = create((set) => ({
  user: null,
  login: async (email, password) => {
    const response = await fetch(`${url}/api/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const data = await response.json();
    toast.success('Login successful');
    set({ user: data.user });
    localStorage.setItem('token', data.token);
  },
  register: async (name, email, password) => {
    const response = await fetch(`${url}/api/users/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });

    if (!response.ok) {
      throw new Error('Registration failed');
    }

    const data = await response.json();
    toast.success('Registration successful');
    set({ user: data.user });
    localStorage.setItem('token', data.token);
  },
  logout: () => {
    set({ user: null });
    localStorage.removeItem('token');
    toast.success('Logout successful');
  },
}));

export default useAuthStore;