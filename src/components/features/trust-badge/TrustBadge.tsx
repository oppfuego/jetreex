"use client";

import React from "react";
import styles from "./TrustBadge.module.scss";
import { Star } from "lucide-react";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";

const TrustBadge = () => {
    return (
        <div className={styles.badge}>
            <div className={styles.topRow}>
                <span className={styles.label}>Excellent</span>
                <Box className={styles.ratingBox}>
                    <Rating
                        name="read-only"
                        value={4.5}
                        precision={0.1}
                        readOnly
                        size="small"
                        sx={{
                            color: "#fbbf24",
                            "& .MuiRating-iconEmpty": {
                                color: "rgba(255,255,255,0.25)",
                            },
                            "& .MuiRating-iconFilled": {
                                color: "#fbbf24",
                            },
                        }}
                    />
                    <span className={styles.ratingValue}>4.8</span>
                </Box>
            </div>
        </div>
    );
};

export default TrustBadge;
