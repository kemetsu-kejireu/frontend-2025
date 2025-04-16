export interface OrderRequest {
    userId: string;
    userName: string;
    totalPrice: number;
    totalQuantity: number;
    orderItems: OrderItem[];
}

export interface OrderItem {
    productId: number;
    productName: string;
    price: number;
}

export interface OrderResponse {
    orderNumber: string;
    status: string;
    message: string;
}

export interface OrderHistoryResponse {
  content: OrderDTO[];
  pageable: PageableDTO;
}

export interface OrderDTO {
  orderDate: string;
  orderNumber: string;
  totalPrice: number;
  totalQuantity: number;
  orderItems: OrderItem[];
}

export interface PageableDTO {
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
}
