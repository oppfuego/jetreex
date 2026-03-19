import { sendEmail } from "@/backend/utils/sendEmail";

export type OrderDetail = {
    label: string;
    value: string;
};

type OrderConfirmationEmailInput = {
    to?: string | null;
    firstName?: string | null;
    subjectLabel?: string | null;
    orderId?: string | null;
    tokensUsed?: number | null;
    amountLabel?: string | null;
    summary?: string | null;
    details?: OrderDetail[] | null;
    transactionDate?: Date | string | null;
};

function normalizeText(value: unknown, fallback = ""): string {
    return typeof value === "string" ? value.trim() || fallback : fallback;
}

function escapeHtml(value: unknown): string {
    return normalizeText(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function normalizeDate(value: Date | string | null | undefined): Date {
    if (value instanceof Date && !Number.isNaN(value.getTime())) return value;
    if (typeof value === "string") {
        const parsed = new Date(value);
        if (!Number.isNaN(parsed.getTime())) return parsed;
    }
    return new Date();
}

function formatDate(value: Date | string | null | undefined): string {
    return new Intl.DateTimeFormat("en-GB", {
        dateStyle: "medium",
        timeStyle: "short",
        timeZone: "UTC",
    }).format(normalizeDate(value));
}

function normalizeDetails(details?: OrderDetail[] | null): OrderDetail[] {
    if (!Array.isArray(details)) return [];

    return details
        .map((detail): OrderDetail => ({
            label: normalizeText(detail?.label, "Detail"),
            value: normalizeText(detail?.value, "N/A"),
        }))
        .filter((detail) => Boolean(detail.label && detail.value));
}

export async function sendOrderConfirmationEmail({
    to,
    firstName,
    subjectLabel,
    orderId,
    tokensUsed,
    amountLabel,
    summary,
    details = [],
    transactionDate = new Date(),
}: OrderConfirmationEmailInput) {
    const safeTo = normalizeText(to);
    const safeFirstName = normalizeText(firstName, "there");
    const safeSubjectLabel = normalizeText(subjectLabel, "Order");
    const safeSummary = normalizeText(
        summary,
        "Your request was completed successfully."
    );
    const safeOrderId = normalizeText(orderId);
    const safeAmountLabel = normalizeText(amountLabel);
    const safeDetails: OrderDetail[] = [
        ...(safeOrderId ? [{ label: "Order ID", value: safeOrderId }] : []),
        ...normalizeDetails(details),
        ...(typeof tokensUsed === "number" && Number.isFinite(tokensUsed)
            ? [{ label: "Tokens used", value: String(tokensUsed) }]
            : []),
        ...(safeAmountLabel ? [{ label: "Amount", value: safeAmountLabel }] : []),
        [{ label: "Transaction date", value: formatDate(transactionDate) }],
    ];

    console.log("📨 [sendOrderConfirmationEmail] Payload", {
        to: safeTo,
        firstName: safeFirstName,
        subjectLabel: safeSubjectLabel,
        orderId: safeOrderId,
        summary: safeSummary,
        detailsCount: safeDetails.length,
    });

    if (!safeTo) {
        console.warn("⚠️ [sendOrderConfirmationEmail] Skipping: missing recipient");
        return null;
    }

    const textLines = [
        `Hi ${safeFirstName},`,
        "",
        `Your ${safeSubjectLabel.toLowerCase()} was completed successfully.`,
        "",
        safeSummary,
        "",
        ...safeDetails.map(({ label, value }) => `${label}: ${value}`),
    ];

    const html = `
      <div style="font-family: Arial, sans-serif; background:#f8f7f3; padding:24px; color:#2a241f;">
        <div style="max-width:640px; margin:0 auto; background:#ffffff; border:1px solid #f1e0d0; border-radius:16px; padding:32px;">
          <h2 style="margin:0 0 16px; color:#b46d2b;">${escapeHtml(safeSubjectLabel)} Confirmation</h2>
          <p style="margin:0 0 12px; font-size:16px; line-height:1.6;">Hi ${escapeHtml(safeFirstName)},</p>
          <p style="margin:0 0 20px; font-size:16px; line-height:1.6;">${escapeHtml(safeSummary)}</p>
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
        return await sendEmail(
            safeTo,
            `${safeSubjectLabel} Confirmation`,
            textLines.join("\n"),
            html
        );
    } catch (error) {
        console.error("❌ [sendOrderConfirmationEmail] Failed", error);
        throw error;
    }
}
