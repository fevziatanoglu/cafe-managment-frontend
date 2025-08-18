import type { StateCreator } from "zustand";
import type { API_RESPONSE, DAILY_REPORT, WEEKLY_SUMMARY } from "../../types";
import { getDailyReports, getTodayReport, getWeeklyReports } from "../../api/dailyReportService";

interface DailyReportState {
  reports: DAILY_REPORT[];
  todayReport: DAILY_REPORT | null;
  weeklyReports: DAILY_REPORT[];
  weeklySummary: WEEKLY_SUMMARY | null;
  isDailyReportLoading: boolean;
}

interface DailyReportActions {
  dailyReportsFetch: (params?: { startDate?: string; endDate?: string }) => Promise<API_RESPONSE<DAILY_REPORT[]>>;
  todayReportFetch: () => Promise<API_RESPONSE<DAILY_REPORT | null>>;
  weeklyReportsFetch: () => Promise<API_RESPONSE<{ reports: DAILY_REPORT[]; summary: WEEKLY_SUMMARY }>>;
}

export type DailyReportStore = DailyReportState & DailyReportActions;

export const createDailyReportSlice: StateCreator<DailyReportStore> = (set) => ({
  reports: [],
  todayReport: null,
  weeklyReports: [],
  weeklySummary: null,
  isDailyReportLoading: false,

  dailyReportsFetch: async (params) => {
    set({ isDailyReportLoading: true });
    const response = await getDailyReports(params);
    if (response.success && response.data) {
      set({ reports: response.data });
    }
    set({ isDailyReportLoading: false });
    return response;
  },

  todayReportFetch: async () => {
    set({ isDailyReportLoading: true });
    const response = await getTodayReport();
    if (response.success) {
      set({ todayReport: response.data || null });
    }
    set({ isDailyReportLoading: false });
    return response;
  },

  weeklyReportsFetch: async () => {
    set({ isDailyReportLoading: true });
    const response = await getWeeklyReports();
    if (response.success && response.data) {
      set({ weeklyReports: response.data.reports, weeklySummary: response.data.summary });
    }
    set({ isDailyReportLoading: false });
    return response;
  },
});
