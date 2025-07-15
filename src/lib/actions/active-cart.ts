"use server";

import { ActiveCart } from "../types/api/cart";
import { getData, postData } from "../utils/crud-fetch-api";

export async function getActiveCart() {
  const cart = await getData<ActiveCart>("/active-carts");

  if ("error" in cart) {
    throw new Error(cart.error);
  }

  return cart.data;
}

export async function addProductToActiveCart(
  productId: string,
  quantity: number,
) {
  const cart = await postData<ActiveCart, any>("/active-carts/add", {
    productId,
    quantity,
  });

  if ("error" in cart) {
    throw new Error(cart.error);
  }

  return cart.data;
}

export async function addMultipleProductsToActiveCart(
  products: { productId: string; quantity: number }[],
) {
  const cart = await postData<ActiveCart, any>("/active-carts/add-multiple", {
    products,
  });

  if ("error" in cart) {
    throw new Error(cart.error);
  }

  return cart.data;
}

export async function removeProductFromActiveCart(
  productId: string,
  quantity: number,
) {
  const cart = await postData<ActiveCart, any>("/active-carts/remove", {
    productId,
    quantity,
  });

  if ("error" in cart) {
    throw new Error(cart.error);
  }

  return cart.data;
}
