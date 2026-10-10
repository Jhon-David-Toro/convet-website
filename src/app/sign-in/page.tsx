import type { Metadata } from "next";

import { AuthLayout } from "@/components/sections/AuthLayout";
import { SignInForm } from "@/components/sections/SignInForm";

import { SIGN_IN_BACK_HREF } from "./page.constants";

export const metadata: Metadata = {
  title: "Sign in · CONVET",
  description: "Sign in to manage your pets and appointments.",
};

/**
 * Sign-in page: the auth frame with the credentials form.
 *
 * @returns The rendered element.
 */
export default function SignInPage() {
  return (
    <AuthLayout backHref={SIGN_IN_BACK_HREF}>
      <SignInForm />
    </AuthLayout>
  );
}
