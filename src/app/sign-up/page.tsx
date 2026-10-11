import type { Metadata } from "next";

import { AuthLayout } from "@/components/sections/AuthLayout";
import { SignUpForm } from "@/components/sections/SignUpForm";
import { SIGN_IN_HREF } from "@/lib/auth/auth.constants";
import { NO_INDEX } from "@/lib/site/seo.constants";

export const metadata: Metadata = {
  robots: NO_INDEX,
  title: "Create account · CONVET",
  description: "Create your CONVET account to book visits and keep your pets' records.",
};

/**
 * Create-account page: the auth frame with the registration form.
 *
 * @returns The rendered element.
 */
export default function SignUpPage() {
  return (
    <AuthLayout backHref={SIGN_IN_HREF}>
      <SignUpForm />
    </AuthLayout>
  );
}
