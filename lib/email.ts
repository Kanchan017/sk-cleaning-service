import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface EmailOptions {
    to: string;
    subject: string;
    html: string;
}

export async function sendEmail({ to, subject, html }: EmailOptions) {
    try {
        await resend.emails.send({
            from: process.env.EMAIL_FROM || "Website <onboarding@resend.dev>",
            to,
            subject,
            html,
        });
        console.log(`✅ Email sent successfully to: ${to}`);
    } catch (error) {
        console.error("❌ Error sending email:", error);
        throw new Error("Failed to send email.");
    }
}
