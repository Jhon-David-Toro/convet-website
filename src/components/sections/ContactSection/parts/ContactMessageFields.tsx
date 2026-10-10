import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";

import { MESSAGE_HELPER, TOPIC_OPTIONS } from "../ContactSection.constants";
import type { ContactFormProps } from "../ContactSection.types";

/**
 * Topic selector and the message the visitor writes.
 *
 * @param props Props of the component, see {@link ContactFormProps}.
 * @param props.values Current values.
 * @param props.errors Current error messages.
 * @param props.setValue Changes one value and clears its error.
 * @returns The rendered element.
 */
export function ContactMessageFields({ values, errors, setValue }: ContactFormProps) {
  return (
    <>
      <Select
        label="Topic"
        name="topic"
        options={TOPIC_OPTIONS}
        placeholder="Choose a topic"
        value={values.topic}
        error={errors.topic}
        onValueChange={(topic) => setValue("topic", topic)}
      />
      <Textarea
        label="Message"
        rows={3}
        helper={MESSAGE_HELPER}
        value={values.message}
        error={errors.message}
        onChange={(event) => setValue("message", event.target.value)}
      />
    </>
  );
}
