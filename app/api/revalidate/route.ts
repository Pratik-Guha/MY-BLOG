import { NextRequest,NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function GET(request:NextRequest) {
    
    const secret=request.nextUrl.searchParams.get("secret")
    if(secret !==process.env.REVALIDATE_SECRET){
        return new NextResponse(JSON.stringify({
            message:"Inavlid secret"
        }),{
            status:401,
            statusText:"Unauthorized",
            headers:{
                "Content-Type":"application/json"
            }
        })
    }
    const path=request.nextUrl.searchParams.get("path") || "/"

    revalidatePath(path)

    return NextResponse.json({revalidated:true})
}