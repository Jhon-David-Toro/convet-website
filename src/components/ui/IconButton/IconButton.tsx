import Link from "next/link";

import { Icon } from "@/components/ui/Icon";
import { cx } from "@/lib/cx";

import styles from "./IconButton.module.scss";
import type { IconButtonAsButtonProps, IconButtonAsLinkProps, IconButtonProps, IconButtonVariant } from "./IconButton.types";

/**
 * Builds the class list of a button from its variant, size and loading state.
 *
 * @param variant Visual variant.
 * @param className Extra class name to append.
 * @returns The class list of a button from its variant, size and loading state.
 */
const getClassName = (variant: IconButtonVariant, className?: string) =>
  cx(styles.button, styles[variant], className);

/**
 * Renders the button as a native `<button>`.
 *
 * @param props Props of the component, see {@link IconButtonAsButtonProps}.
 * @param props.icon Icon component to draw.
 * @param props.label Accessible name of the button.
 * @param props.variant Visual variant.
 * @param props.type Variant of the element (button type or cell type).
 * @param props.className Extra class name for the root element.
 * @param props.rest Remaining properties, forwarded to the root element.
 * @returns The rendered element.
 */
function ButtonElement({ icon, label, variant = "ghost", type = "button", className, ...rest }: IconButtonAsButtonProps) {
  return (
    <button {...rest} type={type} aria-label={label} className={getClassName(variant, className)}>
      <Icon icon={icon} />
    </button>
  );
}

/**
 * Renders the button as a Next.js `<Link>` when it has an `href`.
 *
 * @param props Props of the component, see {@link IconButtonAsLinkProps}.
 * @param props.icon Icon component to draw.
 * @param props.label Accessible name of the button.
 * @param props.variant Visual variant.
 * @param props.className Extra class name for the root element.
 * @param props.rest Remaining properties, forwarded to the root element.
 * @returns The rendered element.
 */
function LinkElement({ icon, label, variant = "ghost", className, ...rest }: IconButtonAsLinkProps) {
  return (
    <Link {...rest} aria-label={label} className={getClassName(variant, className)}>
      <Icon icon={icon} />
    </Link>
  );
}

/**
 * Square icon-only button. The `label` is required because it is the accessible name.
 *
 * @param props Properties of the component.
 * @returns The rendered element.
 */
export function IconButton(props: IconButtonProps) {
  return props.href === undefined ? <ButtonElement {...props} /> : <LinkElement {...props} />;
}
