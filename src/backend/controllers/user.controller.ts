import { connectDB } from "../config/db";
import { userService } from "../services/user.service";
import { UserType } from "@/backend/types/user.types";
import { transactionService } from "@/backend/services/transaction.service";
import { sendOrderConfirmationEmail } from "@/backend/utils/orderConfirmationEmail";

export const userController = {
    async buyTokens(userId: string, amount: number): Promise<UserType> {
        await connectDB();

        const user = await userService.addTokens(userId, amount);

        console.log("💳 Adding tokens for user:", userId);
        await transactionService.record(user._id, user.email, amount, "add", user.tokens);
        console.log("✅ Transaction created successfully");

        await sendOrderConfirmationEmail({
            to: user.email,
            firstName: user.firstName,
            subjectLabel: "Token purchase",
            amountLabel: `${amount} tokens`,
            summary: `Your token purchase was completed successfully. Your new balance is ${user.tokens} tokens.`,
            details: [{ label: "New balance", value: `${user.tokens} tokens` }],
        });

        return formatUser(user);
    },

    async spendTokens(userId: string, amount: number, reason?: string): Promise<UserType> {
        await connectDB();

        const user = await userService.getUserById(userId);
        if (!user) throw new Error("User not found");
        if ((user.tokens || 0) < amount) throw new Error("Not enough tokens");

        user.tokens -= amount;
        await user.save();

        await transactionService.record(user._id, user.email, amount, "spend", user.tokens);

        await sendOrderConfirmationEmail({
            to: user.email,
            firstName: user.firstName,
            subjectLabel: "Token usage",
            tokensUsed: amount,
            summary: `You have spent ${amount} tokens${reason ? ` for ${reason}` : ""}.`,
            details: [{ label: "New balance", value: `${user.tokens} tokens` }],
        });

        return formatUser(user);
    },
};

function formatUser(user: any): UserType {
    return {
        _id: user._id.toString(),
        name: user.name,
        firstName: user.firstName ?? null,
        lastName: user.lastName ?? null,
        email: user.email,
        phoneNumber: user.phoneNumber ?? null,
        dateOfBirth: user.dateOfBirth ? new Date(user.dateOfBirth).toISOString() : null,
        street: user.street ?? null,
        city: user.city ?? null,
        country: user.country ?? null,
        postCode: user.postCode ?? null,
        role: user.role,
        tokens: user.tokens,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    };
}
