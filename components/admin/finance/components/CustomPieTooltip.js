"use client";

export const CustomPieTooltip = ({ active, payload, formatter }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background/95 backdrop-blur-sm border rounded-lg shadow-lg p-4">
        <div className="flex items-center gap-2 text-sm">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: payload[0].payload.fill }}
          />
          <span className="text-muted-foreground">{payload[0].name}:</span>
          <span className="font-medium">
            {formatter ? formatter(payload[0].value) : payload[0].value}
          </span>
        </div>
      </div>
    );
  }
  return null;
};
