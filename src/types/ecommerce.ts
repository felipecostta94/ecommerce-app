export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  category: string;
  stock: number;
  featured: boolean;
}

export interface CartItem{
    product: Product;
    quantity: number;
}