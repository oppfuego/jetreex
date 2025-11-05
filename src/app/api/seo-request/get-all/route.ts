import {SeoRequest} from "@/backend/models/seoRequest.model";
import { NextResponse } from "next/server";
import {connectDB} from "@/backend/config/db";

export async function GET(req: Request) {
    try {
        await connectDB();
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get("userId");
        if (!userId) throw new Error("Missing userId");

        const requests = await SeoRequest.find({ userId })
            .sort({ createdAt: -1 })
            .lean();

        return NextResponse.json({ requests }, { status: 200 });
    } catch (err: any) {
        console.error("❌ get-all seo requests:", err);
        return NextResponse.json({ error: err.message }, { status: 400 });
    }
}
