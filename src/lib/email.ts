import { Resend } from "resend";
import { RESEND_API_KEY, EMAIL_FROM } from "$env/static/private";

const resend = new Resend(RESEND_API_KEY);

type SendEmailInput = {
    to: string;
    subject: string;
    text: string;
    html?: string;
};

export function sendEmail({ to, subject, text, html }: SendEmailInput) {
    return resend.emails.send({
        from: EMAIL_FROM,
        to,
        subject,
        text,
        html
    });
}
