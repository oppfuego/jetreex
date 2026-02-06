export async function startSmartcorePayment(payload: {
    amount: number;
    currency: string;
    orderId: string;
    customer: {
        firstName: string;
        lastName: string;
        email: string;
    };
}) {
    const res = await fetch("/api/payments/smartcore/init", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });

    const data = await res.json();

    const redirectUrl = data?.redirectUrl || data?.redirect_url || data?.form_url;

    if (!res.ok || !redirectUrl) {
        console.error("🔴 [SmartCore] Payment init failed", {
            status: res.status,
            data,
        });

        throw new Error(
            data?.error || "SmartCore payment initialization failed"
        );
    }

    // ✅ єдино правильна дія в клієнті
    window.location.href = redirectUrl;
}
