"use client";

import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
} from "recharts";
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
import {
  CustomPieTooltip,
  CustomBarTooltip,
  CustomLineTooltip,
} from "./charts/ChartTooltips";

const COLORS = {
  primary: "hsl(var(--primary))",
  chart2: "hsl(var(--chart-2))",
  chart3: "hsl(var(--chart-3))",
  chart4: "hsl(var(--chart-4))",
  chart5: "hsl(var(--chart-5))",
  destructive: "hsl(var(--destructive))",
  muted: "hsl(var(--muted))",
};

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

export const TaskWidgetCharts = ({ charts = [] }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  // Get all chart data
  const completionStats = getTaskCompletionStats();
  const priorityStats = getTaskPriorityStats();
  const overdueStats = getOverdueTaskStats();
  const dueTodayStats = getTasksDueToday();
  const completedByPriority = getCompletedTasksByPriority();
  const upcomingTimeline = getUpcomingTasksTimeline();
  const highPriorityOverview = getHighPriorityOverview();

  const renderPieChart = (data) => (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          paddingAngle={5}
          dataKey="value"
          nameKey="label"
          onMouseEnter={(_, index) => setActiveIndex(index)}
          onMouseLeave={() => setActiveIndex(null)}
        >
          {data.map((entry, index) => {
            const isActive = index === activeIndex;
            return (
              <Cell
                key={`cell-${index}`}
                fill={
                  Object.values(COLORS)[index % Object.values(COLORS).length]
                }
                className="transition-all duration-300 ease-in-out"
                style={{
                  transform: isActive ? "scale(1.1)" : "scale(1)",
                  filter: isActive ? "brightness(1.1)" : "none",
                  transformOrigin: "center",
                }}
              />
            );
          })}
        </Pie>
        <Tooltip content={<CustomPieTooltip />} />
        <Legend
          verticalAlign="bottom"
          height={36}
          formatter={(value) => (
            <span className="text-sm text-muted-foreground">{value}</span>
          )}
        />
      </PieChart>
    </ResponsiveContainer>
  );

  const renderBarChart = (data, color = COLORS.primary) => (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} barSize={20}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        <XAxis
          dataKey="label"
          tick={{ fontSize: 12 }}
          className="text-muted-foreground"
        />
        <YAxis tick={{ fontSize: 12 }} className="text-muted-foreground" />
        <Tooltip content={<CustomBarTooltip />} />
        <Bar
          dataKey="value"
          fill={color}
          radius={[4, 4, 0, 0]}
          className="hover:brightness-110 transition-all duration-200"
        />
      </BarChart>
    </ResponsiveContainer>
  );

  const renderLineChart = (data) => (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        <XAxis
          dataKey="label"
          tick={{ fontSize: 12 }}
          className="text-muted-foreground"
        />
        <YAxis tick={{ fontSize: 12 }} className="text-muted-foreground" />
        <Tooltip content={<CustomLineTooltip />} />
        <Line
          type="monotone"
          dataKey="value"
          stroke={COLORS.primary}
          strokeWidth={2}
          dot={{ fill: COLORS.primary }}
          activeDot={{ r: 6, className: "animate-pulse" }}
        />
      </LineChart>
    </ResponsiveContainer>
  );

  // Default charts configuration if none provided
  const defaultCharts = [
    {
      title: "Task Completion Status",
      description: "Overview of tasks by their current status",
      type: "pie",
      data: completionStats,
      width: "1/2",
    },
    {
      title: "Task Priority Distribution",
      description: "Distribution of tasks across different priority levels",
      type: "bar",
      data: priorityStats,
      color: COLORS.chart2,
      width: "1/2",
    },
    {
      title: "Overdue Tasks",
      description: "Tasks that are past their due date",
      type: "bar",
      data: overdueStats,
      color: COLORS.destructive,
      width: "1/3",
    },
    {
      title: "Tasks Due Today",
      description: "Tasks that need to be completed today",
      type: "pie",
      data: dueTodayStats,
      width: "1/3",
    },
    {
      title: "Completed Tasks by Priority",
      description: "Analysis of completed tasks based on their priority",
      type: "bar",
      data: completedByPriority,
      color: COLORS.chart3,
      width: "1/3",
    },
    {
      title: "Upcoming Tasks Timeline",
      description: "Overview of tasks due in the next 7 days",
      type: "line",
      data: upcomingTimeline,
      width: "1/3",
    },
    {
      title: "High Priority Overview",
      description: "Status distribution of high priority tasks",
      type: "bar",
      data: highPriorityOverview,
      color: COLORS.chart4,
      width: "1/3",
    },
  ];

  const chartsToRender = charts.length > 0 ? charts : defaultCharts;

  return (
    <div className="flex flex-wrap -mx-3">
      {chartsToRender.map((chart, index) => (
        <div key={index} className={`${getChartWidth(chart.width)} px-3 mb-6`}>
          <TaskChartCard title={chart.title} description={chart.description}>
            {chart.type === "pie" && renderPieChart(chart.data)}
            {chart.type === "bar" &&
              renderBarChart(chart.data, chart.color || COLORS.primary)}
            {chart.type === "line" && renderLineChart(chart.data)}
          </TaskChartCard>
        </div>
      ))}
    </div>
  );
};
