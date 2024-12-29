"use client";

const widthClasses = {
  "1/4": "w-full lg:w-1/4 px-3",
  "1/3": "w-full md:w-1/3 px-3",
  "1/2": "w-full md:w-1/2 px-3",
  "2/3": "w-full md:w-2/3 px-3",
  "3/4": "w-full md:w-3/4 px-3",
  full: "w-full px-3",
};

export const getWidgetWidth = (width) => {
  return widthClasses[width] || widthClasses["full"];
};
