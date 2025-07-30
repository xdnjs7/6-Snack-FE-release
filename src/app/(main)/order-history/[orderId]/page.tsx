'use client';

import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { getOrderDetail, TOrderHistory, TProduct } from '@/lib/api/orderHistory.api';
import ArrowIconSvg from '@/components/svg/ArrowIconSvg';

// 타입 정의
type TOrderStatus = 'pending' | 'approved' | 'rejected' | 'canceled' | null;

type TOrderHistoryDetailPageProps = Record<string, never>;

type TStatusTextMap = {
  [key: string]: string;
};

export default function OrderHistoryDetailPage({}: TOrderHistoryDetailPageProps) {
  const params = useParams();
  const searchParams = useSearchParams();
  const orderId: string = params.orderId as string;
  const status: TOrderStatus = searchParams.get('status') as TOrderStatus;

  const [orderData, setOrderData] = useState<TOrderHistory | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isItemsExpanded, setIsItemsExpanded] = useState<boolean>(true);

  useEffect(() => {
    const fetchOrderDetail = async (): Promise<void> => {
      try {
        setIsLoading(true);
        console.log('Fetching order detail for:', orderId, 'with status:', status);
        const data: TOrderHistory = await getOrderDetail(orderId, status || undefined);
        console.log('Received data:', data);
        setOrderData(data);
      } catch (err) {
        setError('주문 내역을 불러오는데 실패했습니다.');
        console.error('Error fetching order detail:', err);
      } finally {
        setIsLoading(false);
      }
    };

    if (orderId) {
      fetchOrderDetail();
    }
  }, [orderId, status]);

  const getStatusText = (status: string): string => {
    const statusTextMap: TStatusTextMap = {
      'PENDING': '승인 대기',
      'APPROVED': '구매 승인',
      'REJECTED': '구매 반려'
    };
    
    return statusTextMap[status] || status;
  };

  const formatDate = (dateString: string | undefined | null): string => {
    if (!dateString) return '-';
    try {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}.${month}.${day}`;
    } catch (error) {
      console.error('Date formatting error:', error);
      return '-';
    }
  };

  const formatPrice = (price: number | undefined | null): string => {
    if (price === undefined || price === null) return '0';
    return price.toLocaleString('ko-KR');
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
        <div className="text-lg text-red-600">{error || '주문 내역을 찾을 수 없습니다.'}</div>
      </div>
    );
  }

  const calculatedTotal: number = orderData.products?.reduce((sum: number, item: TProduct) => 
    sum + (item.price * item.quantity), 0
  ) || 0;
  const shippingFee: number = 3000;
  const finalTotal: number = calculatedTotal + shippingFee;

  return (
    <div className="min-h-screen bg-white">
      {/* Main Content */}
      <div className="w-full max-w-7xl mx-auto pt-[30px] flex flex-col justify-start items-start gap-[23px]">
        <div className="self-stretch justify-center text-gray-950 text-lg font-bold font-['SUIT']">
          구매 내역 상세
        </div>

        {/* Items Section */}
        <div className="self-stretch flex flex-col justify-start items-start gap-10">
          <div className="self-stretch flex flex-col justify-start items-start gap-[15px]">
            <div 
              className="inline-flex justify-start items-start gap-1.5 cursor-pointer"
              onClick={() => setIsItemsExpanded(!isItemsExpanded)}
            >
              <div className="justify-center text-gray-950 text-base font-bold font-['SUIT']">구매 품목</div>
              <div className="justify-center text-gray-950 text-base font-normal font-['SUIT']">
                총 {orderData.products?.length || 0}개
              </div>
              <ArrowIconSvg 
                direction={isItemsExpanded ? "up" : "down"} 
                className="w-5 h-5 text-gray-950" 
              />
            </div>

            {isItemsExpanded && (
              <div className="self-stretch bg-white rounded-sm sm:shadow-[0px_0px_6px_0px_rgba(0,0,0,0.10)] sm:outline-1 sm:outline-neutral-200 flex flex-col justify-start items-start gap-5 sm:px-5 sm:pt-5 sm:pb-[30px] md:px-[60px] md:py-[40px]">
                {/* Items List */}
                <div className="self-stretch flex flex-col justify-start items-start gap-[16px] sm:gap-0">
                  {orderData.products?.map((item: TProduct) => (
                                        <div 
                      key={item.id} 
                      className="self-stretch border-b border-neutral-200 inline-flex justify-between items-center sm:py-5 sm:pr-5"
                    >
                      <div className="flex gap-5 flex-1 sm:flex sm:justify-start sm:items-center sm:gap-5">
                        <div className="w-24 h-24 sm:w-[140px] sm:h-[140px] bg-[--color-white] shadow-[4px_4px_20px_0px_rgba(250,247,243,0.25)] flex justify-center items-center gap-2.5">
                          {item.imageUrl && (
                            <Image 
                              src={item.imageUrl} 
                              alt={item.productName}
                              width={56}
                              height={96}
                              className="w-10 h-16 sm:w-14 sm:h-24 relative object-contain" 
                            />
                          )}
                        </div>
                        <div className="flex-1 inline-flex flex-col items-start gap-3 sm:justify-start sm:inline-flex sm:flex-col sm:justify-start sm:items-start sm:gap-7">
                          <div className="flex flex-col justify-center items-start gap-1 sm:justify-start sm:gap-2.5">
                            <div className="text-center justify-center text-gray-950 text-sm sm:text-base font-medium font-['SUIT']">
                              {item.productName}
                            </div>
                            <div className="justify-start text-gray-950 text-sm sm:text-base font-bold font-['SUIT']">
                              {formatPrice(item.price)}원
                            </div>
                          </div>
                          <div className="flex justify-between items-center w-full sm:justify-start sm:flex sm:justify-start">
                            <div className="justify-center text-gray-500 text-[13px] sm:text-base font-bold font-['SUIT']">
                              수량 {item.quantity}개
                            </div>
                            <div className="text-center justify-center text-gray-700 text-base font-bold font-['SUIT'] sm:hidden">
                              {formatPrice(item.price * item.quantity)}원
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="hidden sm:block text-center justify-center text-gray-700 text-[20px] font-extrabold font-['SUIT']">
                        {formatPrice(item.price * item.quantity)}원
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Amount Info */}
                                  <div className="self-stretch flex flex-col gap-3 sm:gap-[7px] sm:px-5">
                    <div className="flex justify-between items-center">
                      <div className="text-center justify-center text-gray-700 text-sm sm:text-base font-bold font-['SUIT']">주문금액</div>
                      <div className="text-center justify-center text-gray-700 text-sm sm:text-base font-bold font-['SUIT']">
                        {formatPrice(calculatedTotal)}원
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-center justify-center text-gray-700 text-sm sm:text-base font-bold font-['SUIT']">배송비</div>
                      <div className="text-center justify-center text-gray-700 text-sm sm:text-base font-bold font-['SUIT']">
                        {formatPrice(shippingFee)}원
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-center justify-center text-gray-950 text-lg sm:text-lg font-bold font-['SUIT']">총 주문금액</div>
                      <div className="text-center justify-center text-gray-950 text-lg sm:text-2xl font-bold sm:font-extrabold font-['SUIT']">
                        {formatPrice(finalTotal)}원
                      </div>
                    </div>
                  </div>
              </div>
            )}
          </div>
        </div>

        {/* Request Info Section */}
        <div className="self-stretch flex flex-col justify-start items-start">
          <div className="self-stretch py-3.5 border-b border-neutral-800 inline-flex justify-start items-center gap-2 sm:pl-2">
            <div className="text-center justify-center text-gray-950 text-sm sm:text-base font-extrabold font-['SUIT']">요청 정보</div>
          </div>
          <div className="self-stretch flex flex-col justify-center items-start sm:flex sm:flex-row sm:justify-start sm:items-stretch">
            <div className="self-stretch inline-flex justify-start items-center sm:flex-1">
              <div className="w-36 h-12 p-2 border-r border-b border-neutral-200 flex justify-start items-center gap-2">
                <div className="text-center justify-center text-gray-950 text-sm sm:text-base font-normal font-['SUIT']">요청인</div>
              </div>
              <div className="flex-1 h-12 px-4 py-2 border-b border-neutral-200 flex justify-start items-center gap-2 sm:border-r">
                <div className="text-center justify-center text-gray-900 text-sm sm:text-base font-bold font-['SUIT']">
                  {orderData.requester || "-"}
                </div>
              </div>
            </div>
            <div className="self-stretch inline-flex justify-start items-center sm:flex-1">
              <div className="w-36 h-12 p-2 border-r border-b border-neutral-200 flex justify-start items-center gap-2">
                <div className="text-center justify-center text-gray-950 text-sm sm:text-base font-normal font-['SUIT']">요청 날짜</div>
              </div>
              <div className="flex-1 h-12 px-4 py-2 border-b border-neutral-200 flex justify-start items-center gap-2">
                <div className="text-center justify-center text-gray-900 text-sm sm:text-base font-bold font-['SUIT']">
                  {formatDate(orderData.createdAt)}
                </div>
              </div>
            </div>
          </div>
          <div className="self-stretch inline-flex justify-start items-start">
            <div className="w-36 self-stretch px-2 py-4 border-r border-b border-neutral-200 flex justify-start items-start gap-2">
              <div className="text-center justify-center text-gray-950 text-sm sm:text-base font-normal font-['SUIT']">요청 메시지</div>
            </div>
            <div className="flex-1 p-4 border-b border-neutral-200 flex justify-start items-center gap-2">
              <div className="flex-1 justify-center text-gray-900 text-sm sm:text-base font-bold font-['SUIT'] leading-snug">
                {orderData.requestMessage || "요청 메시지가 없습니다."}
              </div>
            </div>
          </div>
        </div>

        {/* Approval Info Section */}
        <div className="self-stretch flex flex-col justify-start items-start">
          <div className="self-stretch py-3.5 border-b border-neutral-800 inline-flex justify-start items-center gap-2 sm:pl-2">
            <div className="text-center justify-center text-gray-950 text-sm sm:text-base font-extrabold font-['SUIT']">승인 정보</div>
          </div>
          <div className="self-stretch flex flex-col justify-center items-start sm:flex sm:flex-row sm:justify-start sm:items-stretch">
            <div className="self-stretch inline-flex justify-start items-center sm:flex-1">
              <div className="w-36 h-12 p-2 border-r border-b border-neutral-200 flex justify-start items-center gap-2">
                <div className="text-center justify-center text-gray-950 text-sm sm:text-base font-normal font-['SUIT']">담당자</div>
              </div>
              <div className="flex-1 h-12 px-4 py-2 border-b border-neutral-200 flex justify-start items-center gap-2 sm:border-r">
                <div className="text-center justify-center text-gray-900 text-sm sm:text-base font-bold font-['SUIT']">
                  {orderData.approver || "-"}
                </div>
              </div>
            </div>
            <div className="self-stretch inline-flex justify-start items-center sm:flex-1">
              <div className="w-36 h-12 p-2 border-r border-b border-neutral-200 flex justify-start items-center gap-2">
                <div className="text-center justify-center text-gray-950 text-sm sm:text-base font-normal font-['SUIT']">승인 날짜</div>
              </div>
              <div className="flex-1 h-12 px-4 py-2 border-b border-neutral-200 flex justify-start items-center gap-2">
                <div className="text-center justify-center text-gray-900 text-sm sm:text-base font-bold font-['SUIT']">
                  {orderData.updatedAt ? formatDate(orderData.updatedAt) : "-"}
                </div>
              </div>
            </div>
          </div>
          <div className="self-stretch flex flex-col justify-center items-start sm:flex sm:flex-row sm:justify-start sm:items-stretch">
            <div className="self-stretch inline-flex justify-start items-center sm:flex-1">
              <div className="w-36 self-stretch px-2 py-4 border-r border-b border-neutral-200 flex justify-start items-start gap-2">
                <div className="text-center justify-center text-gray-950 text-sm sm:text-base font-normal font-['SUIT']">상태</div>
              </div>
              <div className="flex-1 self-stretch p-4 border-b border-neutral-200 flex justify-start items-start gap-2 sm:border-r">
                <div className="text-center justify-center text-gray-900 text-sm sm:text-base font-bold font-['SUIT']">
                  {getStatusText(orderData.status)}
                </div>
              </div>
            </div>
            <div className="self-stretch inline-flex justify-start items-start sm:flex-1">
              <div className="w-36 self-stretch px-2 py-4 border-r border-b border-neutral-200 flex justify-start items-start gap-2">
                <div className="text-center justify-center text-gray-950 text-sm sm:text-base font-normal font-['SUIT']">결과 메시지</div>
              </div>
              <div className="flex-1 p-4 border-b border-neutral-200 flex justify-start items-center gap-2">
                <div className="flex-1 justify-center text-gray-900 text-sm sm:text-base font-bold font-['SUIT'] leading-snug">
                  {orderData.adminMessage || "-"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 