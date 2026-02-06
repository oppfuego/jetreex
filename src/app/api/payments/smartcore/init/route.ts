import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const requestId = crypto.randomUUID();

    try {
        console.log("🟡 [SmartCore:init] START", { requestId });

        const body = await req.json();
        console.log("🟡 [SmartCore:init] Incoming body", { requestId, body });

        const { amount, currency, orderId, customer } = body;

        if (!process.env.SMARTCORE_MERCHANT_KEY || !process.env.SMARTCORE_SECRET_KEY) {
            console.error("🔴 [SmartCore:init] Missing credentials", { requestId });
            return NextResponse.json(
                { error: "Missing SmartCore credentials" },
                { status: 500 }
            );
        }

        const authBase64 = Buffer.from(
            `${process.env.SMARTCORE_MERCHANT_KEY}:${process.env.SMARTCORE_SECRET_KEY}`
        ).toString("base64");

        const payload = {
            account: process.env.SMARTCORE_ACCOUNT,
            amount,
            currency,
            order_id: orderId,

            customer_first_name: customer?.firstName,
            customer_last_name: customer?.lastName,
            customer_email: customer?.email,

            customer_city: customer?.city ?? "Bridgend",
            customer_zip_code: customer?.zipCode ?? "CF31 1JF",
            customer_address:
                customer?.address ?? "Academy House, 11 Dunraven Place",

            return_url: process.env.SMARTCORE_RETURN_URL,
            cancel_url: process.env.SMARTCORE_CANCEL_URL,
        };

        console.log("🟡 [SmartCore:init] Payload → SmartCore", {
            requestId,
            payload,
        });

        const res = await fetch(
            `${process.env.SMARTCORE_API_URL}/initPayment`,
            {
                method: "POST",
                headers: {
                    Authorization: `Basic ${authBase64}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            }
        );

        const rawText = await res.text();
        const data = rawText ? JSON.parse(rawText) : null;

        console.log("🟡 [SmartCore:init] Response", {
            requestId,
            status: res.status,
            data,
        });

        if (!res.ok) {
            return NextResponse.json(
                {
                    error: "SmartCore init failed",
                    smartcoreStatus: res.status,
                    smartcoreResponse: data,
                },
                { status: 400 }
            );
        }

        const redirectUrl = data?.redirect_url || data?.form_url;

        if (!redirectUrl) {
            return NextResponse.json(
                {
                    error: "No redirect URL from SmartCore",
                    smartcoreResponse: data,
                },
                { status: 400 }
            );
        }

        console.log("🟢 [SmartCore:init] SUCCESS", {
            requestId,
            redirectUrl,
        });

        return NextResponse.json({ redirectUrl });
    } catch (e: any) {
        console.error("💥 [SmartCore:init] UNHANDLED ERROR", {
            requestId,
            message: e?.message,
            stack: e?.stack,
        });

        return NextResponse.json(
            { error: "Internal error", details: e?.message },
            { status: 500 }
        );
    }
}
