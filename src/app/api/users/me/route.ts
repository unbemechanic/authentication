import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect()

export async function GET(req: NextRequest) {
    try {
        const userID = await getDataFromToken(req);
        if(!userID) throw new Error("user ID is not found")
        const user = await User.findOne({_id: userID}).select("-password");
        if (!user) return NextResponse.json({ message: "User not found" }, { status: 404 });
        return NextResponse.json({
            message: 'User found',
            data: user
        })

    } catch (error: any) {
        return NextResponse.json({
            error: error.message
        },{status: 400})
    }
}