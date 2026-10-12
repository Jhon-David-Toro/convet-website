import Link from "next/link";

import { PRIVACY_HREF, TERMS_HREF } from "@/lib/auth/auth.constants";

import { CONSENT_PREFIX, PRIVACY_LABEL, TERMS_LABEL } from "../SignUpForm.constants";

/**
 * Label of the terms checkbox, with links to the Terms and the Privacy Policy. They open in a new tab so the form being filled in is not lost.
 *
 * @returns The rendered element.
 */
export function TermsLabel() {
  return (
    <>
      {CONSENT_PREFIX} <Link href={TERMS_HREF} target="_blank" rel="noopener">
        {TERMS_LABEL}
      </Link>{" "}
      and{" "}
      <Link href={PRIVACY_HREF} target="_blank" rel="noopener">
        {PRIVACY_LABEL}
      </Link>
    </>
  );
}
