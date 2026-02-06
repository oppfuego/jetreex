"use client";

import { useRouter } from "next/navigation";
import ButtonUI from "@/components/ui/button/ButtonUI";

export default function CheckoutSuccessPage() {
    const router = useRouter();

    return (
        <div style={{ textAlign: "center", padding: "80px 20px" }}>
    <h1 style={{ fontSize: 56, color: "#ff7a00" }}>✅ Success</h1>
    <p style={{ marginTop: 16, fontSize: 18 }}>
    Tokens were successfully added to your account.
    </p>

    <div style={{ marginTop: 40 }}>
    <ButtonUI onClick={() => router.push("/dashboard")}>
    Go to Dashboard
    </ButtonUI>
    </div>
    </div>
);
}
