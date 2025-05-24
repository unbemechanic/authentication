import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async  function POST(req: NextRequest) {
   try {
    const reqBody = req.body;
    const {email, password} = await req.json();

    //check if user exists
    const user = await User.findOne({email});
    if(!user){
        return NextResponse.json("User not found", {status: 400});
    }
    

    //check password
    const validPassword = await bcrypt.compare(password, user.password);
    
    //incorrect password
    if(!validPassword){
        return NextResponse.json("Incorrect password", {status: 400});
    }
    //create token data
    const tokenData = {id: user._id, name: user.name, email: user.email};

    //creating a token - it includes token data, token secret key, and expiry time
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "1h"});
    const response = NextResponse.json({token, message: "Logged in successfully", id: user._id}, {status: 200});
    response.cookies.set("token", token, {
        httpOnly: true,
    })
    console.log(reqBody)
    return response

   } catch (error: any) {
    return NextResponse.json({error: error.message}, {status: 500});
   } 
}