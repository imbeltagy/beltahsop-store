export const paths = {
  home: "/",
  auth: {
    login: "/auth/login",
    register: "/auth/register",
    emailConfirmation: "/auth/email-confirmation",
    resetPassword: "/auth/reset-password",
    forgotPassword: "/auth/forgot-password",
  },
  store: "/store",
  checkout: "/checkout",
  blog: "/blog",
  faqs: "/faqs",
  contact: "/contact",
  profile: "/profile",
  product: (id: string) => `/store/product/${id}`,
  category: (id: string) => `/store/category/${id}`,
};

export const pathAfterLogin = paths.home;
