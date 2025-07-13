"use client";

import { useState } from "react";
import ArrowIcon from "../../assets/icons/ArrowIcon";
import { TCategoryItem, TSubCategoryMenuProps } from "../../types/subCategoryMenu.types";

const SubCategoryMenu = ({ 
  categories, 
  currentPath, 
  onItemClick, 
  className = ""
}: TSubCategoryMenuProps) => {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [selectedParentId, setSelectedParentId] = useState<number | null>(null);
  const [selectedChildId, setSelectedChildId] = useState<number | null>(null);

  const isCurrentPage = (item: TCategoryItem) => {
    if (!currentPath || !item.href) return false;
    return currentPath === item.href;
  };

  const toggleCategory = (categoryId: number) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId.toString())) {
      newExpanded.delete(categoryId.toString());
    } else {
      newExpanded.add(categoryId.toString());
    }
    setExpandedCategories(newExpanded);
  };

  const handleItemClick = (item: TCategoryItem) => {
    if (item.children && item.children.length > 0) {
      // 상위 카테고리 클릭 시
      toggleCategory(item.id);
      setSelectedParentId(item.id);
      setSelectedChildId(null); // 하위 카테고리 선택 해제
    } else if (item.href) {
      // 하위 카테고리 클릭 시
      setSelectedChildId(item.id);
      onItemClick?.(item);
    }
  };

  const renderMenuItem = (item: TCategoryItem, level: number = 0) => {
    const isActive = isCurrentPage(item);
    const hasSubItems = item.children && item.children.length > 0;
    const isExpanded = expandedCategories.has(item.id.toString());
    const isClickable = item.href || hasSubItems;
    
    // 선택 상태 확인
    const isParentSelected = selectedParentId === item.id;
    const isChildSelected = selectedChildId === item.id;

    return (
      <div key={item.id} className="w-full">
        <div
          className={`w-full h-[50px] px-[14px] py-[15px] inline-flex justify-between items-center cursor-pointer hover:bg-gray-50 transition-colors group relative ${
            level > 0 ? 'px-[30px] py-[15px]' : ''
          } ${!isClickable ? 'cursor-default' : ''} ${
            isActive ? 'bg-blue-50 border-r-2 border-blue-500' : ''
          }`}
          onClick={() => isClickable && handleItemClick(item)}
        >
          {/* 상위 카테고리 선택 시 가로 검은 줄 */}
          {isParentSelected && level === 0 && (
            <div className="absolute top-0 left-0 w-full h-0.5 bg-gray-950"></div>
          )}
          
          <div className="flex items-center gap-2">
            {item.icon && <span className="w-4 h-4">{item.icon}</span>}
            <div
              className={`justify-start text-[16px] font-['SUIT'] transition-all duration-200 ${
                isActive
                  ? "text-blue-600 font-bold"
                  : isChildSelected
                    ? "text-gray-950 font-bold" // 하위 카테고리 선택 시 gray-950 + 볼드
                    : isParentSelected
                      ? "text-gray-950 font-bold" // 상위 카테고리 선택 시 볼드
                      : level === 0
                        ? "text-gray-950 font-normal group-hover:text-gray-900"
                        : "text-gray-500 font-normal group-hover:text-gray-700 group-hover:font-medium"
              }`}
            >
              {item.name}
            </div>
          </div>
          
          {hasSubItems && (
            <ArrowIcon 
              direction={isExpanded ? "down" : "up"} 
              className="w-3 h-3 text-gray-300 transition-transform duration-200"
            />
          )}
        </div>
        
        {hasSubItems && isExpanded && (
          <div className="w-full bg-gray-25 flex flex-col gap-1 mt-1">
            {item.children!.map((subItem: TCategoryItem) => renderMenuItem(subItem, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div 
      className={`bg-white flex flex-col ${className}`}
      style={{ width: "180px" }}
    >
      <div className="px-[14px] py-[10px] h-[42px] flex items-center mb-[10px]">
        <h2 className="text-[18px] font-bold font-['SUIT'] text-gray-900">카테고리</h2>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        <div className="w-full flex flex-col justify-start items-center gap-1">
          {categories.map((category) => renderMenuItem(category))}
        </div>
      </div>
    </div>
  );
};

export default SubCategoryMenu; 