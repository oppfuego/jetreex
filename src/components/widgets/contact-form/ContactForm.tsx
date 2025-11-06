"use client";

import React, { useState } from "react";
import { Formik, Form, Field, FormikHelpers } from "formik";
import { motion } from "framer-motion";
import ButtonUI from "@/components/ui/button/ButtonUI";
import { validationSchema, initialValues, sendContactRequest } from "./schema";
import { useAlert } from "@/context/AlertContext";
import {FaMapMarkerAlt, FaEnvelope, FaPhoneAlt, FaBuilding} from "react-icons/fa";
import {COMPANY_ADDRESS, COMPANY_EMAIL, COMPANY_LEGAL_NAME, COMPANY_NAME, COMPANY_PHONE} from "@/resources/constants";
import styles from "./ContactForm.module.scss";
import {TbSeo} from "react-icons/tb";

interface ContactFormValues {
    name: string;
    secondName: string;
    email: string;
    phone: string;
    message?: string;
}

const ContactForm: React.FC = () => {
    const { showAlert } = useAlert();
    const [successMsg, setSuccessMsg] = useState("");

    const handleSubmit = async (
        values: ContactFormValues,
        { setSubmitting, resetForm }: FormikHelpers<ContactFormValues>
    ) => {
        try {
            await sendContactRequest(values);
            resetForm();
            setSuccessMsg("✅ Message sent successfully!");
            showAlert("Success", "Your message has been sent!", "success");
        } catch {
            showAlert("Error", "Something went wrong. Try again.", "error");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <section className={styles.section}>
            <motion.div
                className={styles.header}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <h2>Let's Talk About Your Project</h2>
                <p>
                    Have questions about pricing or need a custom solution?
                    Our team will get back to you within 24 hours.
                </p>
            </motion.div>

            <div className={styles.container}>
                {/* === LEFT SIDE === */}
                <motion.div
                    className={styles.infoCard}
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h3>Contact Information</h3>
                    <p>We’d love to hear from you — reach out anytime.</p>

                    <div className={styles.infoItem}>
                        <TbSeo />
                        <span>{COMPANY_NAME}</span>
                    </div>
                    <div className={styles.infoItem}>
                        <FaBuilding />
                        <span>{COMPANY_LEGAL_NAME}</span>
                    </div>
                    <div className={styles.infoItem}>
                        <FaMapMarkerAlt />
                        <span>{COMPANY_ADDRESS}</span>
                    </div>
                    <div className={styles.infoItem}>
                        <FaEnvelope />
                        <a href={`mailto:${COMPANY_EMAIL}`}>{COMPANY_EMAIL}</a>
                    </div>
                    <div className={styles.infoItem}>
                        <FaPhoneAlt />
                        <a href={`tel:${COMPANY_PHONE}`}>{COMPANY_PHONE}</a>
                    </div>
                </motion.div>

                {/* === RIGHT SIDE === */}
                <motion.div
                    className={styles.formCard}
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    {successMsg ? (
                        <div className={styles.successMsg}>{successMsg}</div>
                    ) : (
                        <Formik<ContactFormValues>
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ isSubmitting }) => (
                                <Form className={styles.form}>
                                    <div className={styles.row}>
                                        <Field as="input" name="name" placeholder="First name" />
                                        <Field as="input" name="secondName" placeholder="Last name" />
                                    </div>

                                    <Field as="input" name="email" type="email" placeholder="Email address" />
                                    <Field as="input" name="phone" type="tel" placeholder="Phone number" />
                                    <Field as="textarea" name="message" placeholder="Your message" rows={5} />

                                    <ButtonUI
                                        type="submit"
                                        fullWidth
                                        loading={isSubmitting}
                                        text="Send Message"
                                        color="secondary"
                                        textColor="backgroundLight"
                                    />
                                </Form>
                            )}
                        </Formik>
                    )}
                </motion.div>
            </div>
        </section>
    );
};

export default ContactForm;
