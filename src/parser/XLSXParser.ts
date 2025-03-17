import * as XLSX from "xlsx";

import { 
  XLSXCoordinate, 
  XLSXData, 
  XLSXParseConfiguration
} from "../types";

/**
 * `xlsx` ファイルからデータを抜き出すクラス.
 */
export class XLSXParser {
  /**
   * 指定された `xlsx` ファイルからデータを抜き出す.
   * @param configuration 読み込むファイルの設定など.
   * @returns `xlsx` ファイルから抜き出したデータ一覧.
   */
  parseAll(configuration: XLSXParseConfiguration): XLSXData[] {
    const book = XLSX.readFile(configuration.sheetPath);
    const sheet = book.Sheets[book.SheetNames.at(0) ?? ""];

    // xlsx ファイルの最後までの範囲を取得.
    const range = XLSX.utils.decode_range(sheet['!ref']!);

    // 開始座標の設定.
    const startX = configuration.startCoordinate?.x
    const startY = configuration.startCoordinate?.y

    let startRow = range.s.r;
    let startColumn = range.s.c;
    if (startX !== undefined && startY !== undefined) {
      startRow = XLSX.utils.decode_row(startY.toString());
      startColumn = XLSX.utils.decode_col(startX);
    }

    // 終了座標の設定.
    const endX = configuration.endCoordinate?.x;
    const endY = configuration.endCoordinate?.y;

    let endRow = range.e.r;
    let endColumn = range.e.c;
    if (endX !== undefined && endY !== undefined) {
      endRow = XLSX.utils.decode_row(endY.toString());
      endColumn = XLSX.utils.decode_col(endX);
    }

    // 座標 1 つずつにアクセスして値を取得.
    let data: XLSXData[] = [];
    for (let row = startRow; row <= endRow; row++) {
      for (let column = startColumn; column <= endColumn; column++) {
        const address: XLSX.CellAddress = { 
          c: column,
          r: row
        };
        // `A1` のような形式に変換する.
        const reference = XLSX.utils.encode_cell(address);
        const cell = sheet[reference];

        const coordinate: XLSXCoordinate = {
          x: XLSX.utils.encode_col(column),
          y: row
        }
        data.push({
          coordinate,
          value: cell?.v?.toString(),
          rawValue: cell?.r?.toString(),
        });

        // 終了 X 座標に到達したらループを抜ける.
        if (column === endColumn) {
          break;
        }
      }

      // 終了 Y 座標に到達したらループを抜ける.
      if (row === endRow) {
        break;
      }
    }

    return data;
  }
}