"use client";

import React, { useEffect, useState } from "react";
import styles from "./Checkout.module.scss";
import { useCheckoutStore } from "@/utils/store";

const Checkout = () => {
    const { plan, setPlan } = useCheckoutStore();
    const [activePlan, setActivePlan] = useState(plan);

    useEffect(() => {
        if (!plan) {
            const stored = localStorage.getItem("selectedPlan");
            if (stored) {
                const parsed = JSON.parse(stored);
                setPlan(parsed);
                setActivePlan(parsed);
            }
        } else {
            setActivePlan(plan);
        }
    }, [plan, setPlan]);

    if (!activePlan)
        return (
            <div className={styles.checkoutEmpty}>
                <p>
                    No plan selected. Please go back to <a href="/pricing">Pricing</a>.
                </p>
            </div>
        );

    const vat = activePlan.price * 0.2;
    const total = activePlan.price + vat;

    return (
        <div className={styles.checkout}>
            <div className={styles.header}>
                <h1>Checkout</h1>
                <p>Secure Payment</p>
            </div>

            <div className={styles.main}>
                {/* LEFT SIDE */}
                <div className={styles.summary}>
                    <h2>Order Summary</h2>

                    <div className={styles.itemRow}>
                        <div className={styles.itemInfo}>
                            <h3>{activePlan.title}</h3>
                            <p>
                                Top-up {activePlan.price.toFixed(2)} {activePlan.currency}
                            </p>
                        </div>
                        <span>
              {activePlan.price.toFixed(2)} {activePlan.currency}
            </span>
                    </div>

                    <div className={styles.line}></div>

                    <div className={styles.itemRow}>
                        <p>Subtotal</p>
                        <span>
              {activePlan.price.toFixed(2)} {activePlan.currency}
            </span>
                    </div>

                    <div className={styles.itemRow}>
                        <p>VAT (20%)</p>
                        <span>
              {vat.toFixed(2)} {activePlan.currency}
            </span>
                    </div>

                    <div className={styles.totalRow}>
                        <h3>Total</h3>
                        <h3>
                            {total.toFixed(2)} {activePlan.currency}
                        </h3>
                    </div>

                    <p className={styles.note}>
                        You are purchasing <strong>{activePlan.title}</strong> plan.
                        <br />
                        A detailed invoice will be sent to your registered email.
                    </p>
                </div>

                {/* RIGHT SIDE */}
                <div className={styles.payment}>
                    <h2>Payment Details</h2>
                    <form>
                        <input type="text" placeholder="Card number" />
                        <div className={styles.row}>
                            <input type="text" placeholder="MM/YY" />
                            <input type="text" placeholder="CVV" />
                        </div>
                        <input type="text" placeholder="Cardholder name" />
                        <input type="text" placeholder="Billing address" />
                        <div className={styles.row}>
                            <input type="text" placeholder="City" />
                            <input type="text" placeholder="Postal code" />
                        </div>

                        <button type="submit">
                            Pay {total.toFixed(2)} {activePlan.currency}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
