export interface Vehicle {
  id: string;
  brand: string;
  model: string;
  year: string;
  image?: string;
}

export interface GalleryItem {
  id: number;
  title: string;
  description: string;
  src: string;
  colorCode: string;
  variants: { src: string; title: string }[];
}

export interface NavItem {
  label: string;
  path: string;
  isHash?: boolean;
}