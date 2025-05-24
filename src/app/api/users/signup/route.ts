import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

connect();

export async function POST (req: NextRequest) { 
    try {
        //extract data from body, which is comming from client input, and turning it into json file
        const reqBody = await req.json();

        //extracting the user id from the request body
        const { username, email, password } = reqBody;

        //checks if user exists
        const user = await User.findOne({email});
        if (user) {
            return NextResponse.json({error: "User already exists!"}, {status: 400}) 
        }

        //hash the password
        //first, before hashing the password, salt is created, which is random string added to password before hashing
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //create user
       const newUser = new User ({
            username,
            email,
            password: hashedPassword
        });
        //save user to database
       const savedUser = await newUser.save();
       console.log(savedUser)
       //for execution and termination of function it needs to be returned
       return NextResponse.json({message: "User created successfully!"}, {status: 201})
        
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
 }