import { NextResponse, NextRequest } from "next/server";
import { getRequestContext } from "@cloudflare/next-on-pages";

export const runtime = "edge";
export async function GET() {
  const MY_KV = getRequestContext().env.KV_TEST;

  const data = await MY_KV.list();
  data.keys.map((item) => {
    console.log(item.name);
    if (item.metadata !== undefined) {
      console.log(item.metadata);
    }
  });

  const newData = {
    keys: data.keys,
    total: data.keys.length,
  };

  return NextResponse.json(newData);
}
