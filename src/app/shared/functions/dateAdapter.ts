import { TimePeriodsEnum } from "@constants/timePeriods";
import { addDays, addMonths, addWeeks, endOfDay, endOfMonth, endOfWeek, startOfDay, startOfMonth, startOfWeek, subDays, subMonths, subWeeks } from "date-fns";

export function extractDay(date: Date): string {
  return new Date(date).toISOString().split('T')[0]
}

export function parseDateToParams(date: Date, period?: string): { init_date: Date, end_date: Date } {
  let init_date, end_date: Date
  switch (period) {
    case TimePeriodsEnum.Day:
      init_date = startOfDay(date)
      end_date = endOfDay(date)
      break
    case TimePeriodsEnum.Week:
      init_date = startOfWeek(date)
      end_date = endOfWeek(date)
      break
    case TimePeriodsEnum.Month:
      init_date = startOfMonth(date)
      end_date = endOfMonth(date)
      break
    default:
      init_date = startOfDay(date)
      end_date = endOfDay(date)
  }

  return { init_date, end_date }
}

export function changeSelectedDate(date: Date, period: string, type: 'add' | 'sub') {
  switch (period) {
    case TimePeriodsEnum.Day:
      date = type === 'add' ? addDays(date, 1) : subDays(date, 1)
      break;
    case TimePeriodsEnum.Week:
      date = type === 'add' ? addWeeks(date, 1) : subWeeks(date, 1)
      break;
    case TimePeriodsEnum.Month:
      date = type === 'add' ? addMonths(date, 1) : subMonths(date, 1)
      break;

    default:
      date = type === 'add' ? addDays(date, 1) : subDays(date, 1)
      break;
  }

  return new Date(date)
}
