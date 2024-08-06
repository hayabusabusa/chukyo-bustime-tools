import { XLSXCoordinate } from "./XLSXCoordinate";

/**
 * `xlsx` ファイルから取り出したデータ.
 */
export interface XLSXData {
  /**
   * データの座標.
   */
  coordinate: XLSXCoordinate;

  /**
   * データの値.
   */
  value: string;

  /**
   * スタイルの情報が入った状態の値.
   */
  rawValue?: string;
}