'use client';

import { Calendar as CalendarIcon, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const CalendarWidget = () => {
  const events = [
    { id: 1, time: '09:00', title: 'Team Standup' },
    { id: 2, time: '11:30', title: 'Client Meeting' },
    { id: 3, time: '14:00', title: 'Project Review' },
  ];

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div className="space-y-1">
          <CardTitle className="text-xl font-semibold">Calendar</CardTitle>
          <p className="text-sm text-muted-foreground">Your schedule for today</p>
        </div>
        <CalendarIcon className="h-5 w-5 text-primary" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {events.map(event => (
            <div key={event.id} className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 min-w-[80px] text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span className="text-sm">{event.time}</span>
              </div>
              <div className="flex-1 bg-secondary/50 p-2 rounded-md">
                <p className="text-sm font-medium">{event.title}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};