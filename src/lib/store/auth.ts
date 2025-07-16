import { create } from "zustand";

import { axiosInstance } from "../utils/axios";
import { endpoints } from "../config/endpoints";
import { useDraftCartStore } from "./draft-cart";
import { useActiveCartStore } from "./active-cart";
import { saveSessionCookies, deleteSessionCookies } from "../actions/auth";
import {
  User,
  AuthState,
  AuthStore,
  LoginPayload,
  LoginResponse,
  RegisterPayload,
} from "../types/auth";

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
};

export const useAuthStore = create<AuthStore>()((set) => ({
  ...initialState,
  init: (user: User | null) => {
    set({
      user,
      isAuthenticated: !!user,
      isLoading: false,
    });
  },
  login: async (payload: LoginPayload) => {
    try {
      const res = await axiosInstance.post(endpoints.auth.login, payload);

      const loginResponse = res.data as LoginResponse;

      await saveSessionCookies(loginResponse);

      const {
        accessToken,
        accessTokenExpireDate,
        refreshToken,
        refreshTokenExpireDate,
        ...user
      } = loginResponse;

      // move locale storage cart to account
      // set auth state without waiting carts
      useActiveCartStore.getState().setIsLoading(false);
      useActiveCartStore.getState().transferLocalCartToAccount();
      useDraftCartStore.getState().setIsLoading(false);
      useDraftCartStore.getState().transferLocalCartToAccount();

      set({ isLoading: false, isAuthenticated: true, user });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
  register: async (payload: RegisterPayload) => {
    try {
      await axiosInstance.post(endpoints.auth.register, payload);
    } catch (error) {
      throw error;
    }
  },
  logout: async () => {
    await deleteSessionCookies();
    window.location.reload();
    set({ user: null, isAuthenticated: false });
  },
}));
