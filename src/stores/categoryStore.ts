// src/stores/categoryStore.ts
import { CATEGORIES } from "@/lib/constants/categories";
import { create } from "zustand";

type TCategoryState = {
  selectedCategory: {
    id: number;
    parent: string;
    child: string;
  } | null;
  selectedChild: { id: number; name: string } | null; // 선택된 단일 자식 카테고리
  childrenCategories: Array<{ id: number; name: string }>; // 해당 부모의 모든 자식 카테고리들

  setSelectedCategory: (category: { id: number; parent: string; child: string } | null) => void;
  setSelectedChild: (child: { id: number; name: string } | null) => void; // 선택된 자식 카테고리 설정
  clearSelectedCategory: () => void;
  findCategoryPath: (categoryId: number) => void;
  setChildrenCategories: (children: Array<{ id: number; name: string }>) => void;

  // Getter functions
  isCategorySelected: (categoryId: number) => boolean;
  getCurrentCategoryName: () => string;
  isChildCategorySelected: () => boolean;
  getCurrentChildrenCategories: () => Array<{ id: number; name: string }>;
};

export const useCategoryStore = create<TCategoryState>((set, get) => ({
  selectedCategory: null,
  selectedChild: null, // 선택된 단일 자식 카테고리
  childrenCategories: [], // 해당 부모의 모든 자식 카테고리들

  setSelectedCategory: (category) => set({ selectedCategory: category }),

  setSelectedChild: (child) => set({ selectedChild: child }),

  clearSelectedCategory: () =>
    set({
      selectedCategory: null,
      selectedChild: null,
      childrenCategories: [],
    }),

  setChildrenCategories: (children) => set({ childrenCategories: children }),

  findCategoryPath: (categoryId: number) => {
    const categories = CATEGORIES;

    // 먼저 부모 카테고리에서 찾기
    const parentCategory = categories.parentCategory.find((cat) => cat.id === categoryId);
    if (parentCategory) {
      // 부모 카테고리인 경우, 해당 부모의 자식 카테고리들도 함께 저장
      const children =
        categories.childrenCategory[parentCategory.name as keyof typeof categories.childrenCategory] || [];
      set({
        selectedCategory: {
          id: categoryId,
          parent: parentCategory.name,
          child: "", // 부모 카테고리만 선택된 경우 child는 빈 문자열
        },
        selectedChild: null, // 부모 카테고리 선택 시 자식은 null
        childrenCategories: children, // 해당 부모의 모든 자식 카테고리들 저장
      });
      return;
    }

    // 자식 카테고리에서 찾기
    for (const [parentName, children] of Object.entries(categories.childrenCategory)) {
      const child = children.find((c) => c.id === categoryId);
      if (child) {
        set({
          selectedCategory: {
            id: categoryId,
            parent: parentName,
            child: child.name,
          },
          selectedChild: child, // 선택된 단일 자식 카테고리 저장
          childrenCategories: children, // 해당 부모의 모든 자식 카테고리들 저장
        });
        return;
      }
    }
  },

  // Getter functions
  isCategorySelected: (categoryId: number) => {
    const state = get();
    return state.selectedCategory?.id === categoryId;
  },

  getCurrentCategoryName: () => {
    const state = get();
    if (state.selectedChild) {
      return state.selectedChild.name;
    }
    return state.selectedCategory?.parent || "전체";
  },

  isChildCategorySelected: () => {
    const state = get();
    return state.selectedChild !== null;
  },

  getCurrentChildrenCategories: () => {
    const state = get();
    return state.childrenCategories;
  },
}));
