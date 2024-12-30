"use client";

import { useState } from "react";
import { TaskMapCard } from "./maps/TaskMapCard";
import { TaskMap } from "./maps/TaskMap";
import {
  getTasksByLocation,
  getTasksByPriority,
  getTasksByStatus,
  getOverdueTasks,
  getTodaysTasks,
} from "./maps/TaskMapUtils";

const widthClasses = {
  "1/4": "w-full md:w-1/4",
  "1/3": "w-full md:w-1/3",
  "1/2": "w-full md:w-1/2",
  "2/3": "w-full md:w-2/3",
  "3/4": "w-full md:w-3/4",
  full: "w-full",
};

const getChartWidth = (width) => {
  return widthClasses[width] || widthClasses["1/2"];
};

export const TaskWidgetMaps = ({ maps = [] }) => {
  const [selectedTask, setSelectedTask] = useState(null);

  // Get all map data
  const allTasks = getTasksByLocation();
  const highPriorityTasks = getTasksByPriority();
  const pendingTasks = getTasksByStatus("pending");
  const overdueTasks = getOverdueTasks();
  const todaysTasks = getTodaysTasks();

  // Default maps configuration if none provided
  const defaultMaps = [
    {
      title: "All Tasks",
      description: "Overview of all task locations",
      data: allTasks,
      width: "1/2",
    },
    {
      title: "High Priority Tasks",
      description: "Map of high priority tasks that need immediate attention",
      data: highPriorityTasks,
      width: "1/2",
    },
    {
      title: "Pending Tasks",
      description: "Tasks that are yet to be started",
      data: pendingTasks,
      width: "1/3",
    },
    {
      title: "Overdue Tasks",
      description: "Tasks that are past their due date",
      data: overdueTasks,
      width: "1/3",
    },
    {
      title: "Today's Tasks",
      description: "Tasks scheduled for today",
      data: todaysTasks,
      width: "1/3",
    },
  ];

  const mapsToRender = maps.length > 0 ? maps : defaultMaps;

  return (
    <div className="flex flex-wrap -mx-3">
      {mapsToRender.map((map, index) => (
        <div key={index} className={`${getChartWidth(map.width)} px-3 mb-6`}>
          <TaskMapCard title={map.title} description={map.description}>
            <TaskMap tasks={map.data} onMarkerClick={setSelectedTask} />
          </TaskMapCard>
        </div>
      ))}
    </div>
  );
};
