import { verifyAccessToken } from "./jwt";
import { NextRequest } from "next/server";

export async function verifyJWT(req: Request | NextRequest): Promise<{ userId: string; email: string }> {
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new Error("Missing or invalid Authorization header");
    }

    const token = authHeader.split(" ")[1];
    try {
        const payload = await verifyAccessToken<{ sub: string; email: string }>(token);
        return { userId: payload.sub, email: payload.email };
    } catch (err: any) {
        console.error("JWT verification failed:", err.message);
        throw new Error("Invalid or expired token");
    }
}
