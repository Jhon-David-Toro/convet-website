import type { Metadata } from "next";

import { AuthLayout } from "@/components/sections/AuthLayout";
import { VerifyEmailForm } from "@/components/sections/VerifyEmailForm";
import { SIGN_UP_HREF } from "@/lib/auth.constants";
import { NO_INDEX } from "@/lib/seo.constants";

export const metadata: Metadata = {
  robots: NO_INDEX,
  title: "Verify email · CONVET",
  description: "Enter the 6-digit code we sent to your email.",
};

/**
 * Email verification page: the address is not in the URL; the form reads the one saved when the account was created.
 *
 * @returns The rendered element.
 */
export default function VerifyEmailPage() {
  return (
    <AuthLayout backHref={SIGN_UP_HREF}>
      <VerifyEmailForm />
    </AuthLayout>
  );
}
