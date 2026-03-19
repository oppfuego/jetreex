/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");

function loadEnvFile() {
    const envPath = path.join(process.cwd(), ".env");
    if (!fs.existsSync(envPath)) return;

    const lines = fs.readFileSync(envPath, "utf8").split(/\r?\n/);
    for (const line of lines) {
        if (!line || line.trim().startsWith("#")) continue;
        const index = line.indexOf("=");
        if (index === -1) continue;
        const key = line.slice(0, index).trim();
        const value = line.slice(index + 1).trim().replace(/^['"]|['"]$/g, "");
        if (!process.env[key]) process.env[key] = value;
    }
}

function splitName(name) {
    const normalized = typeof name === "string" ? name.trim().replace(/\s+/g, " ") : "";
    if (!normalized) return { firstName: null, lastName: null };

    const [firstName, ...rest] = normalized.split(" ");
    return {
        firstName: firstName || null,
        lastName: rest.length > 0 ? rest.join(" ") : null,
    };
}

async function main() {
    loadEnvFile();

    if (!process.env.MONGODB_URI) {
        throw new Error("MONGODB_URI is required to run this migration.");
    }

    await mongoose.connect(process.env.MONGODB_URI);
    const users = mongoose.connection.collection("users");

    const cursor = users.find({});
    let updatedCount = 0;

    while (await cursor.hasNext()) {
        const user = await cursor.next();
        if (!user) continue;

        const update = {};
        const split = splitName(user.name);

        if (user.firstName === undefined) update.firstName = split.firstName;
        if (user.lastName === undefined) update.lastName = split.lastName;
        if (user.phoneNumber === undefined) update.phoneNumber = null;
        if (user.dateOfBirth === undefined) update.dateOfBirth = null;
        if (user.street === undefined) update.street = null;
        if (user.city === undefined) update.city = null;
        if (user.country === undefined) update.country = null;
        if (user.postCode === undefined) update.postCode = null;

        if (Object.keys(update).length === 0) continue;

        await users.updateOne({ _id: user._id }, { $set: update });
        updatedCount += 1;
    }

    console.log(`Migration complete. Updated ${updatedCount} user records.`);
    await mongoose.disconnect();
}

main().catch(async (error) => {
    console.error("Migration failed:", error);
    await mongoose.disconnect();
    process.exit(1);
});
