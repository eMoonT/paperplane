import { NextRequest, NextResponse } from "next/server";
import { getRequestContext } from "@cloudflare/next-on-pages";
import isAuth from "@/lib/is-auth";

export const runtime = "edge";
export async function DELETE(
  request: NextRequest,
  { params }: { params: { key: string } }
) {
  const token = request.headers.get("Authorization")
  const login_status = await isAuth()
  if (login_status === false && token === null || token === '') {
    return NextResponse.json({ message: "未授权" }, { status: 301 });
  }

  const MY_KV = getRequestContext().env.KV_TEST;

  try {
    await MY_KV.delete(params.key);
    return NextResponse.json({ message: "Success" });
  } catch (error) {
    console.log(error);
    return new NextResponse(`Internet error`, { status: 500 });
  }
}
