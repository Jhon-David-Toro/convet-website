"use client";

import { useRef } from "react";

import { Button } from "@/components/ui/Button";
import { Upload } from "@/components/ui/Icon";
import { useToast } from "@/components/ui/Toast";

import { ATTACH_FILE_LABEL, FILE_ATTACHED_PREFIX } from "../VisitRecord.constants";

/**
 * Button that opens the file picker and confirms the file that was chosen.
 *
 * @returns The rendered element.
 */
export function AttachFileButton() {
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  return (
    <>
      <Button type="button" variant="secondary" size="small" leadingIcon={Upload} onClick={() => inputRef.current?.click()}>
        {ATTACH_FILE_LABEL}
      </Button>
      <input
        ref={inputRef}
        type="file"
        hidden
        aria-label={ATTACH_FILE_LABEL}
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) toast({ message: `${FILE_ATTACHED_PREFIX} ${file.name}`, tone: "success" });
          event.target.value = "";
        }}
      />
    </>
  );
}
