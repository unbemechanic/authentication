import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";





export const sendEmail = async ({email, emailType, uesrID}: any) => {
    try {
        //create hashed token
        const hashedToken = await bcrypt.hash(uesrID.toString(), 10);

        //creating new values to user of verifytoken and expiry
        

        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(uesrID, {
             verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000
        })
        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(uesrID, {
                forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000
            })
        }

        const transporter = nodemailer.createTransport({
            // Looking to send emails in production? Check out our Email API/SMTP product!
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.NODEMAILER_USER,
                pass: process.env.NODEMAILER_PASS,
             }} );
        const mailOptions = {
            from: process.env.NODEMAILER_USER,
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.domain}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}</p>`
        }

        //transporter ifonrmation is sent with mailOptions
        const mailResponse = await transporter.sendMail(mailOptions);
        return mailResponse;
    } catch (error: any) {
        throw new Error(error.message);
    }
}