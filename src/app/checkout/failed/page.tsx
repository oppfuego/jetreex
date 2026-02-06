"use client";

import { useRouter } from "next/navigation";
import ButtonUI from "@/components/ui/button/ButtonUI";

export default function CheckoutFailedPage() {
    const router = useRouter();

    return (
        <div style={{ textAlign: "center", padding: "80px 20px" }}>
            <h1 style={{ fontSize: 56, color: "#e53935" }}>❌ Payment Failed</h1>
            <p style={{ marginTop: 16, fontSize: 18 }}>
                Payment was not completed. No tokens were added.
            </p>

            <div style={{ marginTop: 40, display: "flex", gap: 16, justifyContent: "center" }}>
                <ButtonUI onClick={() => router.push("/pricing")}>
                    Try Again
                </ButtonUI>
                <ButtonUI onClick={() => router.push("/")}>
                    Go Home
                </ButtonUI>
            </div>
        </div>
    );
}
