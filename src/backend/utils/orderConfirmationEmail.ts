import { sendEmail } from "@/backend/utils/sendEmail";

type OrderConfirmationEmailInput = {
    to: string;
    firstName?: string | null;
    subjectLabel: string;
    orderId?: string;
    tokensUsed?: number;
    amountLabel?: string;
    summary: string;
    details: Array<{ label: string; value: string }>;
    transactionDate?: Date;
};

function escapeHtml(value: string): string {
    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function formatDate(value: Date): string {
    return new Intl.DateTimeFormat("en-GB", {
        dateStyle: "medium",
        timeStyle: "short",
        timeZone: "UTC",
    }).format(value);
}

export async function sendOrderConfirmationEmail({
    to,
    firstName,
    subjectLabel,
    orderId,
    tokensUsed,
    amountLabel,
    summary,
    details,
    transactionDate = new Date(),
}: OrderConfirmationEmailInput) {
    const safeDetails = [
        ...(orderId ? [{ label: "Order ID", value: orderId }] : []),
        ...details,
        ...(typeof tokensUsed === "number"
            ? [{ label: "Tokens used", value: `${tokensUsed}` }]
            : []),
        ...(amountLabel ? [{ label: "Amount", value: amountLabel }] : []),
        [{ label: "Transaction date", value: formatDate(transactionDate) }],
    ];

    const introName = firstName?.trim() || "there";
    const textLines = [
        `Hi ${introName},`,
        "",
        `Your ${subjectLabel.toLowerCase()} was completed successfully.`,
        "",
        summary,
        "",
        ...safeDetails.map(({ label, value }) => `${label}: ${value}`),
    ];

    const html = `
      <div style="font-family: Arial, sans-serif; background:#f8f7f3; padding:24px; color:#2a241f;">
        <div style="max-width:640px; margin:0 auto; background:#ffffff; border:1px solid #f1e0d0; border-radius:16px; padding:32px;">
          <h2 style="margin:0 0 16px; color:#b46d2b;">${escapeHtml(subjectLabel)} Confirmation</h2>
          <p style="margin:0 0 12px; font-size:16px; line-height:1.6;">Hi ${escapeHtml(introName)},</p>
          <p style="margin:0 0 20px; font-size:16px; line-height:1.6;">${escapeHtml(summary)}</p>
          <div style="border:1px solid #f1e0d0; border-radius:12px; overflow:hidden;">
            ${safeDetails
                .map(
                    ({ label, value }, index) => `
                      <div style="display:flex; justify-content:space-between; gap:16px; padding:14px 16px; background:${index % 2 === 0 ? "#fffaf4" : "#ffffff"};">
                        <strong style="color:#5a4632;">${escapeHtml(label)}</strong>
                        <span style="text-align:right; color:#2a241f;">${escapeHtml(value)}</span>
                      </div>
                    `
                )
                .join("")}
          </div>
        </div>
      </div>
    `;

    try {
        await sendEmail(
            to,
            `${subjectLabel} Confirmation`,
            textLines.join("\n"),
            html
        );
    } catch (error) {
        console.error("❌ Failed to send order confirmation email:", error);
    }
}
