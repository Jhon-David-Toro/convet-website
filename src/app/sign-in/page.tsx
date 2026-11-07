import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { AuthLayout } from "@/components/sections/AuthLayout";
import { SignInForm } from "@/components/sections/SignInForm";
import { verifySession } from "@/lib/auth/auth.dal";
import { NO_INDEX } from "@/lib/site/seo.constants";

import { SIGN_IN_BACK_HREF } from "./page.constants";

export const metadata: Metadata = {
    robots: NO_INDEX,
    title: "Sign in · CONVET",
    description: "Sign in to manage your pets and appointments.",
};

/**
 * Sign-in page: redirects authenticated users to their corresponding area.
 *
 * @returns The authentication frame with the credentials form.
 */
export default async function SignInPage() {
    const user = await verifySession();

    if (user) {
        const destinations = {
            CUSTOMER: "/app",
            STAFF: "/staff",
            ADMIN: "/admin",
        };

        redirect(destinations[user.role]);
    }

    return (
        <AuthLayout backHref={SIGN_IN_BACK_HREF}>
            <SignInForm />
        </AuthLayout>
    );
}