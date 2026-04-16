import aviatorImg from '../assets/products/aviator.png';
import rectangularImg from '../assets/products/rectangular.png';
import roundImg from '../assets/products/round.png';
import lensImg from '../assets/products/lens.png';

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  category: 'Men' | 'Women' | 'Kids' | 'Unisex';
  type: 'Eyeglasses' | 'Sunglasses' | 'Computer Glasses';
  frameShape: 'Rectangular' | 'Round' | 'Aviator' | 'Cat Eye' | 'Wayfarer';
  material: 'Acetate' | 'Metal' | 'TR90';
  images: string[];
  rating: number;
  reviewsCount: number;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  colors: string[];
  tryOnModelId?: string;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Vincent Chase Polarized Aviator',
    brand: 'Vincent Chase',
    price: 1999,
    originalPrice: 3500,
    category: 'Men',
    type: 'Sunglasses',
    frameShape: 'Aviator',
    material: 'Metal',
    images: [aviatorImg, aviatorImg],
    rating: 4.8,
    reviewsCount: 120,
    isBestSeller: true,
    colors: ['Gold', 'Silver', 'Black'],
  },
  {
    id: '2',
    name: 'Lenskart Air Rectangular',
    brand: 'Lenskart Air',
    price: 2500,
    originalPrice: 4000,
    category: 'Unisex',
    type: 'Eyeglasses',
    frameShape: 'Rectangular',
    material: 'TR90',
    images: [rectangularImg, rectangularImg],
    rating: 4.7,
    reviewsCount: 85,
    isNewArrival: true,
    colors: ['Black', 'Navy', 'Grey'],
  },
  {
    id: '3',
    name: 'John Jacobs Classic Round',
    brand: 'John Jacobs',
    price: 4500,
    originalPrice: 6000,
    category: 'Women',
    type: 'Eyeglasses',
    frameShape: 'Round',
    material: 'Acetate',
    images: [roundImg, roundImg],
    rating: 4.9,
    reviewsCount: 45,
    isBestSeller: true,
    colors: ['Tortoise', 'Brown', 'Clear'],
  },
  {
    id: '4',
    name: 'Premium Ultra-Blue Lens',
    brand: 'Eyelens Pro',
    price: 1200,
    category: 'Unisex',
    type: 'Computer Glasses',
    frameShape: 'Round',
    material: 'Acetate',
    images: [lensImg, lensImg],
    rating: 4.6,
    reviewsCount: 230,
    colors: ['Clear'],
  }
];

export const categories = ['Men', 'Women', 'Kids', 'Computer Glasses', 'Sunglasses'];
export const shapes = ['Rectangular', 'Round', 'Aviator', 'Cat Eye', 'Wayfarer'];
export const materials = ['Acetate', 'Metal', 'TR90'];
