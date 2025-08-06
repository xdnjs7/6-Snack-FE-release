"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useProductDetail } from "@/hooks/useProductDetail";
import { addToCart } from "@/lib/api/addToCart.api";
import CategoryNavigation from "./ProductDetail/CategoryNavigation";
import ProductImage from "./ProductDetail/ProductImage";
import ProductBasicInfo from "./ProductDetail/ProductBasicInfo";
import ProductActions from "./ProductDetail/ProductActions";
import CartAndLikeButtons from "./ProductDetail/CartAndLikeButtons";
import ProductInfoSections from "./ProductDetail/ProductInfoSections";
import { useAuth } from "@/providers/AuthProvider";
import { useCurrentSubCategory } from "@/hooks/useCurrentSubCategory";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Toast from "@/components/common/Toast";
import { useToggleFavorite } from "@/hooks/useToggleFavorite";

type TProductDetailProps = {
  productId: number;
};

export default function ProductDetail({ productId }: TProductDetailProps) {
  const [selectedQuantity, setSelectedQuantity] = useState(0);
  const { data: product, isLoading, isError } = useProductDetail(productId);
  const { user } = useAuth();
  const router = useRouter();
  const { findCategoryPath } = useCurrentSubCategory();
  const queryClient = useQueryClient();

  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState<"success" | "error">("success");
  const [isFavorite, setIsFavorite] = useState(false); // ⭐️ UI용 좋아요 상태

  // 좋아요 toggle mutation
  const { mutate: toggleFavorite } = useToggleFavorite(productId, {
    onMutate: () => setIsFavorite((prev) => !prev),
    onError: () => setIsFavorite((prev) => !prev), // 에러 시 롤백
  });

  const showToast = (message: string, variant: "success" | "error" = "success") => {
    setToastMessage(message);
    setToastVariant(variant);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2000);
  };

  const { mutate: mutateAddToCart } = useMutation({
    mutationFn: () => {
      if (!product) throw new Error("상품 정보가 없습니다.");
      return addToCart(product.id, selectedQuantity);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      router.push("/cart");
    },
    onError: () => {
      alert("장바구니 추가 실패");
    },
  });

  useEffect(() => {
    if (product?.category?.id) {
      findCategoryPath(product.category.id);
    }
  }, [product?.category?.id, findCategoryPath]);

  useEffect(() => {
    if (product) {
      setIsFavorite(product.isFavorite); // 최초 렌더링 시 좋아요 상태 설정
    }
  }, [product]);

  if (isLoading) return <p>로딩 중...</p>;
  if (isError || !product) return <p>상품 정보를 불러올 수 없습니다.</p>;

  const handleAddToCart = () => {
    if (selectedQuantity < 1) {
      alert("상품의 수량을 1개 이상 선택해주세요.");
      return;
    }

    mutateAddToCart();
  };

  const canEdit = user?.id === product.creatorId || user?.role === "ADMIN" || user?.role === "SUPER_ADMIN";

  const handleToggleFavorite = () => {
    toggleFavorite(isFavorite); // 현재 상태를 전달
  };

  return (
    <div className="w-full flex flex-col justify-center items-center sm:max-w-[1180px]">
      <div className="w-full flex flex-col justify-center items-start gap-7.5">
        <CategoryNavigation
          parentCategory={product.category.parent?.name ?? "기타"}
          childCategory={product.category.name}
        />
        <div className="w-full flex flex-col md:flex-row md:gap-10">
          <ProductImage imageUrl={product.imageUrl} />
          <div className="flex flex-col justify-center md:justify-start items-center w-full gap-8 md:gap-7.5 pt-7.5 md:pt-8">
            <div className="self-stretch inline-flex justify-between items-start">
              <ProductBasicInfo product={product} />
              <ProductActions
                selectedQuantity={selectedQuantity}
                onQuantityChange={setSelectedQuantity}
                canEdit={canEdit}
                productId={product.id}
                productName={product.name}
                showToast={showToast}
              />
            </div>
            <div className="flex flex-col justify-center items-center w-full">
              <CartAndLikeButtons
                onAddToCart={handleAddToCart}
                isFavorite={isFavorite}
                onToggleFavorite={handleToggleFavorite}
                productId={product.id}
              />
              <ProductInfoSections />
            </div>
          </div>
        </div>
      </div>
      {toastVisible && (
        <Toast
          text={toastMessage}
          variant={toastVariant}
          isVisible={toastVisible}
          onClose={() => setToastVisible(false)}
        />
      )}
    </div>
  );
}
