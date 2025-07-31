"use client";

import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { getOrderDetail, TOrderHistory } from "@/lib/api/orderHistory.api";
import { 
  OrderItemsSection, 
  RequestInfoSection, 
  ApprovalInfoSection, 
  getStatusText, 
  formatDate 
} from "@/components/common/OrderDetail";

// 타입 정의
type TOrderStatus = "pending" | "approved" | "rejected" | "canceled" | null;

type TOrderHistoryDetailPageProps = Record<string, never>;

export default function OrderHistoryDetailPage({}: TOrderHistoryDetailPageProps) {
  const params = useParams();
  const searchParams = useSearchParams();
  const orderId: string = params.orderId as string;
  const status: TOrderStatus = searchParams.get("status") as TOrderStatus;

  const [orderData, setOrderData] = useState<TOrderHistory | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrderDetail = async (): Promise<void> => {
      try {
        setIsLoading(true);
        console.log("Fetching order detail for:", orderId, "with status:", status);
        const data: TOrderHistory = await getOrderDetail(orderId, status || undefined);
        console.log("Received data:", data);
        setOrderData(data);
      } catch (err) {
        setError("주문 내역을 불러오는데 실패했습니다.");
        console.error("Error fetching order detail:", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (orderId) {
      fetchOrderDetail();
    }
  }, [orderId, status]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-lg">로딩 중...</div>
      </div>
    );
  }

  if (error || !orderData) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-lg text-red-600">{error || "주문 내역을 찾을 수 없습니다."}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Main Content */}
      <div className="w-full max-w-7xl mx-auto pt-[30px] flex flex-col justify-start items-start gap-[23px]">
        <div className="self-stretch justify-center text-gray-950 text-lg font-bold font-['SUIT']">구매 내역 상세</div>

        {/* Items Section */}
        <OrderItemsSection 
          products={orderData.products}
          title="구매 품목"
        />

        {/* Request Info Section */}
        <RequestInfoSection
          requester={orderData.requester}
          createdAt={orderData.createdAt}
          requestMessage={orderData.requestMessage}
          formatDate={formatDate}
        />

        {/* Approval Info Section */}
        <ApprovalInfoSection
          approver={orderData.approver}
          updatedAt={orderData.updatedAt}
          status={orderData.status}
          adminMessage={orderData.adminMessage}
          formatDate={formatDate}
          getStatusText={getStatusText}
        />
      </div>
    </div>
  );
}
