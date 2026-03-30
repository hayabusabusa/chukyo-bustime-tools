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
    expect(calendarEntries["2026-04-29"].diagram).toEqual(Diagram.aDash);
    expect(calendarEntries["2026-04-30"].diagram).toEqual(Diagram.b);
    expect(calendarEntries["2026-05-04"].diagram).toEqual(Diagram.suspension);
    expect(calendarEntries["2026-07-19"].diagram).toEqual(Diagram.special);
    expect(calendarEntries["2026-07-20"].diagram).toEqual(Diagram.aDash);
    expect(calendarEntries["2026-07-28"].diagram).toEqual(Diagram.special);
    expect(calendarEntries["2026-07-31"].diagram).toEqual(Diagram.special);
    expect(calendarEntries["2026-08-03"].diagram).toEqual(Diagram.special);
    expect(calendarEntries["2026-08-10"].diagram).toEqual(Diagram.suspension);
    expect(calendarEntries["2026-08-20"].diagram).toEqual(Diagram.suspension);
    expect(calendarEntries["2026-09-21"].diagram).toEqual(Diagram.suspension);
    expect(calendarEntries["2026-10-12"].diagram).toEqual(Diagram.aDash);
    expect(calendarEntries["2026-10-30"].diagram).toEqual(Diagram.b);
    expect(calendarEntries["2026-10-31"].diagram).toEqual(Diagram.special);
    expect(calendarEntries["2026-11-01"].diagram).toEqual(Diagram.special);
    expect(calendarEntries["2026-11-03"].diagram).toEqual(Diagram.suspension);
    expect(calendarEntries["2026-11-23"].diagram).toEqual(Diagram.suspension);
    expect(calendarEntries["2026-12-26"].diagram).toEqual(Diagram.suspension);
    expect(calendarEntries["2027-01-01"].diagram).toEqual(Diagram.suspension);
    expect(calendarEntries["2027-01-11"].diagram).toEqual(Diagram.suspension);
    expect(calendarEntries["2027-01-26"].diagram).toEqual(Diagram.special);
    expect(calendarEntries["2027-02-01"].diagram).toEqual(Diagram.special);
    expect(calendarEntries["2027-02-11"].diagram).toEqual(Diagram.suspension);
    expect(calendarEntries["2027-03-22"].diagram).toEqual(Diagram.suspension);
});