import { XLSXParser } from "./XLSXParser";
import { TimetableFormatter } from "../formatter";
import { 
  Timetable,
  TimetableMinute,
  TimetableXLSXParseConfiguration
} from "../types";

export class TimetableXSLXParser extends XLSXParser {
  constructor(
    private readonly formatter: TimetableFormatter,
  ) {
    super();
  }

  parseForEachDia(configuration: TimetableXLSXParseConfiguration): Timetable[] {
    const data = super.parseAll({
      sheetPath: "resource/bustime-timetable-20240425.xlsx",
      startCoordinate: configuration.startCoordinate,
      endCoordinate: configuration.endCoordinate,
    });

    let timetables: Timetable[] = [];
    let currentHours: number | undefined;
    let currentMinutes: TimetableMinute[] | undefined;
    // 折り返し運行に関しては別途データを作成するため、固定で `false` を入れておく.
    const currentIsReturn = false;
    data.forEach((element, dataIndex) => {
      const value = element.value ?? "";

      // 指定された X 座標の時に時間を取得する.
      if (element.coordinate.x === configuration.hourCoordinateX) {
        currentHours = this.formatter.formatHours(value);
      }
      // 指定された X 座標の時に分一覧を取得する.
      if (element.coordinate.x === configuration.minutesCoordinateX) {
        currentMinutes = this.formatter.formatMinutes(element.rawValue, value);
      }
      
      // 時間と分が揃ったらデータを作って追加する.
      if (
        currentHours !== undefined &&
        currentMinutes !== undefined
      ) {
        const currentHourTimetables = currentMinutes.map((minute, minuteIndex) => {
          const second = this.formatter.formatSecond(currentHours!, minute.value);
          const arrivalDate = this.formatter.formatArrivalDate({
            hours: currentHours!,
            minute: minute.value,
            isToStation: configuration.isToStation,
            isKaizu: minute.isKaizu,
          });
          const arrivalHour = arrivalDate.getHours();
          const arrivalMinute = arrivalDate.getMinutes();
          const arrivalSecond = this.formatter.formatSecond(arrivalHour, arrivalMinute);
          // 1番最後のデータなら終バス扱いにする.
          const isLast = data.length - 1 === dataIndex && currentMinutes!.length - 1 === minuteIndex;
          return {
            hour: currentHours!,
            minute: minute.value,
            second: second,
            arrivalHour: arrivalHour,
            arrivalMinute: arrivalMinute,
            arrivalSecond: arrivalSecond,
            isReturn: currentIsReturn,
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

    return timetables;
  }
}