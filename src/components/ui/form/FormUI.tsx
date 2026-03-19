"use client";
import React from "react";
import { Form, Field, ErrorMessage, useFormikContext } from "formik";
import styles from "./FormUI.module.scss";
import InputUI from "@/components/ui/input/InputUI";
import ButtonUI from "@/components/ui/button/ButtonUI";

interface FieldConfig {
    name: string;
    type: string;
    label?: string;
    placeholder?: string;
    autoComplete?: string;
    options?: Array<{ label: string; value: string }>;
}

interface FormUIProps {
    title: string;
    description?: string;
    isSubmitting?: boolean;
    fields?: FieldConfig[];
    submitLabel?: string;
    showTerms?: boolean; // показувати чекбокс тільки при реєстрації
    twoColumnLayout?: boolean;
}

const defaultFields: FieldConfig[] = [
    { name: "email", type: "email", placeholder: "Email" },
    { name: "password", type: "password", placeholder: "Password" },
];

const FormUI: React.FC<FormUIProps> = ({
                                           title,
                                           description,
                                           isSubmitting,
                                           fields = defaultFields,
                                           submitLabel = "Sign In",
                                           showTerms = false,
                                           twoColumnLayout = false,
                                       }) => {
    const { values } = useFormikContext<any>(); // отримуємо поточні значення форми

    // якщо форма має чекбокс — блокувати кнопку поки terms === false
    const isButtonDisabled =
        isSubmitting || (showTerms ? !values.terms : false);

    return (
        <div className={styles.wrapper}>
            <div className={`${styles.formContainer} ${twoColumnLayout ? styles.wideContainer : ""}`}>
                <h2 className={styles.title}>{title}</h2>
                {description && <p className={styles.description}>{description}</p>}

                <Form className={`${styles.formContent} ${twoColumnLayout ? styles.twoColumnLayout : ""}`}>
                    {fields.map((field) => (
                        <div key={field.name} className={styles.fieldGroup}>
                            {field.label && (
                                <label htmlFor={field.name} className={styles.fieldLabel}>
                                    {field.label}
                                </label>
                            )}
                            <InputUI id={field.name} {...field} formik />
                        </div>
                    ))}

                    {/* ✅ чекбокс показуємо лише якщо showTerms === true */}
                    {showTerms && (
                        <div className={styles.termsBlock}>
                            <label className={styles.termsLabel}>
                                <Field type="checkbox" name="terms" />
                                <span>
                  I agree to the{" "}
                                    <a
                                        href="/terms-and-conditions"
                                        rel="noopener noreferrer"
                                    >
                    Terms & Conditions
                  </a>
                </span>
                            </label>
                            <ErrorMessage
                                name="terms"
                                component="div"
                                className={styles.errorText}
                            />
                        </div>
                    )}

                    <ButtonUI
                        type="submit"
                        text={submitLabel}
                        disabled={isButtonDisabled}
                        loading={isSubmitting}
                        fullWidth
                    />
                </Form>
            </div>
        </div>
    );
};

export default FormUI;
