import { useState } from "react";

import { hasErrors as checkForErrors } from "@/lib/auth/validation.utils";

/**
 * Errores de validación por campo.
 */
export type FormErrors<T extends string = string> = Partial<Record<T, string>>;

/**
 * Resultado de una acción de backend.
 */
export type BackendResult<T = unknown> = { ok: false; fieldErrors?: Record<string, string>; message?: string } | { ok: true; data: T };

/**
 * Estado genérico de un formulario.
 */
export type FormState<Values, Fields extends string = string> = {
  values: Values;
  errors: FormErrors<Fields>;
  submitting: boolean;
  submitError?: string;
};

/**
 * Hook genérico para gestionar estado de formularios con validación y backend.
 * Elimina duplicación entre useAddPet, useEditPet, useReviewForm, etc.
 *
 * @param initialValues Valores iniciales del formulario
 * @param onSubmit Función que valida y envía al backend
 * @returns Estado y handlers del formulario
 */
export function useFormState<Values, Fields extends string = string>(
  initialValues: Values,
  onSubmit: (values: Values) => Promise<BackendResult>,
) {
  const [values, setValues] = useState<Values>(initialValues);
  const [errors, setErrors] = useState<FormErrors<Fields>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string>();

  function setValue<K extends keyof Values>(field: K, value: Values[K]) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [String(field)]: undefined } as FormErrors<Fields>));
  }

  async function submit(validator?: (values: Values) => FormErrors<Fields>): Promise<BackendResult | void> {
    // Validación cliente
    const found = validator?.(values) ?? ({} as FormErrors<Fields>);
    setErrors(found);
    setSubmitError(undefined);

    if (checkForErrors(found)) return;

    // Submit al backend
    setSubmitting(true);
    const result = await onSubmit(values);
    setSubmitting(false);

    if (result.ok) return result;

    // Backend rechazó
    setErrors((result.fieldErrors ?? {}) as FormErrors<Fields>);
    setSubmitError(checkForErrors(result.fieldErrors || {}) ? undefined : result.message);

    return result;
  }

  return { values, errors, submitting, submitError, setValue, submit };
}
