import * as XLSX from "xlsx";

import { XLSXCoordinate, XLSXParseConfiguration } from "../types/";

/**
 * `xlsx` ファイルからデータを抜き出すクラス.
 */
export class XLSXParser {
  /**
   * 指定された `xlsx` ファイルからデータを抜き出す.
   * @param configuration 読み込むファイルの設定など.
   */
  parse(configuration: XLSXParseConfiguration) {
    const book = XLSX.readFile(configuration.sheetPath);
    const sheet = book.Sheets[book.SheetNames.at(0) ?? ""];

    // xlsx ファイルの最後までの範囲を取得.
    const range = XLSX.utils.decode_range(sheet['!ref']!);
    const endOfFileRow = range.e.r;
    const endOfFileColumn = range.e.c;

    // 座標 1 つずつにアクセスして値を取得.
    for (let row = range.s.r; row <= endOfFileRow; row++) {
      for (let column = range.s.c; column <= endOfFileColumn; column++) {
        const address: XLSX.CellAddress = { 
          c: column, 
          r: row 
        };
        // `A1` のような形式に変換する.
        const reference = XLSX.utils.encode_cell(address);
        const cell = sheet[reference];

        if (cell && cell.v !== undefined) {
          const coordinate: XLSXCoordinate = {
            x: XLSX.utils.encode_col(column),
            y: row
          }
          configuration.callback?.(coordinate, cell.v);
        }
      }
    }
  }
}