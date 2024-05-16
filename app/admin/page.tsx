import isAuth from "@/lib/is-auth"
import AdminPage from "./components/admin-page"
import AdminLogin from "./components/admin-login"
import { getRequestContext } from "@cloudflare/next-on-pages";

export const runtime = 'edge';

export default async function Admin () {
  const secret_key = getRequestContext().env.JWT_SECRET_KEY;

  return <>{await isAuth(secret_key) ? <AdminPage /> : <AdminLogin/>}</>
}
