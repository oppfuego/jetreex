"use client";
import React from "react";
import Grid from "../grid/Grid";
import styles from "./ValuesIcons.module.scss";
import { motion } from "framer-motion";

interface ValueItem {
    icon: string;
    title: string;
    description?: string;
    text?: string;
}

interface Props {
    title?: string;
    description?: string;
    values: ValueItem[];
}

const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
};

const ValuesIcons: React.FC<Props> = ({ title, description, values }) => {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.head}>
                    {title && <h2 className={styles.sectionTitle}>{title}</h2>}
                    {description && <p className={styles.sectionDesc}>{description}</p>}
                </div>

                <Grid columns={values.length > 3 ? 4 : values.length} gap="2rem">
                    {values.map((v, i) => (
                        <motion.div
                            key={i}
                            className={styles.valueCard}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                            variants={cardVariants}
                            transition={{ delay: i * 0.15, duration: 0.5, ease: "easeOut" }}
                        >
                            <div className={styles.icon}>{v.icon}</div>
                            <h3>{v.title}</h3>
                            <p>{v.description ?? v.text}</p>
                        </motion.div>
                    ))}
                </Grid>
            </div>
        </section>
    );
};

export default ValuesIcons;
