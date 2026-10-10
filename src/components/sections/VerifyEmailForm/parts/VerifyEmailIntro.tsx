import { AuthHeading, AuthIcon } from "@/components/sections/AuthLayout";
import { Mail } from "@/components/ui/Icon";

import { VERIFY_TITLE } from "../VerifyEmailForm.constants";
import type { VerifyEmailIntroProps } from "../VerifyEmailForm.types";
import { verifySubtitle } from "../VerifyEmailForm.utils";

/**
 * Mail icon and heading of the page: where the code was sent and how long it lasts.
 *
 * @param props Props of the component, see {@link VerifyEmailIntroProps}.
 * @param props.email Address the code was sent to.
 * @returns The rendered element.
 */
export function VerifyEmailIntro({ email }: VerifyEmailIntroProps) {
  return (
    <>
      <AuthIcon icon={Mail} />
      <AuthHeading title={VERIFY_TITLE} subtitle={verifySubtitle(email)} loose />
    </>
  );
}
