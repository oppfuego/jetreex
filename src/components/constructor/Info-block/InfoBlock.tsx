"use client";
import React from "react";
import styles from "./InfoBlock.module.scss";
import Media from "../image/Media";
import Text from "../text/Text";

interface InfoBlockProps {
    title?: string;
    description?: string;
    icon?: string;
    image?: string;
    bullets?: string[];
    align?: "left" | "center" | "right";
}

const InfoBlock: React.FC<InfoBlockProps> = ({
                                                 title,
                                                 description,
                                                 icon,
                                                 image,
                                                 bullets,
                                                 align = "left",
                                             }) => {
    return (
        <div className={`${styles.infoBlock} ${styles[align]}`}>
            {icon && <div className={styles.icon}>{icon}</div>}

            {image && (
                <div className={styles.imageWrapper}>
                    <Media
                        src={image}
                        type="image"
                        width="100%"
                        height="220px"
                        alt={title || "Info"}
                        objectFit="cover"
                    />
                </div>
            )}

            <Text
                title={title}
                description={description}
                bullets={bullets}
                centerTitle={align === "center"}
                centerDescription={align === "center"}
                centerBullets={align === "center"}
            />
        </div>
    );
};

export default InfoBlock;
