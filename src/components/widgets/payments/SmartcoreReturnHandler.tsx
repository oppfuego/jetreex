"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

const CHECKOUT_KEY = "smartcore_checkout";

export default function SmartcoreReturnHandler() {
    const router = useRouter();
    const ranRef = useRef(false);

    useEffect(() => {
        if (ranRef.current) return;
        ranRef.current = true;

        const raw = localStorage.getItem(CHECKOUT_KEY);
        if (!raw) return; // ⛔ НІЯКОГО редіректа

        const checkout = JSON.parse(raw);
        if (checkout.processed) return;

        fetch("/api/user/buy-tokens", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ amount: checkout.tokens }),
        })
            .catch(() => {
                // ❗ dev-mode: ігноруємо
            })
            .finally(() => {
                localStorage.setItem(
                    CHECKOUT_KEY,
                    JSON.stringify({ ...checkout, processed: true })
                );

                setTimeout(() => {
                    localStorage.removeItem(CHECKOUT_KEY);
                }, 500);

                router.replace("/checkout/success");
            });
    }, [router]);

    return null;
}
