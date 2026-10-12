"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/Button";
import { ArrowLeft } from "@/components/ui/Icon";

import { BACK_LABEL } from "../NotFoundSection.constants";

/**
 * Button that goes back to the page the visitor came from.
 *
 * @returns The rendered element.
 */
export function GoBackButton() {
  const router = useRouter();

  return (
    <Button type="button" variant="secondary" leadingIcon={ArrowLeft} onClick={() => router.back()}>
      {BACK_LABEL}
    </Button>
  );
}
