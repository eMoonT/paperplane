import { NextRequest, NextResponse } from "next/server";
import { getRequestContext } from "@cloudflare/next-on-pages";
import isAuth from "@/lib/is-auth";

export const runtime = "edge";
export async function DELETE(
  request: NextRequest,
  { params }: { params: { key: string } }
) {

  const secret_key = getRequestContext().env.JWT_SECRET_KEY;
  const token = request.headers.get("Authorization")
  const login_status = await isAuth(secret_key)

  if (login_status === false && token === null || token === '') {
    return NextResponse.json({ message: "未授权" }, { status: 301 });
  }

  const MY_KV = getRequestContext().env.KV_TEST;

  try {
    await MY_KV.delete(params.key);
    return NextResponse.json({ message: "Success" });
  } catch (error) {
    return new NextResponse(`Server error`, { status: 500 });
  }
}
