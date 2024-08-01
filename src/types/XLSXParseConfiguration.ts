import { XLSXCoordinate } from "./XLSXCoordinate.js";

/**
 * `XLSXParseConfiguration` に指定するコールバックの型.
 */
export type XLSXCallback = (coordinate: XLSXCoordinate, value: string) => void;

/**
 * XSLXファイルパース時にアクセスする情報などをまとめたモデル.
 */
export interface XLSXParseConfiguration {
  /**
   * 読み込むXSLXファイルのパス.
   */
  sheetPath: string

  /**
   * 座標ごとのデータを取得した際に呼び出されるコールバック.
   */
  callback?: XLSXCallback
}