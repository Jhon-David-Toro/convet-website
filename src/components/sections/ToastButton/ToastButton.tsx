"use client";

import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";

import type { ToastButtonProps } from "./ToastButton.types";

/**
 * Button for an action the design simulates: pressing it answers with a toast instead of calling a server.
 *
 * @param props Props of the component, see {@link ToastButtonProps}.
 * @param props.message Text of the toast.
 * @param props.tone Tone of the toast; success by default.
 * @param props.rest Remaining properties, forwarded to the button.
 * @returns The rendered element.
 */
export function ToastButton({ message, tone = "success", ...button }: ToastButtonProps) {
  const { toast } = useToast();

  return <Button type="button" {...button} onClick={() => toast({ message, tone })} />;
}
