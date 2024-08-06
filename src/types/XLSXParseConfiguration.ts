import { XLSXCoordinate } from "./XLSXCoordinate.js";

/**
 * XSLXファイルパース時にアクセスする情報などをまとめたモデル.
 */
export interface XLSXParseConfiguration {
  /**
   * 読み込むXSLXファイルのパス.
   */
  sheetPath: string;

  /**
   * 読み込みを開始する座標.
   */
  startCoordinate?: XLSXCoordinate;

  /**
   * 読み込みを終了する座標.
   */
  endCoordinate?: XLSXCoordinate;

  /**
   * 読み込みをスキップする範囲.
   */
  skipRange?: {
    from: XLSXCoordinate;
    to: XLSXCoordinate;
  };
}