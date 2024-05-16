import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextResponse, NextRequest } from "next/server";
import { writeFile } from "fs/promises";
import { v4 as uuidv4 } from "uuid";
import { getRequestContext } from "@cloudflare/next-on-pages";

export const runtime = "edge";

export async function POST(req: Request, res: NextResponse) {
  const {
    R2_ACCOUNT_ID,
    R2_ACCESS_KEY_ID,
    R2_SECRET_KEY_ID,
    R2_BUCKET_NAME,
    PUBLIC_R2_URL,
  } = getRequestContext().env;

  const R2 = new S3Client({
    region: "auto",
    endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: R2_ACCESS_KEY_ID as string,
      secretAccessKey: R2_SECRET_KEY_ID as string,
    },
  });

  try {
    const data = await req.formData();
    const file: File | null = data.get("file") as unknown as File;

    if (!file) {
      return NextResponse.json({ success: false });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // 这里是你要进行保存的文件目录地址
    // const path = `/tmp/${file.name}`;
    // await writeFile(path, buffer);
    // console.log(`open ${path} to see the uploaded file`);

    const preSignedUrl = await getSignedUrl(
      R2,
      new PutObjectCommand({
        Bucket: R2_BUCKET_NAME,
        Key: `resources/${uuidv4()}/${file.name}`,
        ContentType: file.type,
      }),
      {
        expiresIn: 60 * 60 * 24 * 7,
      }
    );

    const file_url = preSignedUrl
      .split("?")[0]
      .replace(
        `https://${R2_BUCKET_NAME}.${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
        PUBLIC_R2_URL
      );

    fetch(preSignedUrl, {
      method: "PUT",
      body: buffer,
    });

    return NextResponse.json(
      { message: "Success", url: file_url },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
}
