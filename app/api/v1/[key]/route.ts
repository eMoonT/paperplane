// import type { NextRequest } from 'next/server'
import { NextResponse, NextRequest } from "next/server";
import { getRequestContext } from "@cloudflare/next-on-pages";
import { kv } from "@/utils/kv";

export const runtime = "edge";

export async function GET(
  request: Request,
  { params }: { params: { key: string } }
) {
  try {
  const MY_KV = getRequestContext().env.KV_TEST;
  // await MY_KV.put(`kvTest`, `${Math.random()}`)
  const kvValue = await MY_KV.get(params.key);
  console.log(kvValue)
  if (kvValue === null) {
    return NextResponse.json({"key": params.key, status: 1})
  }
  const data = {"key": params.key, "value": kvValue, status: 0}
  return NextResponse.json(data);
  } catch (error) {
    return new NextResponse("Internet error",{status: 400})
  }
}

export async function POST(
  request: Request,
  { params }: { params: { data: string[] } }
) {
  try {
  const body: any = await request.json();
  const { code, text } = body;
  const MY_KV = getRequestContext().env.KV_TEST;
  // console.log("POST:",params.data[0],params.data[1])
  await MY_KV.put(code, text);
  return NextResponse.json({"key": code, "value": text, status: 0})
  } catch {
    return new NextResponse("Internet error",{status: 400})
  }
}
