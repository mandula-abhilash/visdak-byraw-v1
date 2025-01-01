"use client";

import { Circle, Square, Triangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export const DrawingTools = ({
  mode,
  onModeChange,
  onShapeComplete,
  onClear,
}) => {
  return (
    <div className="absolute top-4 left-4 bg-background/95 backdrop-blur-sm border rounded-lg shadow-lg p-2">
      <div className="flex flex-col gap-2">
        <Button
          variant={mode === "polygon" ? "secondary" : "ghost"}
          size="sm"
          className="justify-start"
          onClick={() => onModeChange("polygon")}
        >
          <Triangle className="h-4 w-4 mr-2" />
          Polygon
        </Button>
        <Button
          variant={mode === "circle" ? "secondary" : "ghost"}
          size="sm"
          className="justify-start"
          onClick={() => onModeChange("circle")}
        >
          <Circle className="h-4 w-4 mr-2" />
          Circle
        </Button>
        <Button
          variant={mode === "rectangle" ? "secondary" : "ghost"}
          size="sm"
          className="justify-start"
          onClick={() => onModeChange("rectangle")}
        >
          <Square className="h-4 w-4 mr-2" />
          Rectangle
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="justify-start"
          onClick={onClear}
        >
          Clear
        </Button>
      </div>
    </div>
  );
};
