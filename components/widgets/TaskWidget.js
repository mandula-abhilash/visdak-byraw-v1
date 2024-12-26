'use client';

import { useState } from 'react';
import { CheckSquare, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const TaskWidget = () => {
  const [tasks] = useState([
    { id: 1, title: 'Review project proposal', completed: false },
    { id: 2, title: 'Team meeting at 2 PM', completed: true },
    { id: 3, title: 'Update documentation', completed: false },
  ]);

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div className="space-y-1">
          <CardTitle className="text-xl font-semibold">Tasks</CardTitle>
          <p className="text-sm text-muted-foreground">Manage your daily tasks</p>
        </div>
        <CheckSquare className="h-5 w-5 text-primary" />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {tasks.map(task => (
            <div key={task.id} className="flex items-center space-x-3">
              <div className={`w-2 h-2 rounded-full ${task.completed ? 'bg-green-500' : 'bg-orange-500'}`} />
              <span className={task.completed ? 'line-through text-muted-foreground' : ''}>{task.title}</span>
            </div>
          ))}
        </div>
        <Button variant="outline" className="w-full group">
          <Plus className="h-4 w-4 mr-2 group-hover:rotate-90 transition-transform" />
          Add Task
        </Button>
      </CardContent>
    </Card>
  );
};