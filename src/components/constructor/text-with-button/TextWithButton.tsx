"use client";

import React from "react";
import styles from "./TextWithButton.module.scss";
import Text from "../text/Text";
import ButtonUI from "@/components/ui/button/ButtonUI";

interface TextWithButtonProps {
    title?: string;
    description?: string;
    buttonText?: string;
    buttonLink?: string;
    align?: "left" | "center" | "right";
}

const TextWithButton: React.FC<TextWithButtonProps> = ({
                                                           title,
                                                           description,
                                                           buttonText,
                                                           buttonLink,
                                                           align = "left",
                                                       }) => {
    return (
        <div
            className={`${styles.wrapper} ${
                align === "center"
                    ? styles.center
                    : align === "right"
                        ? styles.right
                        : ""
            }`}
        >
            <div className={styles.textBlock}>
                <Text title={title} description={description} />
            </div>

            {buttonText && buttonLink && (
                <a href={buttonLink} className={styles.buttonLink}>
                    <ButtonUI
                        text={buttonText}
                        color="primary"
                        variant="solid"
                        hoverEffect="scale"
                        size="md"
                    />
                </a>
            )}
        </div>
    );
};

export default TextWithButton;
