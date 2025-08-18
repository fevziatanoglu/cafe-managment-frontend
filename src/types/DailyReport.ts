import type { ORDER_ITEM } from "./Order";

export type DAILY_REPORT = {
  adminId: string;
  date: Date;
  totalSales: number;
  totalCustomers: number;
  items: ORDER_ITEM[];
};

export type WEEKLY_SUMMARY = {
  weeklyTotalSales: number;
  weeklyTotalCustomers: number;
  averageDailySales: number;
  daysWithData: number;
  startOfWeek: string;
  endOfWeek: string;
} 
