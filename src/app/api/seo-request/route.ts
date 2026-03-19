import { NextResponse } from "next/server";
import {seoRequestController} from "@/backend/controllers/seoRequesr.controller";

export async function POST(req: Request) {
    try {
        console.log("📥 [seo-request.route] Start");
        let body: any = {};
        const contentType = req.headers.get("content-type") || "";

        // ✅ Якщо запит JSON
        if (contentType.includes("application/json")) {
            body = await req.json();
        }
        // 📂 Якщо multipart/form-data
        else if (contentType.includes("multipart/form-data")) {
            const formData = await req.formData();

            body = {
                userId: formData.get("userId")?.toString().trim() || "",
                userEmail: formData.get("userEmail")?.toString().trim().toLowerCase() || "",
                service: formData.get("service")?.toString().trim() || "",
                message: formData.get("message")?.toString().trim() || "",
                tokens: Number(formData.get("tokens") || 0),
                extras: [],
                extraValues: {},
            };

            try {
                const extrasRaw = formData.get("extras");
                const extraValuesRaw = formData.get("extraValues");
                if (extrasRaw) body.extras = JSON.parse(extrasRaw as string);
                if (extraValuesRaw) body.extraValues = JSON.parse(extraValuesRaw as string);
            } catch (err) {
                console.warn("⚠️ Could not parse extras or extraValues:", err);
            }

            for (const [key, value] of formData.entries()) {
                if (value instanceof File) {
                    if (!body.files) body.files = {};
                    body.files[key] = value.name;
                }
            }
        } else {
            return NextResponse.json(
                { error: "Unsupported Content-Type" },
                { status: 400 }
            );
        }

        const userId = typeof body.userId === "string" ? body.userId.trim() : "";
        const userEmail =
            typeof body.userEmail === "string" ? body.userEmail.trim().toLowerCase() : "";
        const service = typeof body.service === "string" ? body.service.trim() : "";
        const message = typeof body.message === "string" ? body.message.trim() : "";
        const tokens = Number(body.tokens || 0);
        const extras = Array.isArray(body.extras) ? body.extras : [];
        const extraValues =
            body.extraValues && typeof body.extraValues === "object" ? body.extraValues : {};

        if (!userId || !userEmail || !service) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        console.log("📦 [seo-request.route] Normalized payload", {
            userId,
            userEmail,
            service,
            tokens,
            extrasCount: extras.length,
            extraValueKeys: Object.keys(extraValues),
        });

        const data = await seoRequestController.createRequest(userId, userEmail, {
            service,
            message,
            tokens,
            extras,
            extraValues,
        });

        return NextResponse.json(data, { status: 200 });
    } catch (err: any) {
        console.error("❌ SEO-request error:", err);
        return NextResponse.json({ error: err.message }, { status: 400 });
    }
}
