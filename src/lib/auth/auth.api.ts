import type {
    SignInResult,
    SignInValues,
} from "@/components/sections/SignInForm/SignInForm.types";

import type { AuthRole } from "@/components/sections/SignInForm/SignInForm.types";

type LoginResponse = {
    user: {
        idUser: string;
        firstName: string;
        lastName: string;
        email: string;
        role: AuthRole;
    };
};

/**
 * Authenticates a user through the Next.js authentication endpoint.
 *
 * @param values Credentials entered in the sign-in form.
 * @returns The authentication result and the user's role.
 */
export async function signIn(
    values: SignInValues,
): Promise<SignInResult> {
    try {
        const response = await fetch("/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: values.email,
                password: values.password,
            }),
        });

        if (!response.ok) {
            return { ok: false };
        }

        const data: LoginResponse = await response.json();

        if (
            !data.user?.idUser ||
            !["CUSTOMER", "STAFF", "ADMIN"].includes(data.user.role)
        ) {
            return { ok: false };
        }

        return {
            ok: true,
            role: data.user.role,
        };
    } catch {
        return { ok: false };
    }
}