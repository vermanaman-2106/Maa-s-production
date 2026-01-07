import { Resend } from "resend";
import type { AvailabilityPayload } from "./validation";

const resendApiKey = process.env.RESEND_API_KEY;
const defaultRecipient = process.env.MP_INQUIRY_EMAIL;
const defaultFrom = process.env.MP_FROM_EMAIL || "Maa's Production <no-reply@maasproduction.in>";

export function getResendClient() {
  if (!resendApiKey) {
    throw new Error("RESEND_API_KEY is not configured.");
  }
  return new Resend(resendApiKey);
}

export function buildInquiryEmailHtml(data: AvailabilityPayload) {
  const { name, whatsapp, weddingDate, city } = data;

  return `
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#FFF7F2;padding:32px 0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#2E2E2E;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:18px;border:1px solid #E6DDD8;padding:28px 32px;">
          <tr>
            <td style="font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#6B6B6B;padding-bottom:12px;">
              New wedding inquiry · Maa's Production
            </td>
          </tr>
          <tr>
            <td style="font-size:22px;line-height:1.3;font-weight:500;padding-bottom:18px;">
              Someone just checked availability for their wedding.
            </td>
          </tr>
          <tr>
            <td style="font-size:14px;line-height:1.7;color:#6B6B6B;padding-bottom:18px;">
              A new couple has reached out to Maa's Production to explore wedding photography and filmmaking. Here are their details:
            </td>
          </tr>
          <tr>
            <td>
              <table width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;line-height:1.6;color:#2E2E2E;">
                <tr>
                  <td width="140" style="color:#6B6B6B;padding:4px 0;">Name</td>
                  <td style="padding:4px 0;"><strong>${name}</strong></td>
                </tr>
                <tr>
                  <td width="140" style="color:#6B6B6B;padding:4px 0;">WhatsApp</td>
                  <td style="padding:4px 0;">${whatsapp}</td>
                </tr>
                <tr>
                  <td width="140" style="color:#6B6B6B;padding:4px 0;">Wedding Date</td>
                  <td style="padding:4px 0;">${weddingDate}</td>
                </tr>
                <tr>
                  <td width="140" style="color:#6B6B6B;padding:4px 0;">City</td>
                  <td style="padding:4px 0;">${city}</td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding-top:22px;font-size:13px;line-height:1.6;color:#6B6B6B;">
              Reply directly on WhatsApp to create a warm, human-first experience. Maa's Production works with a limited number of weddings per year, so following up soon will help them feel held.
            </td>
          </tr>
        </table>
        <div style="font-size:11px;color:#A0A0A0;padding-top:16px;">
          This email was sent automatically from the Maa's Production website.
        </div>
      </td>
    </tr>
  </table>
  `;
}

export async function sendAvailabilityEmail(data: AvailabilityPayload) {
  const resend = getResendClient();

  const to = defaultRecipient;
  if (!to) {
    throw new Error("MP_INQUIRY_EMAIL is not configured.");
  }

  const html = buildInquiryEmailHtml(data);

  await resend.emails.send({
    from: defaultFrom,
    to,
    subject: "New Wedding Inquiry for Maa's Production 💍",
    html,
  });
}


