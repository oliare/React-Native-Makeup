import axios from 'axios';

const API_URL = 'https://makeup-api.herokuapp.com/api/v1/products.json';

export const fetchMakeupProducts = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching makeup products:', error);
    return [];
  }
};

export const fetchProductCategories = async (products: any) => {
  const categories = new Set();
  products.forEach((product: any) => {
    if (product.product_type) {
      categories.add(product.product_type);
    }
  });
  return Array.from(categories);
};

export const fetchProductBrands = (products: any) => {
  const uniqueBrands = [...new Map(products.map((product : any) => [
    product.brand,
    { id: product.brand, name: product.brand, logo: product.brandLogo }, 
  ])).values()];
  return uniqueBrands;
};
