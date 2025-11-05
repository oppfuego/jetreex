"use client";

import React from "react";
import ProfileHead from "@/components/features/profile-head/ProfileHead";
import BalanceCard from "@/components/features/balance-card/BalanceCard";
import Dashboard from "@/components/features/dashboard/Dashboard";
import styles from "./Profile.module.scss";
import {SeoRequestsProvider} from "@/context/SeoContext";

const Profile = () => {
    return (
        <div className={styles.profilePage}>
            <div className={styles.headerRow}>
                <ProfileHead />
                <BalanceCard />
            </div>
            <SeoRequestsProvider>
                <Dashboard />
            </SeoRequestsProvider>
        </div>
    );
};

export default Profile;
