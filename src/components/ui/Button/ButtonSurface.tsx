"use client";

import { useLayoutEffect, useRef, useState } from "react";
import type { ComponentPropsWithRef, Ref } from "react";

type ButtonSurfaceProps = ComponentPropsWithRef<"button"> & { loading: boolean };

/**
 * The native `<button>` behind `Button`, isolated in its own Client Component: it is the only part that needs to
 * measure the DOM (to lock the button's width while loading), so the rest of `Button.tsx` stays free to render from
 * Server Components, where its `leadingIcon`/`trailingIcon` function props cannot cross a Client Component boundary.
 *
 * @param props Native button props, plus `loading`.
 * @param props.loading Whether the button is busy; its width gets locked to the size it had right before.
 * @param props.style Inline style merged with the width lock.
 * @param props.children Content of the button.
 * @param props.ref Ref of the native button, merged with the one this component uses to measure.
 * @param props.rest Remaining native button props.
 * @returns The rendered element.
 */
export function ButtonSurface({ loading, style, children, ref, ...rest }: ButtonSurfaceProps) {
  const elementRef = useRef<HTMLButtonElement>(null);
  const [idleWidth, setIdleWidth] = useState<number>();

  // Captured on every idle render, so the value is already in hand the moment `loading` flips to true:
  // measuring then would read the loading-render's own box instead of the one it should freeze to.
  useLayoutEffect(() => {
    if (!loading) setIdleWidth(elementRef.current?.offsetWidth);
  }, [loading, children]);

  return (
    <button
      {...rest}
      ref={mergeRefs(elementRef, ref)}
      aria-busy={loading || undefined}
      style={loading && idleWidth ? { ...style, width: idleWidth } : style}
    >
      {children}
    </button>
  );
}

/**
 * Combines this component's own ref with the one a caller passed in, so both receive the DOM node.
 *
 * @param refs Refs to populate; skips the ones that are `null`/`undefined`.
 * @returns A ref callback to pass to the element.
 */
function mergeRefs<T>(...refs: Array<Ref<T> | undefined>) {
  return (node: T | null) => {
    for (const ref of refs) {
      if (typeof ref === "function") ref(node);
      else if (ref) ref.current = node;
    }
  };
}
