import { cookieFetch } from './fetchClient.api';

// Purchase History Type Definitions (실제 백엔드 응답에 맞춤)
export interface Receipt {
  id: number;
  productName: string;
  price: number;
  imageUrl?: string;
  quantity: number;
}

export interface OrderedItem {
  id: number;
  orderId: number;
  receiptId: number;
  productId: number;
  receipt: Receipt;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

export interface OrderHistory {
  id: number;
  userId: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'CANCELED';
  totalPrice: number;
  adminMessage?: string;
  requestMessage?: string;
  createdAt: string;
  updatedAt: string;
  approver?: string;
  user: User;
  orderedItems: OrderedItem[];
}

export interface OrderHistoryResponse {
  message: string;
  data: OrderHistory;
}

export interface OrderHistoryListResponse {
  orders: OrderHistory[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
}

// Fetch My Order Requests List
export const getMyOrders = async (params?: {
  page?: number;
  sort?: string;
}): Promise<OrderHistory[]> => {
  try {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.sort) queryParams.append('sort', params.sort);
    
    const queryString = queryParams.toString();
    const url = queryString ? `/orders?${queryString}` : '/orders';
    
    return await cookieFetch(url);
  } catch (error) {
    throw error;
  }
};

// Fetch Order Request Detail
export const getOrderDetail = async (orderId: string): Promise<OrderHistory> => {
  try {
    const response: OrderHistoryResponse = await cookieFetch(`/orders/${orderId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Cancel Order Request
export const cancelOrder = async (orderId: string): Promise<void> => {
  try {
    await cookieFetch(`/orders/${orderId}`, {
      method: 'PATCH',
      body: JSON.stringify({
        status: 'CANCELED'
      })
    });
  } catch (error) {
    throw error;
  }
}; 