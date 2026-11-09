import { useState } from "react";

import { Eye } from "@/components/ui/Icon";
import { PasswordStrength } from "@/components/ui/PasswordStrength";
import { TextInput } from "@/components/ui/TextInput";

import { CONFIRM_PASSWORD_LABEL, PASSWORD_HELPER } from "../SignUpForm.constants";
import type { SignUpFieldsProps } from "../SignUpForm.types";

/**
 * Password fields with visibility toggle and strength meter.
 *
 * @param props Props of the component, see {@link SignUpFieldsProps}.
 * @param props.values Current values.
 * @param props.errors Current error messages.
 * @param props.setValue Changes one value and clears its error.
 * @returns The rendered element.
 */
export function SignUpPassword({ values, errors, setValue }: SignUpFieldsProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <TextInput
        label="Password"
        type={showPassword ? "text" : "password"}
        autoComplete="new-password"
        helper={PASSWORD_HELPER}
        value={values.password}
        error={errors.password}
        onChange={(event) => setValue("password", event.target.value)}
        trailingButton={{
          label: showPassword ? "Hide" : "Show",
          icon: Eye,
          onClick: () => setShowPassword(!showPassword),
        }}
      />
      <PasswordStrength password={values.password} />
      <TextInput
        label={CONFIRM_PASSWORD_LABEL}
        type={showPassword ? "text" : "password"}
        autoComplete="new-password"
        value={values.confirmPassword}
        error={errors.confirmPassword}
        onChange={(event) => setValue("confirmPassword", event.target.value)}
        trailingButton={{
          label: showPassword ? "Hide" : "Show",
          icon: Eye,
          onClick: () => setShowPassword(!showPassword),
        }}
      />
    </>
  );
}
