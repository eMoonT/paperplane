// import type { NextRequest } from 'next/server'
import { NextResponse, NextRequest } from "next/server";
import { getRequestContext } from "@cloudflare/next-on-pages";
import dayjs from "dayjs";

export const runtime = "edge";

type metadataProps = {
  expire: string;
};
export async function GET(
  request: Request,
  { params }: { params: { key: string } }
) {

  try {
    const MY_KV = getRequestContext().env.KV_TEST;
    // await MY_KV.put(`kvTest`, `${Math.random()}`)
    const kvValue = await MY_KV.get(params.key);

    const { metadata } = await MY_KV.getWithMetadata(params.key);

    if (kvValue === null) {
      return NextResponse.json({ key: params.key, status: 1 });
    }
    const data = {
      key: params.key,
      value: kvValue,
      status: 0,
      expireTime: (metadata as metadataProps).expire,
    };
    return NextResponse.json(data);
  } catch (error) {
    return new NextResponse("Internet error", { status: 400 });
  }
}

export async function POST(
  request: Request,
  { params }: { params: { data: string[] } }
) {
  try {
    const body: any = await request.json();
    const { code, text, expire } = body;
    const MY_KV = getRequestContext().env.KV_TEST;

    const now = dayjs();
    const secendTime = Number(expire) * 60 * 60 * 24;

    const futureTime = now.add(secendTime, "second");
    const formattedTime = futureTime.format("YYYY-MM-DD HH:mm:ss");

    await MY_KV.put(code, text, {
      expirationTtl: secendTime,
      metadata: { expireTime: formattedTime, content: text },
    });
    return NextResponse.json({
      key: code,
      value: text,
      status: 0,
      expireTime: formattedTime,
    });
  } catch (error) {
    return new NextResponse(`Internet error: ${error}`, { status: 400 });
  }
}
