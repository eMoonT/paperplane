import { NextResponse, NextRequest } from "next/server";
import { getRequestContext } from "@cloudflare/next-on-pages";
import { getJwtSecretKey } from "@/lib/jwt";
import { SignJWT } from "jose";
import { cookies } from "next/headers";

export const runtime = "edge";
export async function POST(request: Request) {
  try {
    const passwd = getRequestContext().env.PASSWD;
    const secret_key = getRequestContext().env.JWT_SECRET_KEY;

    const body: any = await request.json();
    const { input }: { input: string } = body;

    if (String(input) === String(passwd)) {
      const token = await new SignJWT({
        password: passwd,
        role: "admin",
      })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .sign(getJwtSecretKey(secret_key));

      cookies().set({
        name: "auth",
        value: token,
        secure: true,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
      });

      // Redirect the user to the home page
      return NextResponse.json({message:`Success`}, {
        // a 200 status is required to redirect from a POST to a GET route
        status: 200,
      });
    } else {
      // Redirect the user back to the login page if the password is incorrect
      return NextResponse.json({message: `Fail`}, {
        // a 200 status is required to redirect from a POST to a GET route
        status: 401,
      });
    }

  } catch (error) {
    return NextResponse.json(
      {
        message: "Error",
      },
      { status: 500 }
    );
  }
}
