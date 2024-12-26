'use client';

import { useState } from 'react';
import { DEFAULT_WIDGETS_CONFIG } from '@/lib/constants';
import { getGridContainerClasses, getResponsiveClasses } from '@/lib/grid';
import { TaskWidget } from '@/components/widgets/TaskWidget';
import { CalendarWidget } from '@/components/widgets/CalendarWidget';
import { NotesWidget } from '@/components/widgets/NotesWidget';
import { RemindersWidget } from '@/components/widgets/RemindersWidget';
import { AnalyticsWidget } from '@/components/widgets/AnalyticsWidget';

const widgetComponents = {
  TaskWidget,
  CalendarWidget,
  NotesWidget,
  RemindersWidget,
  AnalyticsWidget,
};

export const WidgetGrid = () => {
  const [widgets] = useState(DEFAULT_WIDGETS_CONFIG);
  const sortedWidgets = [...widgets].sort((a, b) => a.position - b.position);

  return (
    <div className={getGridContainerClasses()}>
      {sortedWidgets.map((widget) => {
        const WidgetComponent = widgetComponents[widget.component];
        if (!WidgetComponent) return null;

        return (
          <div key={widget.id} className={getResponsiveClasses(widget.size)}>
            <WidgetComponent />
          </div>
        );
      })}
    </div>
  );
};