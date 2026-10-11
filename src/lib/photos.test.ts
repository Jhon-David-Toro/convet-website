import { afterEach, describe, expect, it, vi } from "vitest";

afterEach(() => {
  vi.unstubAllEnvs();
  vi.resetModules();
});

describe("photoUrl", () => {
  it("serves the photo from the public folder without Cloudinary", async () => {
    vi.stubEnv("NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME", "");
    const { photoUrl } = await import("./photos");
    expect(photoUrl("dr-shirley")).toBe("/photos/dr-shirley.jpg");
  });

  it("builds the Cloudinary address with the folder and the transformation", async () => {
    vi.stubEnv("NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME", "demo");
    vi.stubEnv("NEXT_PUBLIC_CLOUDINARY_FOLDER", "convet");
    const { photoUrl } = await import("./photos");
    expect(photoUrl("dr-shirley", "w_256,r_max")).toBe("https://res.cloudinary.com/demo/image/upload/w_256,r_max/convet/dr-shirley");
    expect(photoUrl("dr-shirley")).toBe("https://res.cloudinary.com/demo/image/upload/convet/dr-shirley");
  });
});
