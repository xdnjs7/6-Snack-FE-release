"use client";

import { useState, useEffect, useCallback, useMemo, Suspense, lazy } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import Head from "next/head";
import { getOrderDetail, TOrderHistory } from "@/lib/api/orderHistory.api";
import { 
  getStatusText, 
  formatDate 
} from "@/components/common/OrderDetail";

// Lazy loading으로 컴포넌트 분리 - 더 세밀한 분리
const OrderItemsSection = lazy(() => import("@/components/common/OrderDetail/OrderItemsSection"));
const RequestInfoSection = lazy(() => import("@/components/common/OrderDetail/RequestInfoSection"));
const ApprovalInfoSection = lazy(() => import("@/components/common/OrderDetail/ApprovalInfoSection"));

// 타입 정의
type TOrderStatus = "pending" | "approved" | "rejected" | "canceled" | null;

type TOrderHistoryDetailPageProps = Record<string, never>;

// 최적화된 로딩 스켈레톤 컴포넌트 - 레이아웃 시프트 방지
const LoadingSkeleton = () => (
  <div className="min-h-screen bg-white">
    <div className="w-full max-w-7xl mx-auto pt-[30px] flex flex-col justify-start items-start gap-[23px]">
      <div className="self-stretch justify-center text-primary-950 text-lg font-bold ">구매 내역 상세</div>
      
      {/* 스켈레톤 UI - 실제 레이아웃과 동일한 크기 */}
      <div className="self-stretch flex flex-col justify-start items-start gap-10">
        <div className="self-stretch flex flex-col justify-start items-start gap-[15px]">
          <div className="inline-flex justify-start items-start gap-1.5">
            <div className="justify-center text-primary-950 text-base font-bold ">구매 품목</div>
            <div className="justify-center text-primary-950 text-base font-normal ">총 0개</div>
          </div>
          <div className="self-stretch bg-white rounded-sm sm:shadow-[0px_0px_6px_0px_rgba(0,0,0,0.10)] sm:outline-1 sm:outline-primary-200 flex flex-col justify-start items-start gap-5 sm:px-5 sm:pt-5 sm:pb-[30px] md:px-[60px] md:py-[40px]">
            <div className="self-stretch flex flex-col justify-start items-start gap-[16px] sm:gap-0">
              {[1, 2].map((i) => (
                <div key={i} className="self-stretch border-b border-primary-200 inline-flex justify-between items-center sm:py-5 sm:pr-5">
                  <div className="flex gap-5 flex-1 sm:flex sm:justify-start sm:items-center sm:gap-5">
                    <div className="w-[72px] sm:w-[140px] h-[72px] sm:h-[140px] bg-primary-50 sm:bg-white rounded-xs animate-pulse" style={{ aspectRatio: '1' }}></div>
                    <div className="flex-1 inline-flex flex-col items-start gap-3 sm:justify-start sm:inline-flex sm:flex-col sm:justify-start sm:items-start sm:gap-7">
                      <div className="flex flex-col justify-center items-start gap-1 sm:justify-start sm:gap-2.5">
                        <div className="w-32 h-4 bg-primary-200 animate-pulse rounded"></div>
                        <div className="w-20 h-4 bg-primary-200 animate-pulse rounded"></div>
                      </div>
                      <div className="flex justify-between items-center w-full sm:justify-start sm:flex sm:justify-start">
                        <div className="w-16 h-4 bg-primary-200 animate-pulse rounded"></div>
                        <div className="text-center justify-center text-primary-700 text-base font-bold  sm:hidden w-20 h-4 bg-primary-200 animate-pulse rounded"></div>
                      </div>
                    </div>
                  </div>
                  <div className="hidden sm:block w-24 h-6 bg-primary-200 animate-pulse rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 하단 버튼 스켈레톤 */}
      <div className="self-stretch h-16 inline-flex justify-start md:justify-center items-center gap-5">
        <div className="flex-1 md:flex-none md:w-[260px] h-16 bg-primary-200 animate-pulse rounded"></div>
        <div className="flex-1 md:flex-none md:w-[264px] h-16 bg-primary-200 animate-pulse rounded"></div>
      </div>
    </div>
  </div>
);

// 최적화된 에러 컴포넌트
const ErrorComponent = ({ error }: { error: string | null }) => (
  <div className="min-h-screen bg-white flex items-center justify-center">
    <div className="text-lg text-red-600">{error || "주문 내역을 찾을 수 없습니다."}</div>
  </div>
);

export default function OrderHistoryDetailPage({}: TOrderHistoryDetailPageProps) {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId: string = params.orderId as string;
  const status: TOrderStatus = searchParams.get("status") as TOrderStatus;

  const [orderData, setOrderData] = useState<TOrderHistory | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // 메모이제이션된 네비게이션 핸들러
  const handleGoHome = useCallback(() => {
    router.push("/products");
  }, [router]);

  const handleGoToOrderHistory = useCallback(() => {
    router.push("/order-history");
  }, [router]);

  // 메모이제이션된 fetchOrderDetail 함수 - 메인 스레드 최적화
  const fetchOrderDetail = useCallback(async (): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);
      
      // 비동기 작업을 별도로 처리하여 메인 스레드 블로킹 방지
      const data: TOrderHistory = await getOrderDetail(orderId, status || undefined);
      
      // 상태 업데이트를 requestAnimationFrame으로 지연시켜 렌더링 최적화
      requestAnimationFrame(() => {
        setOrderData(data);
        setIsLoading(false);
      });
    } catch {
      requestAnimationFrame(() => {
        setError("주문 내역을 불러오는데 실패했습니다.");
        setIsLoading(false);
      });
    }
  }, [orderId, status]);

  useEffect(() => {
    if (orderId) {
      // 초기 로딩을 지연시켜 FCP 개선
      const timer = setTimeout(() => {
        fetchOrderDetail();
      }, 0);
      
      return () => clearTimeout(timer);
    }
  }, [orderId, fetchOrderDetail]);

  // 페이지 제목 메모이제이션
  const pageTitle = useMemo(() => {
    if (orderData) {
      return `구매 내역 상세 - ${orderData.products?.length || 0}개 상품`;
    }
    return "구매 내역 상세";
  }, [orderData]);

  // 메인 컨텐츠 메모이제이션 - 레이아웃 시프트 방지
  const mainContent = useMemo(() => {
    if (!orderData) return null;
    
    return (
      <div className="min-h-screen bg-white">
        <div className="w-full max-w-7xl mx-auto pt-[30px] flex flex-col justify-start items-start gap-[23px]">
          <div className="self-stretch justify-center text-primary-950 text-lg font-bold ">구매 내역 상세</div>

          <Suspense fallback={
            <div className="w-full h-32 bg-primary-100 animate-pulse rounded" style={{ minHeight: '128px' }}></div>
          }>
            <OrderItemsSection 
              products={orderData.products}
              title="구매 품목"
            />
          </Suspense>

          <Suspense fallback={
            <div className="w-full h-32 bg-primary-100 animate-pulse rounded" style={{ minHeight: '128px' }}></div>
          }>
            <RequestInfoSection
              requester={orderData.requester}
              createdAt={orderData.createdAt}
              requestMessage={orderData.requestMessage}
              formatDate={formatDate}
            />
          </Suspense>
          <Suspense fallback={
            <div className="w-full h-32 bg-primary-100 animate-pulse rounded" style={{ minHeight: '128px' }}></div>
          }>
            <ApprovalInfoSection
              approver={orderData.approver}
              updatedAt={orderData.updatedAt}
              status={orderData.status}
              adminMessage={orderData.adminMessage}
              formatDate={formatDate}
              getStatusText={getStatusText}
            />
          </Suspense>
          {/* 하단 버튼 */}
          <div className="self-stretch h-16 inline-flex justify-start md:justify-center items-center gap-5 mt-8">
            <button
              className="flex-1 md:flex-none md:w-[260px] h-16 px-4 py-3 bg-white rounded-[2px] outline-1 outline-offset-[-1px] outline-zinc-400 flex justify-center items-center text-lg font-semibold cursor-pointer hover:bg-primary-50 transition-colors duration-200"
              onClick={handleGoHome}
              type="button"
            >
              홈으로
            </button>
            <button
              className="flex-1 md:flex-none md:w-[264px] h-16 px-4 py-3 bg-primary-800 rounded-[2px] flex justify-center items-center text-base font-bold cursor-pointer hover:bg-primary-700 transition-colors duration-200 text-white"
              onClick={handleGoToOrderHistory}
              type="button"
            >
              구매 내역 확인
            </button>
          </div>
        </div>
      </div>
    );
  }, [orderData, handleGoHome, handleGoToOrderHistory]);

  if (isLoading) {
    return (
      <>
        <Head>
          <title>구매 내역 상세 - 로딩 중</title>
          <meta name="description" content="구매 내역을 불러오는 중입니다." />
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link rel="dns-prefetch" href="//fonts.googleapis.com" />
          <link rel="dns-prefetch" href="//fonts.gstatic.com" />
          {/* Critical CSS 인라인화 */}
          <style dangerouslySetInnerHTML={{
            __html: `
              @font-face {
                font-family: 'SUIT';
                src: url('/fonts/suit.woff2') format('woff2');
                font-display: swap;
              }
              .min-h-screen { min-height: 100vh; }
              .bg-white { background-color: #ffffff; }
              .animate-pulse { animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
              @keyframes pulse {
                0%, 100% { opacity: 1; }
                50% { opacity: .5; }
              }
            `
          }} />
        </Head>
        <LoadingSkeleton />
      </>
    );
  }

  if (error || !orderData) {
    return (
      <>
        <Head>
          <title>구매 내역 상세 - 오류</title>
          <meta name="description" content="구매 내역을 불러오는데 실패했습니다." />
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        </Head>
        <ErrorComponent error={error} />
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={`구매 내역 상세 페이지입니다. ${orderData.products?.length || 0}개의 상품이 포함되어 있습니다.`} />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link rel="preload" href="/fonts/suit.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        {/* Critical CSS 인라인화 */}
        <style dangerouslySetInnerHTML={{
          __html: `
            @font-face {
              font-family: 'SUIT';
              src: url('/fonts/suit.woff2') format('woff2');
              font-display: swap;
            }
            .min-h-screen { min-height: 100vh; }
            .bg-white { background-color: #ffffff; }
            .animate-pulse { animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
            @keyframes pulse {
              0%, 100% { opacity: 1; }
              50% { opacity: .5; }
            }
          `
        }} />
      </Head>
      {mainContent}
    </>
  );
}
