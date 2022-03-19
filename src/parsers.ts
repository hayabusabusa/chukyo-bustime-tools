import { WorkSheet } from "xlsx";

/**
 * `xlsx` ファイルをパースするオブジェクトのインターフェース.
 */
export interface XLSXParsable<T> {
  /**
   * シートからデータを抜き出す.
   * @param sheet xlsx のシート.
   */
  parse(sheet: WorkSheet): T;
}