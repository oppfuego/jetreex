"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import styles from "./TestimonialsSlider.module.scss";
import { MdStar, MdStarBorder } from "react-icons/md";
import { media } from "@/resources/media"; // ✅ імпорт зображень

interface Testimonial {
    name: string;
    role?: string;
    image?: string; // зберігаємо лише ключ (наприклад, "review1")
    text: string;
    rating?: number;
}

interface Props {
    title?: string;
    description?: string;
    testimonials: Testimonial[];
}

export default function TestimonialsSlider({ title, description, testimonials }: Props) {
    const sliderRef = useRef<HTMLDivElement>(null);
    const innerRef = useRef<HTMLDivElement>(null);
    const [width, setWidth] = useState(0);

    // 🔢 Вираховуємо ширину контенту для drag-прокрутки
    useEffect(() => {
        const handleResize = () => {
            if (sliderRef.current && innerRef.current) {
                const totalWidth = innerRef.current.scrollWidth - sliderRef.current.offsetWidth;
                setWidth(totalWidth > 0 ? totalWidth : 0);
            }
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [testimonials]);

    return (
        <section className={styles.section}>
            {title && <h2 className={styles.title}>{title}</h2>}
            {description && <p className={styles.description}>{description}</p>}

            <motion.div ref={sliderRef} className={styles.slider} whileTap={{ cursor: "grabbing" }}>
                <motion.div
                    ref={innerRef}
                    drag="x"
                    dragConstraints={{ right: 0, left: -width }}
                    dragElastic={0.1}
                    className={styles.inner}
                >
                    {testimonials.map((t, i) => {
                        // 🧩 Отримуємо зображення з media або залишаємо null
                        const imageCandidate =
                            t.image && media[t.image as keyof typeof media]
                                ? media[t.image as keyof typeof media]
                                : null;

                        // Якщо імпортований ресурс — об'єкт (StaticImageData у Next.js), використовуємо .src
                        const imageSrc: string | null = imageCandidate
                            ? typeof imageCandidate === "string"
                                ? imageCandidate
                                : (imageCandidate as any).src ?? String(imageCandidate)
                            : null;

                        return (
                            <motion.div
                                key={i}
                                className={styles.card}
                                whileHover={{ scale: 1.02, y: -4 }}
                                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                            >
                                {imageSrc && <img src={imageSrc} alt={t.name} className={styles.avatar} />}

                                <p className={styles.text}>“{t.text}”</p>

                                <div className={styles.footer}>
                                    <div className={styles.info}>
                                        <h4 className={styles.name}>{t.name}</h4>
                                        {t.role && <p className={styles.role}>{t.role}</p>}
                                    </div>

                                    <div className={styles.stars}>
                                        {Array.from({ length: 5 }).map((_, idx) =>
                                            idx < (t.rating ?? 5) ? (
                                                <MdStar key={idx} className={styles.starFilled} />
                                            ) : (
                                                <MdStarBorder key={idx} className={styles.starEmpty} />
                                            )
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </motion.div>
        </section>
    );
}
