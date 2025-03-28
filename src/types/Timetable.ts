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
   * 出発時刻を 00:00 からの経過秒数に変換した値.
   */
  second: number;

  /**
   * 見込みで算出した到着時刻の時間.
   */
  arrivalHour: number;

  /**
   * 見込みで算出した到着時刻の分.
   */
  arrivalMinute: number;

  /**
   * 見込みで算出した到着時刻を 00:00 からの経過秒数に変換した値.
   */
  arrivalSecond: number;

  /**
   * 折り返し運行かどうか.
   */
  isReturn: boolean;

  /**
   * 貝津駅経由かどか.
   */
  isKaizu: boolean;

  /**
   * 最終バスかどうか.
   */
  isLast: boolean;
}