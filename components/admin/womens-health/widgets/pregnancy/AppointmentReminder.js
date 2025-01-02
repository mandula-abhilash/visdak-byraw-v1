"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { generatePregnancyData } from "./mockData";
import { WIDGET_STYLES } from "@/lib/constants/widget-styles";

export const AppointmentReminder = ({ title, description }) => {
  const data = generatePregnancyData();

  const getStatusColor = (date) => {
    const appointmentDate = new Date(date);
    const today = new Date();
    const diffDays = Math.ceil(
      (appointmentDate - today) / (1000 * 60 * 60 * 24)
    );

    if (diffDays < 0)
      return "bg-destructive/10 text-destructive border-destructive/20";
    if (diffDays <= 3) return "bg-chart-5/10 text-chart-5 border-chart-5/20";
    return "bg-primary/10 text-primary border-primary/20";
  };

  // Format time in a consistent way for both server and client
  const formatTime = (date) => {
    const d = new Date(date);
    const hours = d.getHours();
    const minutes = d.getMinutes();
    const ampm = hours >= 12 ? "pm" : "am";
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes.toString().padStart(2, "0");
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  };

  return (
    <Card className="h-full flex flex-col shadow-lg">
      <div className="p-6 flex-none border-b">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold">{title}</h3>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      </div>
      <div
        className="flex-1 p-4 overflow-y-auto"
        style={{
          minHeight: WIDGET_STYLES.MIN_HEIGHT,
          maxHeight: WIDGET_STYLES.MAX_HEIGHT,
        }}
      >
        <div className="space-y-4">
          {data.appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="p-4 border rounded-lg hover:bg-accent/50 transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="font-medium">{appointment.title}</div>
                  <div className="text-sm text-muted-foreground">
                    {new Date(appointment.date).toLocaleDateString()} at{" "}
                    {formatTime(appointment.date)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    👨‍⚕️ {appointment.doctor}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    📍 {appointment.location}
                  </div>
                  {appointment.notes && (
                    <div className="text-sm text-muted-foreground mt-2">
                      📝 {appointment.notes}
                    </div>
                  )}
                </div>
                <Badge
                  variant="outline"
                  className={`px-2 whitespace-nowrap ${getStatusColor(
                    appointment.date
                  )}`}
                >
                  {appointment.type}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};
