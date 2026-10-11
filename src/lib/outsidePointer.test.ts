import { describe, expect, it, vi } from "vitest";

import { listenOutsidePointerDown } from "./outsidePointer";

describe("listenOutsidePointerDown", () => {
  it("reports presses outside the element only, and stops listening on cleanup", () => {
    const inside = document.createElement("div");
    const outside = document.createElement("div");
    document.body.append(inside, outside);
    const onOutside = vi.fn();
    const stop = listenOutsidePointerDown({ current: inside }, onOutside);
    inside.dispatchEvent(new Event("pointerdown", { bubbles: true }));
    expect(onOutside).not.toHaveBeenCalled();
    outside.dispatchEvent(new Event("pointerdown", { bubbles: true }));
    expect(onOutside).toHaveBeenCalledOnce();
    stop();
    outside.dispatchEvent(new Event("pointerdown", { bubbles: true }));
    expect(onOutside).toHaveBeenCalledOnce();
  });
});
