"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { getMyOrderDetail, TMyOrderDetail } from "@/lib/api/orderHistory.api";
import { cookieFetch } from "@/lib/api/fetchClient.api";
import Toast from "@/components/common/Toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  OrderItemsSection, 
  RequestInfoSection, 
  ApprovalInfoSection, 
  getStatusText, 
  formatDate 
} from "@/components/common/OrderDetail";

// 타입 정의
type TMyOrderDetailPageProps = Record<string, never>;

export default function MyOrderDetailPage({}: TMyOrderDetailPageProps) {
  const params = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const orderId: string = params.orderId as string;

  const [orderData, setOrderData] = useState<TMyOrderDetail | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<{
    isVisible: boolean;
    text: string;
    variant: "success" | "error";
  }>({
    isVisible: false,
    text: "",
    variant: "error",
  });

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const fetchOrderDetail = async (): Promise<void> => {
      try {
        setIsLoading(true);
        console.log("Fetching order detail for:", orderId);
        const data: TMyOrderDetail = await getMyOrderDetail(orderId);
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
  }, [orderId]);

  // 타이머 언마운트 시 클린업
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  // 목록으로 돌아가기
  const handleBackToList = () => {
    router.push("/my/order-list");
  };

  // Toast 표시 함수
  const showToast = (text: string, variant: "success" | "error" = "error") => {
    setToast({
      isVisible: true,
      text,
      variant,
    });

    // 기존 타이머가 있다면 정리
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // 3초 후 자동으로 숨기기
    timerRef.current = setTimeout(() => {
      setToast((prev) => ({ ...prev, isVisible: false }));
    }, 3000);
  };

  // 장바구니에 상품 추가하는 API 함수
  const addToCart = async (productId: number, quantity: number): Promise<void> => {
    try {
      await cookieFetch("/cart", {
        method: "POST",
        body: JSON.stringify({
          productId,
          quantity,
        }),
      });
    } catch (error) {
      throw error;
    }
  };

  // 장바구니 추가 mutation
  const { mutate: addToCartMutation, isPending: isAddingToCart } = useMutation({
    mutationFn: async () => {
      if (!orderData || !orderData.receipts) return;

      // 주문 내역의 각 상품을 개별적으로 장바구니에 추가
      for (const item of orderData.receipts) {
        await addToCart(item.productId, item.quantity);
      }
    },
    onSuccess: () => {
      // 강제로 refetch 실행
      queryClient.refetchQueries({
        predicate: (query) => query.queryKey[0] === "cart",
      });
      showToast("장바구니에 상품이 추가되었습니다.", "success");
    },
    onError: (error) => {
      console.error("장바구니 추가 실패:", error);
      showToast("장바구니에 상품을 추가하는데 실패했습니다.", "error");
    },
  });

  // 장바구니에 다시 담기
  const handleAddToCart = () => {
    if (!orderData || !orderData.receipts) return;
    addToCartMutation();
  };

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
      {/* Toast */}
      <Toast text={toast.text} variant={toast.variant} isVisible={toast.isVisible} />
      {/* Main Content */}
      <div className="w-full max-w-7xl mx-auto pt-[30px] flex flex-col justify-start items-start gap-[23px]">
        <div className="self-stretch justify-center text-gray-950 text-lg font-bold font-['SUIT']">구매 요청 내역</div>

        {/* Items Section */}
        <OrderItemsSection 
          receipts={orderData.receipts}
          title="구매 품목"
        />

        {/* Request Info Section */}
        <RequestInfoSection
          userName={orderData.user?.name}
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

        {/* Bottom Action Buttons */}
        <div className="self-stretch flex justify-center items-center gap-4 pt-6 sm:pt-8">
          <div
            className="w-[155.5px] sm:w-[338px] md:w-[296px] h-16 px-4 py-3 bg-white rounded-sm outline outline-1 outline-offset-[-1px] outline-zinc-400 inline-flex justify-center items-center cursor-pointer hover:bg-gray-50"
            onClick={handleBackToList}
          >
            <div className="text-center justify-center text-neutral-800 text-base font-bold font-['SUIT']">
              목록 보기
            </div>
          </div>
          <div
            className="w-[155.5px] sm:w-[338px] md:w-[300px] h-16 px-4 py-3 bg-neutral-800 rounded-sm inline-flex justify-center items-center cursor-pointer hover:bg-neutral-700 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleAddToCart}
            style={{ pointerEvents: isAddingToCart ? "none" : "auto" }}
          >
            <div className="text-center justify-center text-white text-base font-bold font-['SUIT']">
              {isAddingToCart ? "처리 중..." : "장바구니 다시 담기"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
