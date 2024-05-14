import { NextResponse, NextRequest } from "next/server";
import { getRequestContext } from "@cloudflare/next-on-pages";

export const runtime = "edge";
export async function POST(request: Request) {
  try {
    const passwd = getRequestContext().env.PASSWD;

    const body: any = await request.json();
    const { input }: {input: string} = body;

    const res =
      String(input) === String(passwd)
        ? { message: "Success" }
        : { message: "Fail" };
    return NextResponse.json(res);
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error",
      },
      { status: 500 }
    );
  }
}
