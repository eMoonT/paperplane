import { cookies } from "next/headers";
import { verifyJwtToken } from "./jwt";

/**
 * Checks if the current user session is authenticated based on the presence and validity of an auth cookie.
 *
 * @returns {Promise<boolean>} A promise that resolves to `true` if the user is authenticated, otherwise `false`.
 */
export default async function isAuth(secret: string): Promise<boolean> {
  // Attempt to retrieve the auth cookie from the cookie store
  const cookieStore = cookies();
  const authCookie = cookieStore.get("auth");
  // const authCookie = Cookies.get("auth");

  // If no auth cookie is found, log the event and return false
  if (!authCookie) {
    console.log("Auth cookie not found");
    return false;
  }

  // Verify the auth cookie's value (JWT token)
  const verifiedToken = await verifyJwtToken(authCookie.value,secret);

  // If the token is verified, log the event and return true, otherwise log the failure and return false
  if (verifiedToken) {
    console.log("Auth cookie verified");
    return true;
  } else {
    console.log("Auth cookie not verified");
    return false;
  }
}
