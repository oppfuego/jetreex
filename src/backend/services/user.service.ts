import { User } from "../models/user.model";

export const userService = {
    async addTokens(userId: string, amount: number) {
        const user = await User.findByIdAndUpdate(
            userId,
            { $inc: { tokens: amount } },
            { new: true } // повертаємо оновлений документ
        );

        if (!user) throw new Error("UserNotFound");
        return user;
    },

    async getUserById(userId: string) {
        const user = await User.findById(userId);
        if (!user) throw new Error("UserNotFound");
        return user;
    },
};
