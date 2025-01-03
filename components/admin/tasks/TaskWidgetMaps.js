"use client";

import { useState } from "react";
import { TaskMapCard } from "./maps/TaskMapCard";
import { TaskMap } from "./maps/TaskMap";
import {
  getTasksByLocation,
  getTaskHeatmapData,
  getTaskClusterData,
  getTaskRouteData,
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
  const heatmapData = getTaskHeatmapData();
  const clusterData = getTaskClusterData();
  const routeData = getTaskRouteData();

  // Default maps configuration if none provided
  const defaultMaps = [
    {
      title: "Task Locations",
      description: "Overview of all task locations with markers",
      data: allTasks,
      type: "markers",
      width: "1/2",
    },
    {
      title: "Task Density Heatmap",
      description: "Visualize areas with high concentration of tasks",
      data: heatmapData,
      type: "heatmap",
      width: "1/2",
    },
    {
      title: "Task Clusters",
      description: "Grouped tasks by proximity with cluster markers",
      data: clusterData,
      type: "clusters",
      width: "1/2",
    },
    {
      title: "Service Routes",
      description: "Optimized routes for service tasks",
      data: routeData,
      type: "routes",
      width: "1/2",
    },
  ];

  const mapsToRender = maps.length > 0 ? maps : defaultMaps;

  return (
    <div className="flex flex-wrap -mx-3">
      {mapsToRender.map((map, index) => (
        <div key={index} className={`${getChartWidth(map.width)} px-3 mb-6`}>
          <TaskMapCard title={map.title} description={map.description}>
            <TaskMap
              tasks={map.data}
              type={map.type}
              onMarkerClick={setSelectedTask}
            />
          </TaskMapCard>
        </div>
      ))}
    </div>
  );
};
