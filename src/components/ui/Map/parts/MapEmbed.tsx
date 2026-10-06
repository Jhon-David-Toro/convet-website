import styles from "../Map.module.scss";
import type { MapEmbedProps } from "../Map.types";

/**
 * Embedded Google map, loaded lazily.
 *
 * @param props Props of the component, see {@link MapEmbedProps}.
 * @param props.url URL to load.
 * @param props.title Title text.
 * @returns The rendered element.
 */
export function MapEmbed({ url, title }: MapEmbedProps) {
  return <iframe src={url} title={title} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className={styles.embed} />;
}
