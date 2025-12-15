import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { UserSchema } from "@/schemas/UserSchema";
import UserModel from "@/models/UserModel";
import bcrypt from "bcrypt";
import { signToken } from "@/lib/jwt";

export const POST = async (req: NextRequest, params: { params: string }) => {
  try {
    connectDB();
    const data = await req.json();
    const parsedData = UserSchema.safeParse(data);
    if (!parsedData.success) {
      
      return NextResponse.json(
        { success: false,  errro:parsedData.error.issues },
        { status: 400 }
      );
    }

    const { name, email, password } = parsedData.data;

    const findUser = await UserModel.findOne({ email });

    if (findUser) {
      return NextResponse.json(
        { success: false, message: "User already exits" },
        {
          status: 409,
        }
      );
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const new_user = await UserModel.create({
      name,
      email,
      password: hashPassword,
    });
    console.log(new_user);

    const token = signToken({ id: new_user._id });

    const res = NextResponse.json(
      {
        success: true,
        data: {
          id: new_user._id,
          name: new_user.name,
          email: new_user.email,
          createdAt: new_user.createdAt,
          
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
    if(error instanceof Error){
      return NextResponse.json({ success: false,error:error.message });
    }else{
      return NextResponse.json({success: false,error:error})
    }
  }
};
