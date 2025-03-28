import { CalendarFormatter } from "../formatter";
import {
    Calendar,
    calendarXLSXParseDefaultConfiguration,
    Diagram,
} from "../types";
import { CalendarXSLXParser } from "./CalendarXSLXParser";

/**
 * `isSuspend` の値が `diagram` に対応しているかどうかを確認する.
 * @param calendar カレンダーのデータ一覧.
 * @returns 対応しているかどうか.
 */
const isSuspendedValueMatched = (calendar: Calendar) => {
    if (calendar.diagram === Diagram.suspension) {
        return calendar.isSuspend;
    } else {
        return !calendar.isSuspend;
    }
}

/**
 * ダイヤの値が定義した値になっているかどうか確認する.
 * @param diagram ダイヤの値.
 * @returns 定義した値になっているかどうか.
 */
const isDiagramValueMatched = (diagram: string) => {
    return Object.values(Diagram).includes(diagram);
};

/**
 * `Calendar` の配列を `date` の値をキーにした辞書配列に変換する.
 * @param calendars カレンダーのデータ一覧.
 */
const entries = (calendars: Calendar[]) => {
    return calendars.reduce((acc, calendar) => {
        acc[calendar.date] = calendar;
        return acc;
    }, 
    {} as { [key: string]: Calendar });
}

test("カレンダーの xlsx ファイルをパースできること", () => {
    const formatter = new CalendarFormatter();
    const parser = new CalendarXSLXParser(formatter);
    const calendars = parser.parseForCalendar(calendarXLSXParseDefaultConfiguration);

    calendars.forEach((calendar) => {
        // 日付のフォーマットが正しいこと.
        expect(calendar.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
        // ダイヤの値が正しいこと.
        expect(isDiagramValueMatched(calendar.diagram)).toBe(true);
        // `isSuspended` の値がダイヤと対応していること.
        expect(isSuspendedValueMatched(calendar)).toBe(true);
    });

    // 特定の日付が正しいダイヤになっていること.
    const calendarEntries = entries(calendars);
    expect(calendarEntries["2025-03-20"].diagram).toEqual(Diagram.suspension);
    expect(calendarEntries["2025-04-29"].diagram).toEqual(Diagram.aDash);
    expect(calendarEntries["2025-05-03"].diagram).toEqual(Diagram.suspension);
    expect(calendarEntries["2025-05-17"].diagram).toEqual(Diagram.c);
    expect(calendarEntries["2025-06-14"].diagram).toEqual(Diagram.special);
    expect(calendarEntries["2025-07-20"].diagram).toEqual(Diagram.special);
    expect(calendarEntries["2025-07-21"].diagram).toEqual(Diagram.suspension);
    expect(calendarEntries["2025-08-01"].diagram).toEqual(Diagram.special);
    expect(calendarEntries["2025-08-11"].diagram).toEqual(Diagram.suspension);
    expect(calendarEntries["2025-08-22"].diagram).toEqual(Diagram.b);
    expect(calendarEntries["2025-08-23"].diagram).toEqual(Diagram.c);
    expect(calendarEntries["2025-09-05"].diagram).toEqual(Diagram.special);
    expect(calendarEntries["2025-09-12"].diagram).toEqual(Diagram.special);
    expect(calendarEntries["2025-10-13"].diagram).toEqual(Diagram.aDash);
    expect(calendarEntries["2025-11-02"].diagram).toEqual(Diagram.special);
    expect(calendarEntries["2025-11-23"].diagram).toEqual(Diagram.suspension);
    expect(calendarEntries["2025-11-24"].diagram).toEqual(Diagram.aDash);
    expect(calendarEntries["2026-01-17"].diagram).toEqual(Diagram.suspension);
    expect(calendarEntries["2026-01-26"].diagram).toEqual(Diagram.special);
    expect(calendarEntries["2026-03-19"].diagram).toEqual(Diagram.b);
});