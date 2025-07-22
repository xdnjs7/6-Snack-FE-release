import { cookieFetch } from './fetchClient.api';

// Purchase History Type Definitions (실제 백엔드 응답에 맞춤)
export interface Product {
  id: number;
  productName: string;
  price: number;
  imageUrl?: string;
  quantity: number;
}

export interface Budget {
  currentMonthBudget: number | null;
  currentMonthExpense: number | null;
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
  requester?: string;
  products: Product[];
  budget: Budget;
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

// 관리자 - 모든 주문 목록 조회
export const getMyOrders = async (params?: {
  page?: number;
  sort?: string;
  status?: 'pending' | 'approved' | 'rejected' | 'canceled';
}): Promise<OrderHistory[]> => {
  try {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.sort) queryParams.append('sort', params.sort);
    if (params?.status) queryParams.append('status', params.status);
    
    const queryString = queryParams.toString();
    const url = queryString ? `/admin/orders?${queryString}` : '/admin/orders';
    
    return await cookieFetch(url);
  } catch (error) {
    throw error;
  }
};

// 관리자 - 주문 상세 조회
export const getOrderDetail = async (
  orderId: string, 
  status?: 'pending' | 'approved' | 'rejected' | 'canceled'
): Promise<OrderHistory> => {
  try {
    const queryParams = new URLSearchParams();
    if (status) queryParams.append('status', status);
    
    const queryString = queryParams.toString();
    const url = queryString ? `/admin/orders/${orderId}?${queryString}` : `/admin/orders/${orderId}`;
    
    // 백엔드에서 직접 OrderHistory 객체를 반환하므로 data 필드 접근 제거
    const response: OrderHistory = await cookieFetch(url);
    return response;
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