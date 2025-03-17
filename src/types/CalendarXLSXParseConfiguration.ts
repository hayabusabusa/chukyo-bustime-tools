import { XLSXParseConfiguration } from "./XLSXParseConfiguration";

export interface CalendarXLSXParseConfiguration extends XLSXParseConfiguration {
    /**
     * パース時に扱う年の初期値.
     */
    year: number;

    /**
     * パース時に扱う月の初期値.
     */
    month: number;

    /**
     * 日付の値が入っている X 座標一覧.
     */
    dateCoordinates: string[];

    /**
     * ダイヤの値が入っている X 座標一覧.
     */
    diagramCoordinates: string[];

    /**
     * B ダイヤ判定に使う値一覧
     */
    bDiagramValues: string[];

    /**
     * C ダイヤ半纏に使う値一覧.
     */
    cDiagramValues: string[];

    /**
     * 特別ダイヤ判定を行う値一覧.
     */
    specialDiagramValues: string[];
}

/**
 * 2025 年のカレンダーの `xlsx` ファイルパースのデフォルト設定.
 */
export const calendarXLSXParseDefaultConfiguration: CalendarXLSXParseConfiguration = {
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
}; 