export declare const ac: {
    newRole<K extends "user" | "session">(statements: import("better-auth/plugins/access").Subset<K, {
        readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password", "get", "update"];
        readonly session: readonly ["list", "revoke", "delete"];
    }>): {
        authorize<K_1 extends K>(request: K_1 extends infer T extends K_2 ? { [key in T]?: import("better-auth/plugins/access").Subset<K, {
            readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password", "get", "update"];
            readonly session: readonly ["list", "revoke", "delete"];
        }>[key] | {
            actions: import("better-auth/plugins/access").Subset<K, {
                readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password", "get", "update"];
                readonly session: readonly ["list", "revoke", "delete"];
            }>[key];
            connector: "OR" | "AND";
        } | undefined; } : never, connector?: "OR" | "AND"): import("better-auth/plugins/access").AuthorizeResponse;
        statements: import("better-auth/plugins/access").Subset<K, {
            readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password", "get", "update"];
            readonly session: readonly ["list", "revoke", "delete"];
        }>;
    };
    statements: {
        readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password", "get", "update"];
        readonly session: readonly ["list", "revoke", "delete"];
    };
};
export declare const admin: {
    authorize<K_1 extends "user" | "session">(request: K_1 extends infer T extends K ? { [key in T]?: import("better-auth/plugins/access").Subset<"user" | "session", {
        readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password", "get", "update"];
        readonly session: readonly ["list", "revoke", "delete"];
    }>[key] | {
        actions: import("better-auth/plugins/access").Subset<"user" | "session", {
            readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password", "get", "update"];
            readonly session: readonly ["list", "revoke", "delete"];
        }>[key];
        connector: "OR" | "AND";
    } | undefined; } : never, connector?: "OR" | "AND"): import("better-auth/plugins/access").AuthorizeResponse;
    statements: import("better-auth/plugins/access").Subset<"user" | "session", {
        readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password", "get", "update"];
        readonly session: readonly ["list", "revoke", "delete"];
    }>;
};
//# sourceMappingURL=permissions.d.ts.map