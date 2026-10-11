import type { Metadata } from "next";

import { AuthLayout } from "@/components/sections/AuthLayout";
import { TwoStepForm } from "@/components/sections/TwoStepForm";
import { SIGN_IN_HREF } from "@/lib/auth.constants";
import { NO_INDEX } from "@/lib/seo.constants";

export const metadata: Metadata = {
  robots: NO_INDEX,
  title: "2-step verification · CONVET",
  description: "Enter the code from your authenticator app to continue.",
};

/**
 * Staff 2-step verification page: the auth frame with the code form.
 *
 * @returns The rendered element.
 */
export default function TwoStepVerificationPage() {
  return (
    <AuthLayout backHref={SIGN_IN_HREF}>
      <TwoStepForm />
    </AuthLayout>
  );
}
