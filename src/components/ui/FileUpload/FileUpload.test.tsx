import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { FileUpload } from "./FileUpload";

const pdf = () => new File(["x"], "luna.pdf", { type: "application/pdf" });

describe("FileUpload", () => {
  it("shows the idle copy from Figma", () => {
    render(<FileUpload />);
    expect(screen.getByText("Drag a PDF or photo here, or browse")).toBeInTheDocument();
    expect(screen.getByText("PDF, JPG or PNG · up to 10 MB")).toBeInTheDocument();
  });

  it("reports the chosen file", async () => {
    const onFileSelect = vi.fn();
    const { container } = render(<FileUpload onFileSelect={onFileSelect} />);
    const input = container.querySelector("input[type='file']") as HTMLInputElement;
    await userEvent.upload(input, pdf());
    expect(onFileSelect).toHaveBeenCalledWith(expect.objectContaining({ name: "luna.pdf" }));
  });

  it("reacts to dragging and reports the dropped file", () => {
    const onFileSelect = vi.fn();
    const { container } = render(<FileUpload onFileSelect={onFileSelect} />);
    const zone = container.querySelector("label") as HTMLElement;
    const root = container.firstElementChild as HTMLElement;
    fireEvent.dragOver(zone);
    expect(root).toHaveAttribute("data-dragging", "true");
    fireEvent.drop(zone, { dataTransfer: { files: [pdf()] } });
    expect(onFileSelect).toHaveBeenCalledTimes(1);
    expect(root).not.toHaveAttribute("data-dragging");
  });

  it("shows an uploaded file and lets it be removed", async () => {
    const onFileRemove = vi.fn();
    render(<FileUpload file={{ name: "luna-paper-record-2023.pdf", description: "2.4 MB · Uploaded" }} onFileRemove={onFileRemove} />);
    expect(screen.getByText("luna-paper-record-2023.pdf")).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Remove file" }));
    expect(onFileRemove).toHaveBeenCalledTimes(1);
  });

  it("announces errors", () => {
    render(<FileUpload error={{ title: "This file is larger than 10 MB", hint: "Compress it or upload pages separately." }} />);
    expect(screen.getByRole("alert")).toHaveTextContent("This file is larger than 10 MB");
  });

  it("ignores drops when disabled", () => {
    const onFileSelect = vi.fn();
    const { container } = render(<FileUpload disabled onFileSelect={onFileSelect} />);
    fireEvent.drop(container.querySelector("label") as HTMLElement, { dataTransfer: { files: [pdf()] } });
    expect(onFileSelect).not.toHaveBeenCalled();
  });
});

describe("FileUpload dragging", () => {
  it("does not show the dragging state when disabled and clears it when the drag leaves", () => {
    const { container, rerender } = render(<FileUpload disabled />);
    const root = container.firstElementChild as HTMLElement;
    fireEvent.dragOver(container.querySelector("label") as HTMLElement);
    expect(root).not.toHaveAttribute("data-dragging");
    rerender(<FileUpload />);
    fireEvent.dragOver(container.querySelector("label") as HTMLElement);
    expect(root).toHaveAttribute("data-dragging", "true");
    fireEvent.dragLeave(container.querySelector("label") as HTMLElement);
    expect(root).not.toHaveAttribute("data-dragging");
  });
});
