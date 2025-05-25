import { NextRequest } from "next/server";
import jwt from 'jsonwebtoken'

type DecodedToken = {
  id: string;
  name: string;
  email: string;
};

export const getDataFromToken = (req: NextRequest) => {
    try {
        //first token is extracted from the cookie
        const token = req.cookies.get("token")?.value || '';

        //comparing the token with the secret key will decode the token information, now we have access to name, id, email or password
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET!) as DecodedToken;
        //return the result
        return decoded.id
    } catch (error: any) {
        throw new Error(`getDataFromToken is failing: ${error.message}`);

    }
}