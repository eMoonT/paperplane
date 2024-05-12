import { NextRequest, NextResponse } from "next/server";
import { getRequestContext } from "@cloudflare/next-on-pages";

export const runtime = 'edge';
export async function DELETE(
  request: NextRequest,
  { params }: { params: { key: string } }
) {
  const MY_KV = getRequestContext().env.KV_TEST;

  try {
    await MY_KV.delete(params.key);
    return NextResponse.json({ message: "Success" });
  } catch (error) {
    console.log(error);
    return new NextResponse(`Internet error`,{status: 500})
  }
}
