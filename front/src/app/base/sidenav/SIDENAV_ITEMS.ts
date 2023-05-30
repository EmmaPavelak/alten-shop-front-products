import { SidenavItem } from "app/base/sidenav/sidenav.model";
import { PrimeIcons } from "primeng/api";

export const SIDENAV_ITEMS: SidenavItem[] = [
  {
    id: "Products",
    labels: {
      en: "Products",
      fr: "Produits",
    },
    icon: PrimeIcons.USERS,
    link: "products",
  },
  {
    id: "Admin",
    labels: {
      en: "Admin",
      fr: "Admin",
    },
    icon: PrimeIcons.SHOPPING_CART,
    link: "admin/products",
  },
];
