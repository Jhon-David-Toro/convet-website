import type { ComponentPropsWithRef } from "react";

/** Props of the `Map` component. */
export type MapProps = Omit<ComponentPropsWithRef<"div">, "children"> & {
  /** Google Maps Embed API key. Without it (or without `location`) the stylized Figma map is drawn. */
  apiKey?: string;
  /** Clinic address or "lat,lng". */
  location?: string;
  /** Text of the stylized pin. */
  label?: string;
  /** Accessible title of the map. */
  title?: string;
  /** Label of the button that opens the place in Google Maps. */
  openLabel?: string;
};

/** Props of the embedded Google map. */
export type MapEmbedProps = {
  /** URL to load. */
  url: string;
  /** Title text. */
  title: string;
};

/** Props of the stylized Figma map. */
export type MapArtProps = Pick<MapProps, "title" | "label">;

/** Props of the pin with the clinic name. */
export type MapPinProps = Pick<MapProps, "label">;
