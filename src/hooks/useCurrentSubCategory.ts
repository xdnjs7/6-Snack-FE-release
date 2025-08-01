import { create } from "zustand";
import { CATEGORIES } from "@/lib/constants/categories";

type TCurrentSubCategory = {
  id: number;
  parent: string;
  child: string;
} | null;

type TCurrentSubCategoryState = {
  selectedCategory: TCurrentSubCategory;
  findCategoryPath: (categoryId: number) => void;
  clearSelectedCategory: () => void;
};

export const useCurrentSubCategory = create<TCurrentSubCategoryState>((set) => ({
  selectedCategory: null,

  findCategoryPath: (categoryId) => {
    let foundParent: string | null = null;
    let foundChild: string | null = null;

    for (const parent of CATEGORIES.parentCategory) {
      const children = CATEGORIES.childrenCategory[parent.name as keyof typeof CATEGORIES.childrenCategory];
      const match = children.find((child) => child.id === categoryId);
      if (match) {
        foundParent = parent.name;
        foundChild = match.name;
        break;
      }
    }

    if (foundParent && foundChild) {
      set({
        selectedCategory: {
          id: categoryId,
          parent: foundParent,
          child: foundChild,
        },
      });
    }
  },

  clearSelectedCategory: () => set({ selectedCategory: null }),
}));
