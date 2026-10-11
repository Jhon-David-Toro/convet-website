import { ADMIN_NAV_HREFS } from "@/lib/admin.paths.constants";

export const TITLE = "Receive stock";

export const SUBTITLE = "Record a delivery. Lot and expiry are required for medications.";

export const CRUMBS = [{ label: "Inventory", href: ADMIN_NAV_HREFS.stock }, { label: "Stock", href: ADMIN_NAV_HREFS.stock }, { label: "Receive stock" }];

export const SUPPLIER_LABEL = "Supplier";

export const INVOICE_LABEL = "Invoice / delivery note";

export const RECEIVED_ON_LABEL = "Received on";

export const PRODUCTS_TITLE = "Products received";

export const PRODUCT_LABEL = "Product";

export const LOT_LABEL = "Lot number";

export const EXPIRY_LABEL = "Expiry";

export const QUANTITY_LABEL = "Quantity";

export const REMOVE_LINE_LABEL = "Remove product";

export const ADD_PRODUCT_LABEL = "Add product";

export const SIMILAR_NOTE = "similar products — check strength and pack before choosing";

export const STOCK_LABEL_PREFIX = "In stock";

export const LOW_STOCK_LABEL_PREFIX = "Low stock";

export const EXPIRED_ERROR = "This date has already passed. Expired stock can't be received.";

export const FOOTER_NOTE = "Stock updates only when you save. Each line becomes a receipt movement.";

export const CANCEL_LABEL = "Cancel";

export const SAVE_LABEL = "Save receipt";

export const SAVED_MESSAGE = "Receipt saved. Stock updated.";

export const NEW_LINE_QUANTITY = "1";
