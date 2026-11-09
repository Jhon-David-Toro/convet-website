import { useState } from "react";
import type { SubmitEvent } from "react";
import { useRouter } from "next/navigation";

import { signIn } from "@/lib/auth/auth.api";
import { hasErrors } from "@/lib/auth/validation.utils";

import { CREDENTIAL_ERRORS } from "../SignInForm.constants";
import type {
    SignInFormState,
    SignInStatus,
    UseSignInFormParams,
} from "../SignInForm.types";
import { validateSignIn } from "../SignInForm.utils";
import { useSignInFields } from "./useSignInFields";

const ROLE_REDIRECTS = {
    CUSTOMER: "/app",
    STAFF: "/staff",
    ADMIN: "/admin",
} as const;

function routeByRole(role: string | undefined, router: ReturnType<typeof useRouter>) {
    if (!role) return;
    router.replace(ROLE_REDIRECTS[role as keyof typeof ROLE_REDIRECTS]);
    router.refresh();
}

function determineAuthStatus(result: { ok: false; reason?: string }, setErrors: (errors: Record<string, string>) => void): SignInStatus {
    const unavailable = result.reason === "unavailable";
    setErrors(unavailable ? {} : CREDENTIAL_ERRORS);
    return unavailable ? "unavailable" : "error";
}

/**
 * Manages sign-in form: credential validation, authentication, and role-based routing.
 * @param onSubmit Optional authentication handler; uses signIn API if not provided. Returns result with role or reason (unavailable).
 * @returns Form state with status (idle, submitting, error, unavailable) and form handlers.
 */
export function useSignInForm({
    onSubmit,
}: UseSignInFormParams): SignInFormState {
    const router = useRouter();
    const { setErrors, ...fields } = useSignInFields();
    const [status, setStatus] = useState<SignInStatus>("idle");

    async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
        event.preventDefault();

        const found = validateSignIn(fields.values);
        setErrors(found);
        if (hasErrors(found)) return;

        setStatus("submitting");

        try {
            const result = await (onSubmit ?? signIn)(fields.values);

            if (!result.ok) {
                setStatus(determineAuthStatus(result, setErrors));
                return;
            }

            setStatus("idle");
            routeByRole(result.role, router);
        } catch {
            setStatus("unavailable");
        }
    }

    return {
        ...fields,
        status,
        handleSubmit,
    };
}