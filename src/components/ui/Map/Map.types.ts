import type { ComponentPropsWithRef } from "react";

export type MapProps = Omit<ComponentPropsWithRef<"div">, "children"> & {
  apiKey?: string;
  location?: string;
  label?: string;
  title?: string;
  openLabel?: string;
};

export type MapEmbedProps = {
  url: string;
  title: string;
};

export type MapArtProps = Pick<MapProps, "title" | "label">;

export type MapPinProps = Pick<MapProps, "label">;
