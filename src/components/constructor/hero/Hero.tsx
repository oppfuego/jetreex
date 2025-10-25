"use client";

import React from "react";
import styles from "./Hero.module.scss";
import { motion } from "framer-motion";
import ButtonUI from "@/components/ui/button/ButtonUI";
import Image from "next/image";
import { media } from "@/resources/media";
import type { StaticImageData } from "next/image";
import Link from "next/link";
import TrustBadge from "@/components/features/trust-badge/TrustBadge";

interface HeroSectionProps {
    title: string;
    highlight?: string;
    description: string;
    primaryCta?: { text: string; link: string };
    secondaryCta?: { text: string; link: string };
    image?: string;
    align?: "left" | "right";
    showTrustBadge?: boolean; // ➕ нове поле
}

const HeroSection: React.FC<HeroSectionProps> = ({
                                                     title,
                                                     highlight,
                                                     description,
                                                     primaryCta,
                                                     secondaryCta,
                                                     image,
                                                     align = "right",
                                                     showTrustBadge = false, // ➕ значення за замовчуванням
                                                 }) => {
    const bgImage = image
        ? (media as Record<string, string | StaticImageData>)[image]
        : undefined;

    const imageSrc =
        typeof bgImage === "string"
            ? bgImage
            : (bgImage as StaticImageData)?.src || "";

    const orientationClass =
        align === "left" ? styles.hero__reverse : styles.hero__default;

    return (
        <section className={`${styles.hero} ${orientationClass}`}>
            <div className={styles.hero__inner}>
                <motion.div
                    className={styles.hero__content}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className={styles.hero__title}>
                        {title}{" "}
                        {highlight && (
                            <span className={styles.hero__highlight}>{highlight}</span>
                        )}
                    </h1>

                    <p className={styles.hero__desc}>{description}</p>

                    <div className={styles.hero__spacer}>
                        <div className={styles.hero__actions}>
                            {primaryCta && (
                                <Link href={primaryCta.link} className={styles.hero__link}>
                                    <ButtonUI
                                        variant="solid"
                                        color="secondary"
                                        size="lg"
                                        hoverEffect="none"
                                        hoverColor="primary"
                                    >
                                        {primaryCta.text}
                                    </ButtonUI>
                                </Link>
                            )}

                            {secondaryCta && (
                                <Link href={secondaryCta.link} className={styles.hero__link}>
                                    <ButtonUI
                                        variant="outlined"
                                        color="primary"
                                        size="lg"
                                        hoverEffect="none"
                                        hoverTextColor="secondary"
                                    >
                                        {secondaryCta.text}
                                    </ButtonUI>
                                </Link>
                            )}
                        </div>

                        {/* ➕ показуємо бейдж тільки якщо вказано showTrustBadge */}
                        {showTrustBadge && <TrustBadge />}
                    </div>
                </motion.div>

                <motion.div
                    className={styles.hero__imageWrapper}
                    initial={{ opacity: 0, x: align === "left" ? -80 : 80 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                >
                    {imageSrc && (
                        <Image
                            src={imageSrc}
                            alt="Hero Illustration"
                            fill
                            className={styles.hero__image}
                            priority
                        />
                    )}
                </motion.div>
            </div>
        </section>
    );
};

export default HeroSection;
