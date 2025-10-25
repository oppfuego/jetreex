"use client";

import React, { useState } from "react";
import { Formik, Form, Field, FormikHelpers } from "formik";
import { motion } from "framer-motion";
import ButtonUI from "@/components/ui/button/ButtonUI";
import { validationSchema, initialValues, sendContactRequest } from "./schema";
import { useAlert } from "@/context/AlertContext";
import { FaMapMarkerAlt, FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import { COMPANY_ADDRESS, COMPANY_EMAIL, COMPANY_PHONE } from "@/resources/constants";
import styles from "./ContactForm.module.scss";

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
                <h2>Contact Our Team</h2>
                <p>
                    Have a question about our plans or need tailored advice?
                    Our experts typically respond within 24 hours.
                </p>
            </motion.div>

            <div className={styles.grid}>
                {/* === LEFT SIDE === */}
                <motion.div
                    className={styles.infoBlock}
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h3>Get in touch</h3>
                    <p className={styles.subtext}>
                        We’re here to answer your questions and help you find the right solution for your needs.
                    </p>

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
                    className={styles.formBlock}
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
