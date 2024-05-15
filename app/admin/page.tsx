import isAuth from "@/lib/is-auth"
import AdminPage from "./components/admin-page"
import AdminLogin from "./components/admin-login"

export const runtime = 'edge';

export default async function Admin () {

  return <>{await isAuth() ? <AdminPage /> : <AdminLogin/>}</>
}
