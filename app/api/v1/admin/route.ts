import { NextResponse, NextRequest } from "next/server";
import { getRequestContext } from "@cloudflare/next-on-pages";
import { cookies } from "next/headers";
import isAuth from "@/lib/is-auth";

export const runtime = "edge";
export async function GET(request: Request) {

  const secret_key = getRequestContext().env.JWT_SECRET_KEY;
  const token = request.headers.get("Authorization")

  const login_status = await isAuth(secret_key)
  if (login_status === false && token === null || token === '') {
    return NextResponse.json({ message: "未授权" }, { status: 301 });
  }

  const MY_KV = getRequestContext().env.KV_TEST;

  const data = await MY_KV.list();
  // data.keys.map((item) => {
  //   console.log(item.name);
  //   if (item.metadata !== undefined) {
  //     console.log(item.metadata);
  //   }
  // });

  const newData = {
    keys: data.keys,
    total: data.keys.length,
  };

  return NextResponse.json(newData);
}
