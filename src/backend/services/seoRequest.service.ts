import { connectDB } from "../config/db";
import { SeoRequest } from "../models/seoRequest.model";
import { User } from "../models/user.model";
import { transactionService } from "../services/transaction.service";
import { sendEmail } from "../utils/sendEmail";
import { COMPANY_EMAIL } from "@/resources/constants";
import { sendOrderConfirmationEmail } from "@/backend/utils/orderConfirmationEmail";

export const seoRequestService = {
    /** Create new SEO request */
    async createSeoRequest(userId: string, email: string, body: any) {
        await connectDB();
        console.log("🚀 [seoRequestService.createSeoRequest] Start", {
            userId,
            email,
            service: body?.service,
        });

        if (!body?.service) throw new Error("Missing 'service'");
        const service = typeof body.service === "string" ? body.service.trim() : "";
        const message = typeof body.message === "string" ? body.message.trim() : "";
        const tokensUsed = Number(body.tokens || 5);
        const extras = Array.isArray(body.extras) ? body.extras : [];
        const extraValues =
            body.extraValues && typeof body.extraValues === "object" ? body.extraValues : {};
        const normalizedEmail = typeof email === "string" ? email.trim().toLowerCase() : "";

        const user = await User.findById(userId);
        if (!user) throw new Error("User not found");

        if (user.tokens < tokensUsed)
            throw new Error(`Insufficient tokens (have ${user.tokens}, need ${tokensUsed})`);

        user.tokens -= tokensUsed;
        await user.save();

        await transactionService.record(user._id, normalizedEmail, tokensUsed, "spend", user.tokens);

        const request = await SeoRequest.create({
            userId: user._id,
            email: normalizedEmail,
            service,
            message,
            extras,
            extraValues,
            tokensUsed,
        });

        console.log("✅ [seoRequestService.createSeoRequest] Request created", {
            requestId: request._id?.toString?.() || request._id,
            userId: user._id?.toString?.() || user._id,
            tokensUsed,
        });

        const text = `
New SEO Request Submitted:
----------------------------
User: ${normalizedEmail}
Service: ${service}
Tokens Used: ${tokensUsed}
Extras: ${extras?.length ? extras.join(", ") : "none"}
Message: ${message || "(none)"}
        `;

        try {
            await sendEmail(
                COMPANY_EMAIL ?? "",
                `📈 New SEO Request — ${service}`,
                text
            );
        } catch (error) {
            console.error("❌ [seoRequestService.createSeoRequest] Company email failed", error);
        }

        try {
            console.log("📧 [seoRequestService.createSeoRequest] Sending user confirmation", {
                to: user.email,
                firstName: user.firstName,
                subjectLabel: "SEO request",
                orderId: request._id?.toString?.() || "",
                status: request.status,
            });

            await sendOrderConfirmationEmail({
                to: user.email,
                firstName: user.firstName,
                subjectLabel: "SEO request",
                orderId: request._id?.toString(),
                tokensUsed,
                summary: "Thank you for your order. Your SEO request was submitted successfully.",
                details: [
                    { label: "Service", value: service || "SEO request" },
                    {
                        label: "Extras",
                        value: extras.length > 0 ? extras.join(", ") : "None",
                    },
                    { label: "Status", value: request.status || "pending" },
                ],
                transactionDate: request.createdAt ? new Date(request.createdAt) : new Date(),
            });
        } catch (error) {
            console.error("❌ [seoRequestService.createSeoRequest] User confirmation email failed", error);
        }

        return request.toObject({ flattenMaps: true });
    },

    /** Get all requests by user */
    async getUserRequests(userId: string) {
        await connectDB();
        return await SeoRequest.find({ userId }).sort({ createdAt: -1 }).lean();
    },

    /** Get all requests (admin only) */
    async getAllRequests() {
        await connectDB();
        return await SeoRequest.find().sort({ createdAt: -1 }).lean();
    },
};
