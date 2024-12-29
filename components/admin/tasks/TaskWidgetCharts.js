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

const COLORS = {
  primary: "hsl(var(--primary))",
  chart2: "hsl(var(--chart-2))",
  chart3: "hsl(var(--chart-3))",
  chart4: "hsl(var(--chart-4))",
  chart5: "hsl(var(--chart-5))",
  destructive: "hsl(var(--destructive))",
  muted: "hsl(var(--muted))",
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-popover/95 backdrop-blur supports-[backdrop-filter]:bg-popover/85 p-2 rounded-lg border shadow-lg">
        <p className="text-sm font-medium">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm text-muted-foreground">
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const CustomPieTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background/95 backdrop-blur-sm border rounded-lg shadow-lg p-3">
        <p className="text-sm font-medium">{payload[0].name}</p>
        <p className="text-sm text-muted-foreground">
          Count: {payload[0].value}
        </p>
      </div>
    );
  }
  return null;
};

export const TaskWidgetCharts = () => {
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
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted/30" />
        <XAxis
          dataKey="label"
          tick={{ fontSize: 12 }}
          className="text-muted-foreground"
        />
        <YAxis tick={{ fontSize: 12 }} className="text-muted-foreground" />
        <Tooltip
          content={<CustomTooltip />}
          cursor={{ fill: "var(--muted)", opacity: 0.1 }}
        />
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
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted/30" />
        <XAxis
          dataKey="label"
          tick={{ fontSize: 12 }}
          className="text-muted-foreground"
        />
        <YAxis tick={{ fontSize: 12 }} className="text-muted-foreground" />
        <Tooltip
          content={<CustomTooltip />}
          cursor={{ stroke: "var(--muted)", strokeWidth: 1 }}
        />
        <Line
          type="monotone"
          dataKey="value"
          stroke={COLORS.primary}
          strokeWidth={2}
          dot={{ fill: COLORS.primary, r: 4 }}
          activeDot={{
            fill: COLORS.primary,
            stroke: "var(--background)",
            r: 6,
            strokeWidth: 2,
          }}
        />
      </LineChart>
    </ResponsiveContainer>
  );

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <TaskChartCard
        title="Task Completion Status"
        description="Overview of tasks by their current status"
      >
        {renderPieChart(completionStats)}
      </TaskChartCard>

      <TaskChartCard
        title="Task Priority Distribution"
        description="Distribution of tasks across different priority levels"
      >
        {renderBarChart(priorityStats, COLORS.chart2)}
      </TaskChartCard>

      <TaskChartCard
        title="Overdue Tasks by Days Late"
        description="Tasks that are past their due date, sorted by days overdue"
      >
        {renderBarChart(overdueStats, COLORS.destructive)}
      </TaskChartCard>

      <TaskChartCard
        title="Tasks Due Today by Priority"
        description="Tasks that need attention today, grouped by priority"
      >
        {renderPieChart(dueTodayStats)}
      </TaskChartCard>

      <TaskChartCard
        title="Completed Tasks by Priority"
        description="Analysis of completed tasks across priority levels"
      >
        {renderBarChart(completedByPriority, COLORS.chart3)}
      </TaskChartCard>

      <TaskChartCard
        title="Upcoming Tasks Timeline"
        description="Task distribution over the next 7 days"
      >
        {renderLineChart(upcomingTimeline)}
      </TaskChartCard>

      <TaskChartCard
        title="High-Priority Tasks Overview"
        description="Status breakdown of high-priority tasks"
      >
        {renderBarChart(highPriorityOverview, COLORS.chart4)}
      </TaskChartCard>
    </div>
  );
};
