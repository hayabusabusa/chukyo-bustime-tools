/**
 * 時刻表の `xlsx` ファイルから抜き出したデータ.
 */
export interface Timetable {
  /**
   * 出発時刻の時間.
   */
  hour: number;

  /**
   * 出発時刻の分.
   */
  minute: number;

  /**
   * 折り返し運行かどうか.
   */
  isReturn: boolean;

  /**
   * 貝津駅経由かどか.
   */
  isKaizu: boolean;
}

export interface Diagram {
  name: string;
  timetables: Timetable[];
}