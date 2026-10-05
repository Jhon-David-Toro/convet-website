import Link from "next/link";

import { Icon, Loader } from "@/components/ui/Icon";
import { cx } from "@/lib/cx";

import styles from "./Button.module.scss";
import type {
  ButtonAsButtonProps,
  ButtonAsLinkProps,
  ButtonContentProps,
  ButtonProps,
  ButtonSize,
  ButtonVariant,
} from "./Button.types";

/**
 * Builds the class list of a button from its variant, size and loading state.
 *
 * @param variant Visual variant.
 * @param size Size of the component.
 * @param className Extra class name to append.
 * @param loading Whether the button is busy.
 * @returns The class list of a button from its variant, size and loading state.
 */
function getClassName(
  variant: ButtonVariant,
  size: ButtonSize,
  className?: string,
  loading?: boolean,
) {
  return cx(styles.button, styles[variant], styles[size], loading && styles.loading, className);
}

/**
 * Inner content of a button: leading icon (or spinner while loading), label and trailing icon.
 *
 * @param props Props of the component, see {@link ButtonContentProps}.
 * @param props.size Size of the component.
 * @param props.leadingIcon Icon before the label.
 * @param props.leadingIconTone Leading icon color when it differs from the label (e.g. the WhatsApp green).
 * @param props.trailingIcon Icon after the label.
 * @param props.loading Shows a spinner and marks the button as busy. It is disabled without changing its look.
 * @param props.children Content of the element.
 * @returns The rendered element.
 */
function ButtonContent({ size, leadingIcon, leadingIconTone, trailingIcon, loading, children }: ButtonContentProps) {
  const iconSize = size === "small" ? "small" : "medium";

  return (
    <>
      {loading ? (
        <Icon icon={Loader} size={iconSize} className={cx(styles.icon, styles.spinner)} />
      ) : (
        leadingIcon && <Icon icon={leadingIcon} size={iconSize} tone={leadingIconTone} className={styles.icon} />
      )}
      <span className={styles.label}>{children}</span>
      {trailingIcon && <Icon icon={trailingIcon} size={iconSize} className={styles.icon} />}
    </>
  );
}

/**
 * Renders the button as a native `<button>`.
 *
 * @param props Props of the component, see {@link ButtonAsButtonProps}.
 * @param props.variant Visual variant.
 * @param props.size Size of the component.
 * @param props.leadingIcon Icon before the label.
 * @param props.leadingIconTone Leading icon color when it differs from the label (e.g. the WhatsApp green).
 * @param props.trailingIcon Icon after the label.
 * @param props.loading Shows a spinner and marks the button as busy. It is disabled without changing its look.
 * @param props.type Variant of the element (button type or cell type).
 * @param props.className Extra class name for the root element.
 * @param props.children Content of the element.
 * @param props.disabled Whether the control is disabled.
 * @param props.rest Remaining properties, forwarded to the root element.
 * @returns The rendered element.
 */
function ButtonElement({
  variant = "primary",
  size = "medium",
  leadingIcon,
  leadingIconTone,
  trailingIcon,
  loading = false,
  type = "button",
  className,
  children,
  disabled,
  ...rest
}: ButtonAsButtonProps) {
  return (
    <button
      {...rest}
      type={type}
      className={getClassName(variant, size, className, loading)}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
    >
      <ButtonContent
        size={size}
        leadingIcon={leadingIcon}
        leadingIconTone={leadingIconTone}
        trailingIcon={trailingIcon}
        loading={loading}
      >
        {children}
      </ButtonContent>
    </button>
  );
}

/**
 * Renders the button as a Next.js `<Link>` when it has an `href`.
 *
 * @param props Props of the component, see {@link ButtonAsLinkProps}.
 * @param props.variant Visual variant.
 * @param props.size Size of the component.
 * @param props.leadingIcon Icon before the label.
 * @param props.leadingIconTone Leading icon color when it differs from the label (e.g. the WhatsApp green).
 * @param props.trailingIcon Icon after the label.
 * @param props.className Extra class name for the root element.
 * @param props.children Content of the element.
 * @param props.rest Remaining properties, forwarded to the root element.
 * @returns The rendered element.
 */
function LinkElement({
  variant = "primary",
  size = "medium",
  leadingIcon,
  leadingIconTone,
  trailingIcon,
  className,
  children,
  ...rest
}: ButtonAsLinkProps) {
  return (
    <Link {...rest} className={getClassName(variant, size, className)}>
      <ButtonContent size={size} leadingIcon={leadingIcon} leadingIconTone={leadingIconTone} trailingIcon={trailingIcon}>
        {children}
      </ButtonContent>
    </Link>
  );
}

/**
 * Button or link styled as a button, in five variants and two sizes, with optional icons and loading state.
 *
 * @param props Properties of the component.
 * @returns The rendered element.
 */
export function Button(props: ButtonProps) {
  return props.href === undefined ? <ButtonElement {...props} /> : <LinkElement {...props} />;
}
