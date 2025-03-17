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
});