// src/stores/categoryStore.ts
import { CATEGORIES } from "@/lib/utils/categories.util";
import { create } from "zustand";

type TCategoryState = {
  selectedCategory: {
    id: number;
    parent: string;
    child: string;
  } | null;

  setSelectedCategory: (category: { id: number; parent: string; child: string } | null) => void;
  clearSelectedCategory: () => void;
  findCategoryPath: (categoryId: number) => void;
};

export const useCategoryStore = create<TCategoryState>((set, get) => ({
  selectedCategory: null,

  setSelectedCategory: (category) => set({ selectedCategory: category }),

  clearSelectedCategory: () => set({ selectedCategory: null }),

  findCategoryPath: (categoryId: number) => {
    const categories = CATEGORIES;

    // 먼저 부모 카테고리에서 찾기
    const parentCategory = categories.parentCategory.find((cat) => cat.id === categoryId);
    if (parentCategory) {
      set({
        selectedCategory: {
          id: categoryId,
          parent: parentCategory.name,
          child: "", // 부모 카테고리만 선택된 경우 child는 빈 문자열
        },
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
        });
        return;
      }
    }
  },
}));
