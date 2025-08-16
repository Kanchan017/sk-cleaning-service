import { sendEmail } from "@/lib/email";
import { generateEmailHtml } from "@/lib/email-template";

export async function POST(req: Request) {
    try {
        const formData = await req.json();
        const formType = formData.formType || "Unknown";

        const html = generateEmailHtml(formType, formData);

        await sendEmail({
            to: process.env.RECIPIENT_EMAIL!,
            subject:
                formType === "Booking Request"
                    ? "New Booking Request"
                    : formType === "Quote Request"
                        ? "New Quote Enquiry"
                        : "New Contact Form Submission",
            html,
        });

        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (error) {
        console.error("Error in send-email route:", error);
        return new Response(
            JSON.stringify({ error: "Failed to send email" }),
            { status: 500 }
        );
    }
}
