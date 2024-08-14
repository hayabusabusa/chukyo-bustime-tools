import { XLSXParser } from "./XLSXParser";
import { TimetableFormatter } from "../formatter";
import { 
  Timetable,
  TimetableMinute,
  XLSXCoordinate
} from "../types";

export interface TimetableReturnXSLXParserConfiguration {
  startCoordinate: XLSXCoordinate;
  endCoordinate: XLSXCoordinate;
  collegeHourCoordinateX: string;
  collegeMinutesCoordinateX: string;
  dropLast: number;
}

export class TimetableReturnXSLXParser extends XLSXParser {
  constructor(
    private readonly formatter: TimetableFormatter,
  ) {
    super();
  }

  /**
   * ダイヤの折り返し運行用のデータを抜き出す.
   * @param configuration 座標などの設定.
   * @returns 時刻表のデータ一覧.
   */
  parseForEachDiaOnlyReturn(configuration: TimetableReturnXSLXParserConfiguration): Timetable[] {
    const data = super.parseAll({
      sheetPath: "resource/bustime-timetable-20240425.xlsx",
      startCoordinate: configuration.startCoordinate,
      endCoordinate: configuration.endCoordinate,
    });

    let timetables: Timetable[] = [];
    let currentHours: number | undefined;
    let currentMinutes: TimetableMinute[] | undefined;
    data.forEach((element, dataIndex) => {
      // 指定された X 座標の時に時間を取得する.
      if (element.coordinate.x === configuration.collegeHourCoordinateX) {
        currentHours = this.formatter.formatHours(element.value);
      }
      // 指定された X 座標の時に分一覧を取得する.
      if (element.coordinate.x === configuration.collegeMinutesCoordinateX) {
        currentMinutes = this.formatter.formatMinutes(element.rawValue, element.value);
      }

      // 時間と分が揃ったらデータを作って追加する.
      if (
        currentHours !== undefined &&
        currentMinutes !== undefined
      ) {
        const currentHourTimetables = currentMinutes.map((minute, minuteIndex) => {
          // 大学行きのダイヤの到着時間を割り出して、折り返し運行の出発時間として利用する.
          const collegeArrivedDate = this.formatter.formatArrivalDate({
            hours: currentHours!,
            minute: minute.value,
            // 大学行きのダイヤを最初に読み込むため `false` を指定する.
            isToStation: false,
            isKaizu: minute.isKaizu,
          });
          const collegeArrivedHour = collegeArrivedDate.getHours();
          const collegeArrivedMinute = collegeArrivedDate.getMinutes();
          const collegeArrivedSecond = this.formatter.formatSecond(collegeArrivedHour, collegeArrivedMinute);

          // 大学から発車する折り返し運行の到着時刻を割り出す.
          const stationArrivedDate = this.formatter.formatArrivalDate({
            hours: collegeArrivedHour,
            minute: collegeArrivedMinute,
            isToStation: true,
            isKaizu: minute.isKaizu,
          });
          const stationArrivedHour = stationArrivedDate.getHours();
          const stationArrivedMinute = stationArrivedDate.getMinutes();
          const stationArrivedSecond = this.formatter.formatSecond(stationArrivedHour, stationArrivedMinute);
          // 1番最後のデータなら終バス扱いにする.
          const isLast = data.length - 1 === dataIndex && currentMinutes!.length - 1 === minuteIndex;
          return {
            hour: collegeArrivedHour,
            minute: collegeArrivedMinute,
            second: collegeArrivedSecond,
            arrivalHour: stationArrivedHour,
            arrivalMinute: stationArrivedMinute,
            arrivalSecond: stationArrivedSecond,
            // 折り返し運行用のデータを作るため `true` を指定する.
            isReturn: true,
            isKaizu: minute.isKaizu,
            isLast: isLast,
          };
        });
        timetables.push(...currentHourTimetables);

        // どちらも取得したらリセットする.
        currentHours = undefined;
        currentMinutes = undefined;
      }
    });

    // 途中から折り返し運行ではなくなるので不要なデータを落とす.
    timetables = timetables.slice(
      0, 
      timetables.length - configuration.dropLast
    );

    return timetables;
  }
}