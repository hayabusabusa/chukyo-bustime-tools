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