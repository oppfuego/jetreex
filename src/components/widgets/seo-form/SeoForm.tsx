"use client";

import { useState } from "react";
import { useUser } from "@/context/UserContext";
import { useAlert } from "@/context/AlertContext";
import ButtonUI from "@/components/ui/button/ButtonUI";
import styles from "./SeoForm.module.scss";

interface SeoRequestFormProps {
    service: string;
    tokens: number;
    title?: string;
    description?: string;
}

export default function SeoRequestForm({ service, tokens, title, description }: SeoRequestFormProps) {
    const user = useUser();
    const { showAlert } = useAlert();
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!user) {
            showAlert("Login required", "Please log in to send a request.", "warning");
            return;
        }

        try {
            setLoading(true);
            const res = await fetch("/api/seo-request", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId: user._id,
                    userEmail: user.email,
                    service,
                    message,
                    tokens,
                }),
            });
            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.error || "Request failed");
            }
            setSuccess(true);
            showAlert("Success", "Your SEO request has been sent.", "success");
        } catch (err: any) {
            showAlert("Error", err.message, "error");
        } finally {
            setLoading(false);
        }
    }

    if (success) return <div className={styles.success}>✅ Request sent successfully!</div>;

    return (
        <section className={styles.section}>
            <h3>{title ?? `Request ${service}`}</h3>
            {description && <p>{description}</p>}
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.serviceInfo}>
                    <span>Service: {service}</span>
                    <span className={styles.tokens}>💰 {tokens} tokens</span>
                </div>

                <label htmlFor="message">Details</label>
                <textarea
                    id="message"
                    placeholder="Add any details about your site or goals..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />

                <ButtonUI
                    type="submit"
                    loading={loading}
                    fullWidth
                    color="secondary"
                    textColor="backgroundLight"
                    text={`Send Request (${tokens} tokens)`}
                />
            </form>
        </section>

    );
}
