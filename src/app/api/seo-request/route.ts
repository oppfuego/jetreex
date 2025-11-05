import { NextResponse } from "next/server";
import {seoRequestController} from "@/backend/controllers/seoRequesr.controller";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { userId, userEmail, service, message, tokens } = body;

        if (!userId || !userEmail || !service)
            throw new Error("Missing required fields");

        const data = await seoRequestController.createRequest(
            userId,
            userEmail,
            { service, message, tokens }
        );

        return NextResponse.json(data, { status: 200 });
    } catch (err: any) {
        console.error("❌ SEO-request error:", err);
        return NextResponse.json({ error: err.message }, { status: 400 });
    }
}
