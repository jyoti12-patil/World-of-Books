
export interface NavigationHeading {
  id: string;
  title: string;
  slug: string;
}

export interface Category {
  id: string;
  title: string;
  slug: string;
  parent_id: string | null;
  product_count: number;
  subcategories: Category[];
}

export interface Product {
  id: string;
  source_id: string;
  title: string;
  author: string;
  price: number;
  currency: string;
  image_url: string;
  source_url: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  created_at: string;
}

export interface ProductDetail extends Product {
  description: string;
  specs: { [key: string]: string };
  ratings_avg: number;
  reviews_count: number;
  reviews: Review[];
  recommendations: Product[];
}
