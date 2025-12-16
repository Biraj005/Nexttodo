import { verifyToken } from "@/lib/jwt";
import { Todo } from "@/models/TodoModel";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";


export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ todoId: string }> }
) {
  try {
    const { todoId } = await context.params;
    const cookieStore = await cookies();

    const token = cookieStore.get("token")?.value;
   

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Invalid credintals" },
        {
          status: 400,
        }
      );
    }

    
    const payload: any = verifyToken(token);
    const id = payload.id;
    
    const findTodo = await Todo.findById(todoId);
    if (!findTodo) {
      return NextResponse.json(
        { success: false, message: "Todo not found" },
        {
          status: 404,
        }
      );
    }

    

    if (id !== findTodo.userId.toString()) {
      return NextResponse.json(
        { success: false, message: "Invalid credintails" },
        {
          status: 404,
        }
      );
    }
    await Todo.findByIdAndUpdate(todoId,{
        completed:true
    })
    return NextResponse.json({
      success: true,
      message: "Todo updated",
      todoId,
    });
  } catch (error) {}
}
