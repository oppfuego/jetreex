"use client";

import React from "react";
import styles from "./TrustBadge.module.scss";
import { Star } from "lucide-react";

const TrustBadge = () => {
    return (
        <div className={styles.badge}>
            <div className={styles.badgeContent}>
                <span className={styles.badge__label}>Excellent</span>
                <div className={styles.badge__stars}>
                    {[1, 2, 3, 4].map((i) => (
                        <Star
                            key={i}
                            size={18}
                            className={`${styles.star} ${styles.star__filled}`}
                        />
                    ))}
                    <div className={styles.halfStarWrapper}>
                        <Star size={18} className={`${styles.star} ${styles.star__empty}`} />
                        <Star size={18} className={`${styles.star} ${styles.star__half}`} />
                    </div>
                </div>
            </div>

            <div className={styles.badge__brand}>
                <Star className={styles.brand__icon} size={18} />
                <span className={styles.brand__text}>Trustmark</span>
            </div>
        </div>
    );
};

export default TrustBadge;
