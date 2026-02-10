import { betterAuth } from "better-auth";
import { admin as AdminPlugin } from "better-auth/plugins"
// import { ac, admin } from "./auth/permissions";

import Database from "better-sqlite3";

export const auth = betterAuth({
    database: new Database("./sqlite.db"),
    baseURL: "https://leadtable.iami411.org",
    basePath: "/api/auth",
    trustedOrigins: [
        "http://localhost:8080",
        "http://localhost:8081",
        "https://leadtable.iami411.com"
    ],
    emailAndPassword: {
        enabled: true,
    },
    plugins: [
        AdminPlugin({
            defaultRole: "user",
            adminRoles: ["admin"],
            adminUserIds: ["RnMm4GydR2ocFM1wJPVwS9HJ0cBxrmAF"],
            /*           ac,
                       roles: {
                           admin,
                       }*/
        })
    ],
})