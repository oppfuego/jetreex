"use client";
import React from "react";
import { motion } from "framer-motion";
import styles from "./Timeline.module.scss";

interface Step {
    title: string;
    description: string;
}

interface TimelineProps {
    title?: string;
    steps: Step[];
}

const Timeline: React.FC<TimelineProps> = ({ title, steps }) => {
    return (
        <section className={styles.timelineSection}>
            <div className={styles.container}>
                {title && <h2 className={styles.title}>{title}</h2>}

                <div className={styles.cardsGrid}>
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            className={styles.card}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.15, duration: 0.5, ease: "easeOut" }}
                            viewport={{ once: true, amount: 0.3 }}
                        >
                            <div className={styles.number}>{index + 1}</div>
                            <div className={styles.cardBody}>
                                <h4 className={styles.cardTitle}>{step.title}</h4>
                                <p className={styles.cardDescription}>{step.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Timeline;
