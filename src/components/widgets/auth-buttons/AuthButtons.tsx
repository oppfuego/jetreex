import React from "react";
import {useUser} from "@/context/UserContext";
import ButtonUI from "@/components/ui/button/ButtonUI";
import Link from "next/link";
import styles from "./AuthButtons.module.scss";
import {FaUser} from "react-icons/fa";
import {GrMoney} from "react-icons/gr";

const AuthButtons: React.FC = () => {
    const user = useUser();

    if (user) {
        return (
            <div className={styles.authedUserContainer}>
                <Link href="/profile" className={styles.userLink}>
                    <FaUser/>
                </Link>
                <div className={styles.userContainer}>
                    <div className={styles.userBalance}>
                        <GrMoney className={styles.tokenIcon}/>
                        <span className={styles.balanceText}>{user?.tokens ?? 0} Tokens</span>
                    </div>
                    {/*<div className={styles.userIconWrapper}>
                        <FaUser className={styles.userIcon}/>
                    </div>*/}

                </div>
            </div>
    )
        ;
    }

    // 🔹 Якщо неавторизований
    return (
        <div className={styles.nonAuthedButtons}>
            <Link href="/sign-in">
                <ButtonUI
                    text="Sign In"
                    color="primaty"
                    shape="default"
                    hoverColor="link"
                    hoverEffect="scale"
                    fullWidth
                    textColor="quaternary"
                />
            </Link>
            <Link href="/sign-up">
                <ButtonUI
                    text="Sign Up"
                    shape="default"
                    color="quaternary"
                    hoverColor="tertiary"
                    hoverTextColor="border"
                    hoverEffect="scale"
                    fullWidth
                    textColor="link"
                />
            </Link>
        </div>
    );
};

export default AuthButtons;
