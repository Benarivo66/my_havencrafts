export type SellerField = {
  id: string; 
  name: string;
  email: string;
  password: string;
  phone?: string;
  isSeller?: boolean; 
  bio?: string | null;
  profileImage?: string | undefined;
};

export type ProductField = {
  id: string; 
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  sellerId: string;
  category: string; 
};

export type ReviewField = {
  id: string; 
  sellerId: string; 
  productId: string; 
  content: string;
  rating: number; 
};
