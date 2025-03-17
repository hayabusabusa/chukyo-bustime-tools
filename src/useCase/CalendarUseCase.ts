import { CalendarFormatter } from "../formatter"
import { JSONOutput } from "../output";
import { CalendarXSLXParser } from "../parser";

export class CalendarUseCase {
    async execute() {
        const jsonOutput = new JSONOutput('./outputs');
        const formatter = new CalendarFormatter();
        const parser = new CalendarXSLXParser(formatter);

        const calendars = parser.parseForCalendar({
            sheetPath: 'resource/calendar.xlsx',
            startCoordinate: {
                x: 'A',
                y: 3,
            },
            endCoordinate: {
                x: 'O',
                y: 57,
            },
            year: 2025,
            month: 3,
            dateCoordinates: [
                'B',
                'D',
                'F',
                'H',
                'J',
                'L',
                'N',
            ],
            diagramCoordinates: [
                'C',
                'E',
                'G',
                'I',
                'K',
                'M',
                'O',
            ],
            bDiagramValues: [
                '卒業式（予定）',
                'Ｂ高大接続入試(現社)',
                '卒業式（予定）',
            ],
            cDiagramValues: [
                '梅村学園創立記念日  C',
                'C高大接続入試(スポーツ)',
            ],
            specialDiagramValues: [
                '教育懇談会（豊田予定）',
                'オープンキャンパス',
                '定期試験',
                '高大連携授業',
                '附属高校体育祭',
                '大学祭',
            ],
        });

        await jsonOutput.output(calendars, 'calendars');
    }
}