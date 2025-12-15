import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import UserModel from "@/models/UserModel";
import bcrypt from "bcrypt";
import { signToken } from "@/lib/jwt";

export const POST = async (req: NextRequest, params: { params: string }) => {
  try {
    await connectDB();
    const data = await req.json();
    const { email, password } = data;
    if (!email || !password) {
      return NextResponse.json({ success: false, message: "Invalid details" });
    }
    const normalizedEmail = email.toLowerCase().trim();

    const findUser = await UserModel.findOne({
      email: normalizedEmail,
    });

   
    if (!findUser) {
      return NextResponse.json(
        { success: false, message: "User  Not found" },
        {
          status: 409,
        }
      );
    }
    console.log(password, findUser.password);

    const comparepassword = await bcrypt.compare(password, findUser.password);
    if (!comparepassword) {
      return NextResponse.json({ success: false, message: "Invalid details" });
    }
    const token = signToken({ id: findUser._id });
    const res = NextResponse.json(
      {
        success: true,
        user: {
          name: findUser.name,
          email: findUser.email,
        },
      },
      { status: 201 }
    );

    res.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
    return res;
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ success: false, error: error.message });
    } else {
      return NextResponse.json({ success: false, error: error });
    }
  }
};
