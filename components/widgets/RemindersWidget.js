'use client';

import { Bell, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const RemindersWidget = () => {
  const reminders = [
    { id: 1, title: 'Submit Report', date: 'Tomorrow, 5 PM' },
    { id: 2, title: 'Team Review', date: 'Friday, 2 PM' },
    { id: 3, title: 'Project Deadline', date: 'Next Week' },
  ];

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div className="space-y-1">
          <CardTitle className="text-xl font-semibold">Reminders</CardTitle>
          <p className="text-sm text-muted-foreground">Don't forget these</p>
        </div>
        <Bell className="h-5 w-5 text-primary" />
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {reminders.map(reminder => (
            <div key={reminder.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-secondary/50 transition-colors">
              <span className="font-medium">{reminder.title}</span>
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="h-4 w-4 mr-2" />
                {reminder.date}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};