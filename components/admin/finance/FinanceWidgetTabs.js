"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Import all tab components
import { IncomeManagement } from "./tabs/IncomeManagement";
import { ExpenseManagement } from "./tabs/ExpenseManagement";
import { Budgeting } from "./tabs/Budgeting";
import { FinancialGoal } from "./tabs/FinancialGoal";
import { Investment } from "./tabs/Investment";
import { DebtManagement } from "./tabs/DebtManagement";
import { IncomeExpense } from "./tabs/IncomeExpense";
import { TaxManagement } from "./tabs/TaxManagement";
import { InterestSavings } from "./tabs/InterestSavings";
import { FinancialPlanning } from "./tabs/FinancialPlanning";
import { AlertsReminders } from "./tabs/AlertsReminders";
import { Analytics } from "./tabs/Analytics";
import { Advanced } from "./tabs/Advanced";

export const FinanceWidgetTabs = () => {
  const [activeTab, setActiveTab] = useState("income");

  const tabs = [
    { id: "income", label: "Income Management" },
    { id: "expense", label: "Expense Management" },
    { id: "budgeting", label: "Budgeting" },
    { id: "goals", label: "Financial Goals" },
    { id: "investment", label: "Investment" },
    { id: "debt", label: "Debt Management" },
    { id: "income-expense", label: "Income-Expense" },
    { id: "tax", label: "Tax Management" },
    { id: "interest", label: "Interest & Savings" },
    { id: "planning", label: "Financial Planning" },
    { id: "alerts", label: "Alerts & Reminders" },
    { id: "analytics", label: "Analytics" },
    { id: "advanced", label: "Advanced" },
  ];

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
      {/* Mobile Dropdown */}
      <div className="block md:hidden w-full relative">
        <Select value={activeTab} onValueChange={setActiveTab}>
          <SelectTrigger className="w-full py-2">
            <SelectValue>
              {tabs.find((tab) => tab.id === activeTab)?.label}
            </SelectValue>
          </SelectTrigger>
          <SelectContent
            className="bg-secondary/50 backdrop-blur-md w-[var(--radix-select-trigger-width)] absolute left-0 cursor-pointer"
            position="popper"
            sideOffset={4}
          >
            {tabs.map((tab) => (
              <SelectItem
                key={tab.id}
                value={tab.id}
                className="py-2 focus:bg-primary/10"
              >
                {tab.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Desktop Tabs */}
      <div className="hidden md:block relative">
        <div className="overflow-x-auto pb-2 finance-tabs">
          <TabsList className="bg-transparent justify-start p-1 gap-2 inline-flex min-w-full">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className="rounded-md px-6 py-2 bg-muted/100 hover:bg-muted/70 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-colors whitespace-nowrap"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
      </div>

      {/* Tab Content */}
      <TabsContent value="income" className="space-y-4 mt-4">
        <IncomeManagement />
      </TabsContent>
      <TabsContent value="expense" className="space-y-4 mt-4">
        <ExpenseManagement />
      </TabsContent>
      <TabsContent value="budgeting" className="space-y-4 mt-4">
        <Budgeting />
      </TabsContent>
      <TabsContent value="goals" className="space-y-4 mt-4">
        <FinancialGoal />
      </TabsContent>
      <TabsContent value="investment" className="space-y-4 mt-4">
        <Investment />
      </TabsContent>
      <TabsContent value="debt" className="space-y-4 mt-4">
        <DebtManagement />
      </TabsContent>
      <TabsContent value="income-expense" className="space-y-4 mt-4">
        <IncomeExpense />
      </TabsContent>
      <TabsContent value="tax" className="space-y-4 mt-4">
        <TaxManagement />
      </TabsContent>
      <TabsContent value="interest" className="space-y-4 mt-4">
        <InterestSavings />
      </TabsContent>
      <TabsContent value="planning" className="space-y-4 mt-4">
        <FinancialPlanning />
      </TabsContent>
      <TabsContent value="alerts" className="space-y-4 mt-4">
        <AlertsReminders />
      </TabsContent>
      <TabsContent value="analytics" className="space-y-4 mt-4">
        <Analytics />
      </TabsContent>
      <TabsContent value="advanced" className="space-y-4 mt-4">
        <Advanced />
      </TabsContent>
    </Tabs>
  );
};
