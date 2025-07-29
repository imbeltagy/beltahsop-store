import { paths } from "../config/paths";
import { postData } from "../utils/crud-fetch-api";

export async function createCheckoutSession() {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL;
  if (!appUrl) {
    throw new Error("NEXT_PUBLIC_APP_URL is not set");
  }

  const successUrl = `${appUrl}${paths.checkout.success}?sessionId={sessionId}`;
  const cancelUrl = `${appUrl}${paths.checkout.cancel}`;

  const res = await postData<{ url: string }, any>("/checkout/create-session", {
    successUrl,
    cancelUrl,
  });

  if ("error" in res) {
    throw new Error(res.error);
  }

  return res.data;
}
