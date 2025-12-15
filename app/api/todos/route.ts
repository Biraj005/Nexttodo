import { NextRequest, NextResponse } from "next/server";
import { Todo } from "@/models/TodoModel";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/jwt";
import UserModel from "@/models/UserModel";
import { connectDB } from "@/lib/db";
export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const payload: any = verifyToken(token);
    const userId = payload.id;

    const find_user = await UserModel.findById(userId);
    if (!find_user) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const todos = await Todo.find({ userId: userId });

    return NextResponse.json({ status: 200, todos: todos });
  } catch (error) {
    if (error instanceof Error) {
      console.error("GET /api/todos error:", error.message);
    }
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
