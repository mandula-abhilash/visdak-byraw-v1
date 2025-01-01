"use client";

import { NotesWidget } from "@/components/widgets";
import { NOTE_TYPES } from "@/components/widgets/NotesWidget/forms/NoteTypes";

const widthClasses = {
  "1/4": "w-full md:w-1/4 px-3",
  "1/3": "w-full md:w-1/3 px-3",
  "1/2": "w-full md:w-1/2 px-3",
  "2/3": "w-full md:w-2/3 px-3",
  "3/4": "w-full md:w-3/4 px-3",
  full: "w-full px-3",
};

const getWidgetWidth = (width) => {
  return widthClasses[width] || widthClasses["full"];
};

export const NotesWidgetVariants = () => {
  const widgets = [
    {
      title: "Basic Notes",
      view: "list",
      showCount: true,
      showLabels: true,
      showDates: true,
      width: "2/3",
      noteType: NOTE_TYPES.BASIC.id,
    },
    {
      title: "Event Notes",
      view: "grid",
      showCount: true,
      showLabels: true,
      showDates: true,
      width: "2/3",
      noteType: NOTE_TYPES.EVENT.id,
    },
    {
      title: "Task Notes",
      view: "list",
      showCount: true,
      showLabels: true,
      showDates: true,
      width: "2/3",
      noteType: NOTE_TYPES.TASK.id,
    },
    {
      title: "Location Notes",
      view: "grid",
      showCount: true,
      showLabels: true,
      showDates: true,
      width: "2/3",
      noteType: NOTE_TYPES.LOCATION.id,
    },
  ];

  return (
    <div className="flex flex-wrap -mx-3">
      {widgets.map((widget, index) => (
        <div key={index} className={`${getWidgetWidth(widget.width)} mb-6`}>
          <div className="h-full">
            <NotesWidget {...widget} />
          </div>
        </div>
      ))}
    </div>
  );
};
