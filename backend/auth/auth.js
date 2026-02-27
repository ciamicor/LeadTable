"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
var better_auth_1 = require("better-auth");
var plugins_1 = require("better-auth/plugins");
// import { ac, admin } from "./auth/permissions";
var better_sqlite3_1 = require("better-sqlite3");
exports.auth = (0, better_auth_1.betterAuth)({
    database: new better_sqlite3_1.default("./sqlite.db"),
    baseURL: "https://leadtable.app",
    basePath: "/api/auth",
    trustedOrigins: [
        "http://localhost:8080",
        "http://localhost:8081",
        "https://leadtable.app",
        "http://localhost:4173"
    ],
    emailAndPassword: {
        enabled: true
    },
    plugins: [
        (0, plugins_1.admin)({
            defaultRole: "user",
            adminRoles: ["admin"],
            adminUserIds: ["RnMm4GydR2ocFM1wJPVwS9HJ0cBxrmAF"]
            /*           ac,
                       roles: {
                           admin,
                       }*/
        })
    ]
});
