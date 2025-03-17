import { XLSXParser } from "./XLSXParser";
import { CalendarFormatter } from "../formatter";
import { 
    Calendar,
    CalendarXLSXParseConfiguration,
    Diagram,
} from "../types";

export class CalendarXSLXParser extends XLSXParser {
    constructor(private readonly formatter: CalendarFormatter) {
        super();
    }

    parseForCalendar(configuration: CalendarXLSXParseConfiguration): Calendar[] {
        // xlsx ファイルから指定範囲のデータを全て抜き出し.
        const data = super.parseAll({
            sheetPath: configuration.sheetPath,
            startCoordinate: configuration.startCoordinate,
            endCoordinate: configuration.endCoordinate,
        });

        // xlsx ファイルから抜き出したデータから作ったカレンダーのデータ一覧.
        let calendars: Calendar[] = [];
        // 読み込みループ中の現在の年.
        let currentYear = configuration.year;
        // 読み込みループ中の現在の月.
        let currentMonth = configuration.month;
        // 読み込みループ中の現在の日付.
        let currentDate: number | undefined;
        // 読み込みループ中の現在のダイヤ.
        let currentDiagram: string | undefined;

        data.forEach((element, index) => {
            // 指定された X 座標の時に日付を取得して数値に変換する.
            if (configuration.dateCoordinates.includes(element.coordinate.x)) {
                currentDate = Number(element.value);
            }

            // 指定された X 座標の時にダイヤを取得する.
            if (configuration.diagramCoordinates.includes(element.coordinate.x)) {
                const value = element.value ?? "";
                currentDiagram = this.formatter.formateDiagram(
                    value,
                    configuration.bDiagramValues,
                    configuration.cDiagramValues,
                    configuration.specialDiagramValues
                );
            }

            // 日付、ダイヤが揃ったらデータを作る.
            if (
                currentDate !== undefined &&
                currentDiagram !== undefined
            ) {
                // 1 日から始まった時以外かつ日付に 1 が出てきたタイミングで月の値を加算する.
                if (currentDate === 1) {
                    const isOverDecember = currentMonth + 1 > 12;
                    // 12 月を超えた場合は年を加算する.
                    currentYear = isOverDecember ? currentYear + 1 : currentYear;
                    // 12 月を超えた場合は 1 月に戻す.
                    currentMonth = isOverDecember ? 1 : currentMonth + 1;
                }

                const date = this.formatter.formatteDate(
                    currentYear,
                    currentMonth,
                    currentDate
                );
                const diagramName = this.formatter.formatteDiagramName(currentDiagram);
                const isSuspend = currentDiagram === Diagram.suspension;
                const calendar: Calendar = {
                    date: date,
                    diagram: currentDiagram,
                    diagramName: diagramName,
                    isSuspend: isSuspend,
                }
                calendars.push(calendar);

                // 次のデータを取得するために現在の値をリセットする.
                currentDiagram = undefined;
                currentDate = undefined;
            }
        });

        return calendars;
    }
}