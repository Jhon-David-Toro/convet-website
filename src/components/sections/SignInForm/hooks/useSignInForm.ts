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

/**
 * State of the sign-in form: values, field errors and submission status.
 *
 * @param params Parameters of the hook, see {@link UseSignInFormParams}.
 * @param params.onSubmit Optional custom credential handler, useful for testing.
 * @returns The state and the handlers that change it.
 */
export function useSignInForm({
    onSubmit,
}: UseSignInFormParams): SignInFormState {
    const router = useRouter();
    const { setErrors, ...fields } = useSignInFields();
    const [status, setStatus] = useState<SignInStatus>("idle");

    /**
     * Validates the form and authenticates the submitted credentials.
     *
     * @param event Submit event of the form.
     */
    async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
        event.preventDefault();

        const found = validateSignIn(fields.values);

        setErrors(found);

        if (hasErrors(found)) {
            return;
        }

        setStatus("submitting");

        try {
            const result = await (onSubmit ?? signIn)(fields.values);

            if (!result.ok) {
                setStatus("error");
                setErrors(CREDENTIAL_ERRORS);
                return;
            }

            setStatus("idle");

            if (result.role) {
                router.replace(ROLE_REDIRECTS[result.role]);
                router.refresh();
            }
        } catch {
            setStatus("error");
            setErrors(CREDENTIAL_ERRORS);
        }
    }

    return {
        ...fields,
        status,
        handleSubmit,
    };
}