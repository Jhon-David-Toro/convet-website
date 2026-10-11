import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Stethoscope, WhatsApp } from "@/components/ui/Icon";
import { MediaImage } from "@/components/ui/MediaImage";
import { cx } from "@/lib/shared/cx";

import type { ProductCardProps } from "./ProductCard.types";
import { ProductText } from "./parts/ProductText";
import styles from "./ProductCard.module.scss";

/**
 * Card/Product: image, category, name, description and the availability inquiry.
 *
 * @param props Props of the component, see {@link ProductCardProps}.
 * @param props.image Product photo; without it the illustration is shown.
 * @param props.category Category of the product.
 * @param props.name Name to show.
 * @param props.href Link to the product page; when given, the whole card opens it.
 * @param props.description Description text under the title.
 * @param props.prescription Shows the "Prescription only" label.
 * @param props.askHref Link of the availability inquiry.
 * @param props.askLabel Label of the availability inquiry button.
 * @param props.className Extra class name for the root element.
 * @param props.rest Remaining properties, forwarded to the root element.
 * @returns The rendered element.
 */
export function ProductCard({ image, category, name, href, description, prescription = false, askHref, askLabel = "Ask about availability", className, ...rest }: ProductCardProps) {
  return (
    <article {...rest} className={cx(styles.card, className)}>
      <MediaImage subject="product" src={image?.src} alt={image?.alt} className={styles.image} />
      <div className={styles.body}>
        <ProductText category={category} name={name} href={href} description={description} />
        {prescription && (
          <Badge tone="info" icon={Stethoscope}>
            Prescription only
          </Badge>
        )}
        <Button variant="secondary" size="small" href={askHref} leadingIcon={WhatsApp} className={styles.ask}>
          {askLabel}
        </Button>
      </div>
    </article>
  );
}
