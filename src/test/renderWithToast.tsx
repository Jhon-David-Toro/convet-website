import { render } from "@testing-library/react";
import type { ReactElement } from "react";

import { ToastProvider } from "@/components/ui/Toast";

/**
 * Renders a component inside the toast provider, as the pages of the app are.
 *
 * @param ui Element to render.
 * @returns The Testing Library render result.
 */
export function renderWithToast(ui: ReactElement) {
  return render(ui, { wrapper: ToastProvider });
}
