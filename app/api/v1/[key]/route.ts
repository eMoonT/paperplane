// import type { NextRequest } from 'next/server'
import { NextResponse, NextRequest } from "next/server";
import { getRequestContext } from "@cloudflare/next-on-pages";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from 'dayjs/plugin/utc'
import { ParamData } from "@/types";

export const runtime = "edge";

dayjs.extend(utc)
dayjs.extend(timezone)

type metadataProps = {
  expire: string;
  type: number;
  url: string;
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
    const data: ParamData = {
      key: params.key,
      value: kvValue,
      status: 0,
      expireTime: (metadata as metadataProps).expire,
      type: (metadata as metadataProps).type,
      url: (metadata as metadataProps).url,
    };
    return NextResponse.json(data);
  } catch (error) {
    return new NextResponse("Server error", { status: 500 });
  }
}

export async function POST(
  request: Request,
  { params }: { params: { data: string[] } }
) {
  try {
    const body: any = await request.json();
    const { code, text, expire, type } = body;
    const MY_KV = getRequestContext().env.KV_TEST;

    const url =  request.url.split('/api')[0] + `/${code}`

    let formattedTime, secendTime, futureTime;
    if (Number(expire) !== 0) {
      const now = dayjs();
      secendTime = Number(expire) * 60 * 60 * 24;

      futureTime = now.add(secendTime, "second");
      formattedTime = futureTime.tz("Asia/Shanghai").format("YYYY-MM-DD HH:mm:ss");

      await MY_KV.put(code, text, {
        expirationTtl: secendTime,
        metadata: { expireTime: formattedTime, content: text, type, url },
      });
    } else {
      formattedTime = "1970-01-01 00:00:00";
      await MY_KV.put(code, text, {
        metadata: { expireTime: formattedTime, content: text, type, url },
      });
    }

    const data: ParamData = {
      key: code,
      value: text,
      status: 0,
      expireTime: formattedTime,
      type,
      url
    };
    return NextResponse.json(data);
  } catch (error) {
    return new NextResponse(`Server error: ${error}`, { status: 500 });
  }
}
