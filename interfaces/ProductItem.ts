interface MakeupProduct {
    id: number;
    brand: string;
    name: string;
    price: string;
    image_link: string;
    image: string;
    description: string;
    rating: number | null;
  };

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  quantity?: number;
}