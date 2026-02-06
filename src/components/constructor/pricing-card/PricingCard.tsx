"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import styles from "./PricingCard.module.scss";
import ButtonUI from "@/components/ui/button/ButtonUI";
import { useAlert } from "@/context/AlertContext";
import { useUser } from "@/context/UserContext";
import Input from "@mui/joy/Input";
import { useCurrency } from "@/context/CurrencyContext";
import { useRouter } from "next/navigation";
import { useCheckoutStore } from "@/utils/store";
import {startSmartcorePayment} from "@/utils/startSmartcorePayment";
import {nanoid} from "nanoid";

const TOKENS_PER_GBP = 100;

interface PricingCardProps {
    variant?: "starter" | "pro" | "premium" | "custom";
    title: string;
    price: string;
    tokens: number;
    description: string;
    features: string[];
    buttonText: string;
    badgeTop?: string;
    badgeBottom?: string;
    index?: number;
}

const PricingCard: React.FC<PricingCardProps> = ({
                                                     variant = "starter",
                                                     title,
                                                     price,
                                                     tokens,
                                                     description,
                                                     features,
                                                     buttonText,
                                                     badgeTop,
                                                     badgeBottom,
                                                     index = 0,
                                                 }) => {
    const { showAlert } = useAlert();
    const user = useUser();
    const { currency, sign, convertFromGBP, convertToGBP } = useCurrency();
    const router = useRouter();
    const { setPlan } = useCheckoutStore();

    const [customAmount, setCustomAmount] = useState<number>(0.01);
    const isCustom = price === "dynamic";

    // 💷 Базова ціна у GBP
    const basePriceGBP = useMemo(() => {
        if (isCustom) return 0;
        const num = parseFloat(price.replace(/[^0-9.]/g, ""));
        return isNaN(num) ? 0 : num;
    }, [price, isCustom]);

    // 💰 Конвертація у поточну валюту
    const convertedPrice = useMemo(() => {
        if (isCustom) return 0;
        return convertFromGBP(basePriceGBP);
    }, [basePriceGBP, convertFromGBP, isCustom]);

    const handleBuy = async () => {
        if (!user) {
            showAlert("Please sign up", "You need to be signed in to purchase", "info");
            setTimeout(() => (window.location.href = "/sign-up"), 1200);
            return;
        }

        let priceGBP = basePriceGBP * 100;
        let tokensToSave = tokens;

        if (isCustom) {
            priceGBP = convertToGBP(customAmount * 100);
            tokensToSave = Math.floor(priceGBP * TOKENS_PER_GBP);
        }

        const orderId = `order_${nanoid(10)}`;

        // 🧠 КОСТИЛЬ: зберігаємо checkout ДО редіректа
        const checkoutData = {
            orderId,
            tokens: tokensToSave,
            amount: Number(priceGBP.toFixed(2)),
            currency: "EUR",
            status: "initiated",
            createdAt: Date.now(),
        };

        localStorage.setItem(
            "smartcore_checkout",
            JSON.stringify(checkoutData)
        );

        try {
            await startSmartcorePayment({
                amount: checkoutData.amount,
                currency: checkoutData.currency,
                orderId,
                customer: {
                    firstName: "Customer",
                    lastName: "Jetreex",
                    email: user.email,
                },
            });
        } catch (e) {
            // ❌ якщо навіть не стартануло
            localStorage.setItem(
                "smartcore_checkout",
                JSON.stringify({ ...checkoutData, status: "failed" })
            );

            showAlert("Payment error", "Unable to start payment", "error");
        }
    };


    // 🔢 Розрахунок токенів для dynamic input
    const tokensCalculated = useMemo(() => {
        const gbpEquivalent = convertToGBP(customAmount);
        return Math.floor(gbpEquivalent * TOKENS_PER_GBP);
    }, [customAmount, convertToGBP]);

    return (
        <motion.div
            className={`${styles.card} ${styles[variant]}`}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.15 }}
        >
            {badgeTop && <span className={styles.badgeTop}>{badgeTop}</span>}
            <h3 className={styles.title}>{title}</h3>

            {isCustom ? (
                <>
                    <div className={styles.inputWrapper}>
                        <Input
                            type="number"
                            value={customAmount}
                            onChange={(e) =>
                                setCustomAmount(
                                    e.target.value === "" ? 0.01 : Math.max(0.01, Number(e.target.value))
                                )
                            }
                            placeholder="Enter amount"
                            size="md"
                            startDecorator={sign}
                            slotProps={{
                                input: {
                                    min: 0.01,
                                    step: 0.01,
                                },
                            }}
                        />
                    </div>
                    <p className={styles.dynamicPrice}>
                        {sign}
                        {customAmount.toFixed(2)} {currency} ≈ {tokensCalculated} tokens
                    </p>
                </>
            ) : (
                <p className={styles.price}>
                    {sign}
                    {convertedPrice.toFixed(2)}{" "}
                    <span className={styles.tokens}>/ {tokens} tokens</span>
                </p>
            )}

            <p className={styles.description}>{description}</p>
            <ul className={styles.features}>
                {features.map((f, i) => (
                    <li key={i}>{f}</li>
                ))}
            </ul>

            <ButtonUI fullWidth onClick={handleBuy}>
                {user ? buttonText : "Sign Up to Buy"}
            </ButtonUI>

            {badgeBottom && <span className={styles.badgeBottom}>{badgeBottom}</span>}
        </motion.div>
    );
};

export default PricingCard;