import styles from "../ProductLots.module.scss";
import { PANEL_ID } from "../ProductLots.constants";
import type { LotsPanelProps } from "../ProductLots.types";
import { PublicSettings, StockSettings } from "./SettingsPanels";
import { LotsView, MovementsView } from "./TabViews";

const VIEWS = {
  lots: LotsView,
  movements: MovementsView,
  public: PublicSettings,
  settings: StockSettings,
};

/**
 * Content of the selected tab: the lots with the movements and the note, the movements, the public page or the settings.
 *
 * @param props Props of the component, see {@link LotsPanelProps}.
 * @param props.tab Selected tab.
 * @param props.product Product shown.
 * @returns The rendered element.
 */
export function LotsPanel({ tab, product }: LotsPanelProps) {
  const View = VIEWS[tab];

  return (
    <div id={PANEL_ID} role="tabpanel" className={styles.panel}>
      <View product={product} />
    </div>
  );
}
