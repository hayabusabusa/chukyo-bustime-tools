import { WorkSheet } from "xlsx";

import { XLSXParsable } from "./xlsxParsable";
import { formatteDate, formatteDiagram, formatteDiagramName } from "./formatter";
import { Calendar } from "./types";

/**
 * 日付とダイヤの X 座標をまとめたもの.
 */
interface XCoordinate {
  /**
   * 日付の X 座標.
   */
  date: string,

  /**
   * ダイヤの X 座標.
   */
  dia: string
}

/**
 * カレンダーの xlsx ファイルをパースするクラス.
 */
export class CalendarParser implements XLSXParsable<Calendar[]> {

  parse(sheet: WorkSheet): Calendar[] {
    // アクセスする X 座標一覧.
    const xCoordinates: XCoordinate[] = [
      { date: "C", dia: "D" },
      { date: "E", dia: "F" },
      { date: "G", dia: "H" },
      { date: "I", dia: "J" },
      { date: "K", dia: "L" },
      { date: "M", dia: "N" },
      { date: "O", dia: "P" }
    ]

    // 月は 3 月から始める.
    let month = 3;
    // 年は 2022 年から始める.
    let year = 2022;

    // ループで使用する X 座標のインデックス.
    let xIndex = 0;
    // ループで使用する Y 座標.
    let yCoordinate = 3;
    let calendars: Calendar[] = [];

    // `3C`、`3D`、... の順でセルにアクセスしていく.
    // `57P` になったらループを抜ける.
    while (yCoordinate <= 57) {
      // 日付とダイヤの X 座標.
      const xCoordinate = xCoordinates[xIndex];
      // `3C` のような形で日付が格納されているセルの座標を作る.
      const dateCoordinate = xCoordinate.date + yCoordinate.toString();
      // `3D` のような形で日付の横にあるダイヤが格納されているセルの座標を作る.
      const diaCoordinate = xCoordinate.dia + yCoordinate.toString();

      // 日付を取り出す、空白の場合は `undefined` になる
      const dateValue: number = sheet[dateCoordinate]?.v ?? -1;
      // ダイヤを取り出す、空白の場合は `undefined` になる
      const diaValue: string = sheet[diaCoordinate]?.v ?? "運休";

      // 1 日が出てきたら次の月に進める.
      if (dateValue === 1) {
        month += 1;
      }

      // 12 月を越えたら 1 月にして、年を次に進める.
      if (month == 13) {
        month = 1
        year += 1;
      }

      // カレンダーのデータを組み立て.
      const date = formatteDate(year, month, dateValue);
      const diagram = formatteDiagram(diaValue);
      const diagramName = formatteDiagramName(diagram);
      const isSuspend = diagram === "suspension"
      const calendar: Calendar = {
        date: date,
        diagram: diagram,
        diagramName: diagramName,
        isSuspend: isSuspend
      };
      calendars.push(calendar);

      // 次の X 座標に進む.
      xIndex += 1;
      if (xIndex >= xCoordinates.length) {
        xIndex = 0;
        yCoordinate += 1;
      }
    }
    return calendars;
  }
}