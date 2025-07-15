"use server";

import { DraftCart } from "../types/api/cart";
import { getData, postData } from "../utils/crud-fetch-api";

export async function getDraftCart() {
  const cart = await getData<DraftCart>("/draft-carts");

  if ("error" in cart) {
    throw new Error(cart.error);
  }

  return cart.data;
}

export async function addProductToDraftCart(
  productId: string,
  quantity: number,
) {
  const cart = await postData<DraftCart, any>("/draft-carts/add", {
    productId,
    quantity,
  });

  if ("error" in cart) {
    throw new Error(cart.error);
  }

  return cart.data;
}

export async function addMultipleProductsToDraftCart(
  products: { productId: string; quantity: number }[],
) {
  const cart = await postData<DraftCart, any>("/draft-carts/add-multiple", {
    products,
  });

  if ("error" in cart) {
    throw new Error(cart.error);
  }

  return cart.data;
}

export async function removeProductFromDraftCart(
  productId: string,
  quantity: number,
) {
  const cart = await postData<DraftCart, any>("/draft-carts/remove", {
    productId,
    quantity,
  });

  if ("error" in cart) {
    throw new Error(cart.error);
  }

  return cart.data;
}
