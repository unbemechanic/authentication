//log out page backend

import { NextResponse } from "next/server";

export async function GET() {
    try {
        //creating a message
        const response = NextResponse.json({
            message: "Logged out successfully!",
            success: true
        });
        //renewing token to 0
        response.cookies.set("token", "", {
            httpOnly: true,
            expires: new Date(0)
        })
        return response
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}