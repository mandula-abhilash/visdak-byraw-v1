'use client';

import { BarChart, TrendingUp, TrendingDown, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const AnalyticsWidget = () => {
  const stats = [
    { id: 1, title: 'Tasks Completed', value: '24', trend: 'up', change: '+12%' },
    { id: 2, title: 'Notes Created', value: '8', trend: 'down', change: '-3%' },
    { id: 3, title: 'Active Projects', value: '5', trend: 'up', change: '+2%' },
  ];

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div className="space-y-1">
          <CardTitle className="text-xl font-semibold">Analytics</CardTitle>
          <p className="text-sm text-muted-foreground">Your activity overview</p>
        </div>
        <BarChart className="h-5 w-5 text-primary" />
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
          {stats.map(stat => (
            <div key={stat.id} className="bg-secondary/50 p-3 rounded-lg space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{stat.title}</span>
                {stat.trend === 'up' ? (
                  <TrendingUp className="h-4 w-4 text-green-500" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-500" />
                )}
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-bold">{stat.value}</span>
                <span className={`text-sm ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                  {stat.change}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};