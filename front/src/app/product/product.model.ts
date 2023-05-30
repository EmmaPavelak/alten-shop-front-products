export interface Product {
  id: number;
  code: string;
  name: string;
  description: string;
  image: string;
  price: number;
  category: string; // Category;
  quantity: number;
  inventoryStatus: string; //InventoryStatus;
  rating: number;
  selected?: boolean;
}
