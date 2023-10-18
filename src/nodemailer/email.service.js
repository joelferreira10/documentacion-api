import { createTransport } from "nodemailer";
import 'dotenv/config'
export const transporter=createTransport({
    service:"gmail",
    port:465,
    secure:true,
    auth:{
        user:process.env.USER,
        pass:process.env.PASS
    },
    tls:{
rejectUnauthorized: false
    }
})