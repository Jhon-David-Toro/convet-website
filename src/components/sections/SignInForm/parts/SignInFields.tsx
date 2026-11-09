import { useState } from "react";

import { Eye, EyeOff } from "@/components/ui/Icon";
import { TextInput } from "@/components/ui/TextInput";

import type { SignInFieldsProps } from "../SignInForm.types";

/**
 * Email and password fields of the sign-in form with password visibility toggle.
 *
 * @param props Props of the component, see {@link SignInFieldsProps}.
 * @param props.values Current values.
 * @param props.errors Current error messages.
 * @param props.setValue Changes one value and clears its error.
 * @returns The rendered element.
 */
export function SignInFields({ values, errors, setValue }: SignInFieldsProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <TextInput label="Email" type="email" autoComplete="email" value={values.email} error={errors.email} onChange={(event) => setValue("email", event.target.value)} />
      <TextInput
        label="Password"
        type={showPassword ? "text" : "password"}
        autoComplete="current-password"
        value={values.password}
        error={errors.password}
        onChange={(event) => setValue("password", event.target.value)}
        trailingButton={{
          label: showPassword ? "Hide" : "Show",
          icon: showPassword ? EyeOff : Eye,
          onClick: () => setShowPassword(!showPassword),
        }}
      />
    </>
  );
}
