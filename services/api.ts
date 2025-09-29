import { NavigationHeading, Category, Product, ProductDetail, Review } from '../types';

const MOCK_DELAY = 500;

// --- MOCK DATA ---
const navigationHeadings: NavigationHeading[] = [
  { id: '1', title: 'Books', slug: 'books' },
  { id: '2', title: 'Children\'s Books', slug: 'childrens-books' },
  { id: '3', title: 'Fiction', slug: 'fiction' },
  { id: '4', title: 'Non-Fiction', slug: 'non-fiction' },
  { id: '5', title: 'Bestsellers', slug: 'bestsellers' },
  { id: '6', title: 'New Arrivals', slug: 'new-arrivals' },
];

const products: Product[] = Array.from({ length: 50 }, (_, i) => ({
  id: `${i + 1}`,
  source_id: `WOB-${1000 + i}`,
  title: `The Adventures of Book ${i + 1}`,
  author: `Author ${i % 10 + 1}`,
  price: parseFloat((10 + Math.random() * 20).toFixed(2)),
  currency: 'GBP',
  image_url: `https://picsum.photos/seed/${i + 1}/300/400`,
  source_url: '#',
}));

const categories: { [key: string]: Category } = {
  'books': {
    id: 'cat-1', title: 'All Books', slug: 'books', parent_id: null, product_count: 50,
    subcategories: [
      { id: 'cat-3', title: 'Fiction', slug: 'fiction', parent_id: 'cat-1', product_count: 20, subcategories: [] },
      { id: 'cat-4', title: 'Non-Fiction', slug: 'non-fiction', parent_id: 'cat-1', product_count: 30, subcategories: [] },
    ]
  },
  'childrens-books': {
    id: 'cat-2', title: 'Children\'s Books', slug: 'childrens-books', parent_id: null, product_count: 15,
    subcategories: []
  },
  'fiction': {
    id: 'cat-3', title: 'Fiction', slug: 'fiction', parent_id: 'cat-1', product_count: 20,
    subcategories: [
        { id: 'cat-3-1', title: 'Fantasy', slug: 'fantasy', parent_id: 'cat-3', product_count: 10, subcategories: [] },
        { id: 'cat-3-2', title: 'Sci-Fi', slug: 'sci-fi', parent_id: 'cat-3', product_count: 10, subcategories: [] },
    ]
  },
   'non-fiction': {
    id: 'cat-4', title: 'Non-Fiction', slug: 'non-fiction', parent_id: 'cat-1', product_count: 30,
    subcategories: []
  },
   'bestsellers': {
    id: 'cat-5', title: 'Bestsellers', slug: 'bestsellers', parent_id: null, product_count: 10,
    subcategories: []
  },
   'new-arrivals': {
    id: 'cat-6', title: 'New Arrivals', slug: 'new-arrivals', parent_id: null, product_count: 12,
    subcategories: []
  }
};

const productDetails: { [key: string]: ProductDetail } = {};
// FIX: Added index `i` to the forEach callback parameters to make it available for generating recommendations.
products.forEach((p, i) => {
    productDetails[p.id] = {
        ...p,
        description: `This is a detailed description for "${p.title}". It's a compelling story that will keep you on the edge of your seat from start to finish. Written by the acclaimed ${p.author}, this book explores deep themes with rich character development. A must-read for any enthusiast of the genre.`,
        specs: {
            ISBN: `978-0-${Math.floor(100000000 + Math.random() * 900000000)}`,
            Publisher: `Random House ${p.id}`,
            'Publication Date': '2023-10-26',
            Pages: `${200 + Math.floor(Math.random() * 150)}`,
            Format: 'Paperback'
        },
        ratings_avg: parseFloat((3.5 + Math.random() * 1.5).toFixed(1)),
        reviews_count: 5 + Math.floor(Math.random() * 20),
        reviews: Array.from({length: 3 + Math.floor(Math.random() * 5)}, (_, i) => ({
            id: `rev-${p.id}-${i}`,
            author: `Reviewer ${i+1}`,
            rating: 3 + Math.floor(Math.random() * 3),
            text: `This was a truly captivating read. I couldn't put it down. The characters felt real and the plot was intriguing. Highly recommended!`,
            created_at: '2023-11-15'
        })),
        recommendations: products.slice(i > 5 ? i - 5 : 0, i).reverse()
    }
});


// --- API FUNCTIONS ---

const mockFetch = <T,>(data: T): Promise<T> => {
    return new Promise(resolve => setTimeout(() => resolve(data), MOCK_DELAY));
}

export const getHeadings = (): Promise<NavigationHeading[]> => {
    return mockFetch(navigationHeadings);
}

export const getCategoryBySlug = (slug: string): Promise<Category | undefined> => {
    const category = categories[slug];
    return mockFetch(category);
}

export const getProducts = (categorySlug: string, page: number = 1, limit: number = 12): Promise<{ products: Product[], total: number }> => {
    // In a real app, you'd filter by categorySlug
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginatedProducts = products.slice(start, end);
    return mockFetch({ products: paginatedProducts, total: products.length });
}

export const getProductById = (id: string): Promise<ProductDetail | undefined> => {
    return mockFetch(productDetails[id]);
}