export const paths = {
  home: "/",
  auth: {
    login: "/auth/login",
    register: "/auth/register",
    emailConfirmation: "/auth/email-confirmation",
    resetPassword: "/auth/reset-password",
    forgotPassword: "/auth/forgot-password",
  },
  products: "/products",
  checkout: {
    productsList: "/checkout",
    success: "/checkout/success",
    cancel: "/checkout/cancel",
  },
  blog: "/blog",
  faqs: "/faqs",
  contact: "/contact",
  profile: "/profile",
  orders: "/orders",
  draft: "/draft",
  product: (id: string) => `/store/product/${id}`,
  category: (id: string) => `/store/category/${id}`,
};

export const pathAfterLogin = paths.home;
