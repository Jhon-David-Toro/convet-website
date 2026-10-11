import type { Metadata } from "next";

import { AuthLayout } from "@/components/sections/AuthLayout";
import { ForgotPasswordForm } from "@/components/sections/ForgotPasswordForm";
import { SIGN_IN_HREF } from "@/lib/auth/auth.constants";
import { NO_INDEX } from "@/lib/site/seo.constants";

export const metadata: Metadata = {
  robots: NO_INDEX,
  title: "Reset password · CONVET",
  description: "Request a link to choose a new CONVET password.",
};

/**
 * Password reset page: the auth frame with the email form.
 *
 * @returns The rendered element.
 */
export default function ForgotPasswordPage() {
  return (
    <AuthLayout backHref={SIGN_IN_HREF}>
      <ForgotPasswordForm />
    </AuthLayout>
  );
}
