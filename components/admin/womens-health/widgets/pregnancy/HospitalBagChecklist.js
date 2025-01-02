"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { generatePregnancyData } from "./mockData";
import { WIDGET_STYLES } from "@/lib/constants/widget-styles";

export const HospitalBagChecklist = ({ title, description }) => {
  const data = generatePregnancyData();
  const { hospital_bag } = data;

  const getProgress = (items) => {
    const packed = items.filter((item) => item.packed).length;
    return Math.round((packed / items.length) * 100);
  };

  return (
    <Card className="h-full flex flex-col shadow-lg">
      <div className="p-6 flex-none border-b">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold">{title}</h3>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      </div>
      <div
        className="flex-1 p-4 overflow-y-auto"
        style={{
          minHeight: WIDGET_STYLES.MIN_HEIGHT,
          maxHeight: WIDGET_STYLES.MAX_HEIGHT,
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* For Mother */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">For Mother</h4>
              <Badge
                variant="outline"
                className="px-2 bg-primary/10 text-primary border-primary/20"
              >
                {getProgress(hospital_bag.for_mother)}%
              </Badge>
            </div>
            <div className="space-y-2">
              {hospital_bag.for_mother.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 p-2 rounded-lg border hover:bg-accent/50 transition-colors"
                >
                  <Checkbox
                    id={`mother-${index}`}
                    checked={item.packed}
                    className="h-4 w-4"
                  />
                  <label
                    htmlFor={`mother-${index}`}
                    className="text-sm cursor-pointer flex-1"
                  >
                    {item.item}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* For Baby */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">For Baby</h4>
              <Badge
                variant="outline"
                className="px-2 bg-chart-2/10 text-chart-2 border-chart-2/20"
              >
                {getProgress(hospital_bag.for_baby)}%
              </Badge>
            </div>
            <div className="space-y-2">
              {hospital_bag.for_baby.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 p-2 rounded-lg border hover:bg-accent/50 transition-colors"
                >
                  <Checkbox
                    id={`baby-${index}`}
                    checked={item.packed}
                    className="h-4 w-4"
                  />
                  <label
                    htmlFor={`baby-${index}`}
                    className="text-sm cursor-pointer flex-1"
                  >
                    {item.item}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Documents */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Documents</h4>
              <Badge
                variant="outline"
                className="px-2 bg-chart-3/10 text-chart-3 border-chart-3/20"
              >
                {getProgress(hospital_bag.documents)}%
              </Badge>
            </div>
            <div className="space-y-2">
              {hospital_bag.documents.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 p-2 rounded-lg border hover:bg-accent/50 transition-colors"
                >
                  <Checkbox
                    id={`doc-${index}`}
                    checked={item.packed}
                    className="h-4 w-4"
                  />
                  <label
                    htmlFor={`doc-${index}`}
                    className="text-sm cursor-pointer flex-1"
                  >
                    {item.item}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
