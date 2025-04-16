export interface Product {
    productId: number;
    rating: number;
    productName: string;
    category: string;
    price: number;
    isSale: boolean;
    releaseDate: string;
    availableQty: number;
    imageUrl: string;
    isNew?: boolean; // Optional property
}