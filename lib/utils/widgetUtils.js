"use client";

const widthClasses = {
  "1/4": "w-1/4",
  "1/3": "w-1/3",
  "1/2": "w-1/2",
  "2/3": "w-2/3",
  "3/4": "w-3/4",
  full: "w-full",
};

export const getWidgetWidth = (width) => {
  return widthClasses[width] || widthClasses["full"];
};
