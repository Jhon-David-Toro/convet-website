import { Button } from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/Icon";
import { cx } from "@/lib/shared/cx";

import styles from "./Map.module.scss";
import type { MapProps } from "./Map.types";
import { buildEmbedUrl, buildSearchUrl } from "./Map.utils";
import { MapArt } from "./parts/MapArt";
import { MapEmbed } from "./parts/MapEmbed";

/**
 * Media/Map: 16:9 map with XL radius. Embeds Google Maps when given a key and place; otherwise shows the stylized Figma map.
 *
 * @param props Props of the component, see {@link MapProps}.
 * @param props.apiKey Google Maps Embed API key. Without it (or without `location`) the stylized Figma map is drawn.
 * @param props.location Clinic address or "lat,lng".
 * @param props.label Text of the stylized pin.
 * @param props.title Accessible title of the map.
 * @param props.openLabel Label of the button that opens the place in Google Maps.
 * @param props.className Extra class name for the root element.
 * @param props.rest Remaining properties, forwarded to the root element.
 * @returns The rendered element.
 */
export function Map({ apiKey, location, label = "CONVET · Aruba", title = "Map of the clinic", openLabel = "Open in Google Maps", className, ...rest }: MapProps) {
  const embedUrl = apiKey && location ? buildEmbedUrl(apiKey, location) : null;

  return (
    <div {...rest} className={cx(styles.map, className)}>
      {embedUrl ? <MapEmbed url={embedUrl} title={title} /> : <MapArt title={title} label={label} />}
      {location && (
        <Button variant="secondary" size="small" href={buildSearchUrl(location)} trailingIcon={ArrowRight} className={styles.open}>
          {openLabel}
        </Button>
      )}
    </div>
  );
}
