import type { API_RESPONSE, DAILY_REPORT, WEEKLY_SUMMARY } from '../types';
import requestApi from '../utils/api';
import handleApiError from '../utils/apiErrorHandler';

// Get all daily reports (optionally with date range)
export const getDailyReports = async (params?: { startDate?: string; endDate?: string }): Promise<API_RESPONSE<DAILY_REPORT[]>> => {
  try {
    let url = '/reports';
    if (params && (params.startDate || params.endDate)) {
      const query = [];
      if (params.startDate) query.push(`startDate=${encodeURIComponent(params.startDate)}`);
      if (params.endDate) query.push(`endDate=${encodeURIComponent(params.endDate)}`);
      url += `?${query.join('&')}`;
    }
    const response = await requestApi.get(url);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Get today's report
export const getTodayReport = async (): Promise<API_RESPONSE<DAILY_REPORT | null>> => {
  try {
    const response = await requestApi.get('/reports/today');
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Get this week's reports (with summary)
export const getWeeklyReports = async (): Promise<API_RESPONSE<{ reports: DAILY_REPORT[]; summary: WEEKLY_SUMMARY }>> => {
  try {
    const response = await requestApi.get('/reports/weekly');
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};
