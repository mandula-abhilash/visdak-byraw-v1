"use client";

import { TaskChartCard } from "./charts/TaskChartCard";
import {
  getTaskCompletionStats,
  getTaskPriorityStats,
  getOverdueTaskStats,
  getTasksDueToday,
  getCompletedTasksByPriority,
  getUpcomingTasksTimeline,
  getHighPriorityOverview,
} from "./charts/TaskChartUtils";

export const TaskWidgetCharts = () => {
  // Get all chart data
  const completionStats = getTaskCompletionStats();
  const priorityStats = getTaskPriorityStats();
  const overdueStats = getOverdueTaskStats();
  const dueTodayStats = getTasksDueToday();
  const completedByPriority = getCompletedTasksByPriority();
  const upcomingTimeline = getUpcomingTasksTimeline();
  const highPriorityOverview = getHighPriorityOverview();

  const renderBarChart = (data, color = "bg-primary") => (
    <div className="flex flex-col justify-end h-full space-y-2">
      <div className="flex items-end justify-around h-[calc(100%-2rem)] gap-2">
        {data.map(({ label, value }, index) => (
          <div key={index} className="flex flex-col items-center flex-1">
            <div className="w-full">
              <div
                className={`w-full ${color} rounded-t-sm transition-all duration-300`}
                style={{
                  height: `${
                    (value / Math.max(...data.map((d) => d.value))) * 100
                  }%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-around text-xs text-muted-foreground">
        {data.map(({ label }, index) => (
          <div key={index} className="text-center truncate">
            {label}
          </div>
        ))}
      </div>
    </div>
  );

  const renderPieChart = (data) => (
    <div className="relative h-full flex items-center justify-center">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {data
          .reduce((elements, { label, value }, index, array) => {
            const total = array.reduce((sum, item) => sum + item.value, 0);
            const startAngle = elements.length
              ? elements[elements.length - 1].endAngle
              : 0;
            const percentage = value / total;
            const endAngle = startAngle + percentage * 360;

            const start = polarToCartesian(50, 50, 40, startAngle);
            const end = polarToCartesian(50, 50, 40, endAngle);

            const largeArcFlag = percentage > 0.5 ? 1 : 0;

            elements.push({
              element: (
                <path
                  key={label}
                  d={`M 50 50 L ${start.x} ${start.y} A 40 40 0 ${largeArcFlag} 1 ${end.x} ${end.y} Z`}
                  className={`hover:opacity-90 transition-opacity ${
                    index === 0
                      ? "fill-primary"
                      : index === 1
                      ? "fill-chart-2"
                      : index === 2
                      ? "fill-chart-3"
                      : "fill-chart-4"
                  }`}
                />
              ),
              endAngle,
            });

            return elements;
          }, [])
          .map(({ element }) => element)}
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-xs">
        {data.reduce((sum, { value }) => sum + value, 0)} Total
      </div>
    </div>
  );

  const renderHorizontalBarChart = (data, color = "bg-primary") => (
    <div className="h-full flex flex-col justify-between space-y-2">
      {data.map(({ label, value }, index) => (
        <div key={index} className="flex items-center gap-2">
          <div className="text-xs text-muted-foreground w-20 truncate">
            {label}
          </div>
          <div className="flex-1 h-4 bg-muted rounded-full overflow-hidden">
            <div
              className={`h-full ${color} transition-all duration-300`}
              style={{
                width: `${
                  (value / Math.max(...data.map((d) => d.value))) * 100
                }%`,
              }}
            />
          </div>
          <div className="text-xs w-8 text-right">{value}</div>
        </div>
      ))}
    </div>
  );

  const renderLineChart = (data) => (
    <div className="h-full flex flex-col justify-end">
      <svg
        viewBox="0 0 100 60"
        className="w-full h-full"
        preserveAspectRatio="none"
      >
        <polyline
          points={data
            .map(({ value }, index) => {
              const x = (index / (data.length - 1)) * 100;
              const y =
                60 - (value / Math.max(...data.map((d) => d.value))) * 50;
              return `${x},${y}`;
            })
            .join(" ")}
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="2"
        />
      </svg>
      <div className="flex justify-between text-xs text-muted-foreground mt-2">
        {data.map(({ label }, index) => (
          <div key={index}>{label}</div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <TaskChartCard title="Task Completion Status">
        {renderPieChart(completionStats)}
      </TaskChartCard>

      <TaskChartCard title="Task Priority Distribution">
        {renderBarChart(priorityStats, "bg-chart-2")}
      </TaskChartCard>

      <TaskChartCard title="Overdue Tasks by Days Late">
        {renderHorizontalBarChart(overdueStats, "bg-destructive")}
      </TaskChartCard>

      <TaskChartCard title="Tasks Due Today by Priority">
        {renderPieChart(dueTodayStats)}
      </TaskChartCard>

      <TaskChartCard title="Completed Tasks by Priority">
        {renderBarChart(completedByPriority, "bg-chart-3")}
      </TaskChartCard>

      <TaskChartCard title="Upcoming Tasks by Due Date">
        {renderLineChart(upcomingTimeline)}
      </TaskChartCard>

      <TaskChartCard title="High-Priority Tasks Overview">
        {renderBarChart(highPriorityOverview, "bg-chart-4")}
      </TaskChartCard>
    </div>
  );
};

// Helper function for pie chart
const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
};
