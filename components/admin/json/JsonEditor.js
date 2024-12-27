"use client";

import { Textarea } from "@/components/ui/textarea";

export const JsonEditor = ({ value, onChange, placeholder }) => {
  const handleChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <Textarea
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      className="font-mono text-sm h-[300px] resize-none"
      spellCheck={false}
    />
  );
};
