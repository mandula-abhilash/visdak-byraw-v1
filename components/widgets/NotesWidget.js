'use client';

import { StickyNote, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const NotesWidget = () => {
  const notes = [
    { id: 1, title: 'Project Ideas', preview: 'New features for Q2...' },
    { id: 2, title: 'Meeting Notes', preview: 'Discussion points from...' },
  ];

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div className="space-y-1">
          <CardTitle className="text-xl font-semibold">Notes</CardTitle>
          <p className="text-sm text-muted-foreground">Quick access to your notes</p>
        </div>
        <StickyNote className="h-5 w-5 text-primary" />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {notes.map(note => (
            <div key={note.id} className="bg-secondary/50 p-3 rounded-lg space-y-1">
              <h3 className="font-medium">{note.title}</h3>
              <p className="text-sm text-muted-foreground">{note.preview}</p>
            </div>
          ))}
        </div>
        <Button variant="outline" className="w-full group">
          <Plus className="h-4 w-4 mr-2 group-hover:rotate-90 transition-transform" />
          New Note
        </Button>
      </CardContent>
    </Card>
  );
};