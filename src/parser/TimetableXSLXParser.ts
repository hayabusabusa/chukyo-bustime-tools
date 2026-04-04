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
      sheetPath: "resource/timetable.xlsx",
      startCoordinate: configuration.startCoordinate,
      endCoordinate: configuration.endCoordinate,
    });

    let timetables: Timetable[] = [];
    let currentCoordinateY: number | undefined;
    let currentHours: number | undefined;
    let currentMinute: number | undefined;
    // 折り返し運行に関しては別途データを作成するため、固定で `false` を入れておく.
    const currentIsReturn = false;
    data.forEach((element, dataIndex) => {
      const value = element.value ?? "";

      // Y 座標が変わったら時間をリセットする.
      if (currentCoordinateY !== element.coordinate.y) {
        currentHours = undefined;
      }

      // 指定された X 座標の時に時間を取得する.
      if (element.coordinate.x === configuration.hourCoordinateX) {
        currentCoordinateY = element.coordinate.y;
        currentHours = this.formatter.formatHours(value);
      }
      // 指定された X 座標の時に分を取得する.
      if (configuration.minutesCoordinateX.includes(element.coordinate.x)) {
        currentMinute = this.formatter.formateMinute(value);
      }

      // ログ表示用
      // console.log(`${element.coordinate.x},${element.coordinate.y} = ${value}, ${element.rawValue}`);
      
      // 時間と分が揃ったらデータを作って追加する.
      if (
        currentHours !== undefined &&
        currentMinute !== undefined
      ) {
        const second = this.formatter.formatSecond(
          currentHours,
          currentMinute
        );
        const isKaizu = configuration.isKaizuCoordinates?.some((coordinate) => {
          return coordinate.x === element.coordinate.x && coordinate.y === element.coordinate.y;
        }) ?? false
        const arrivalDate = this.formatter.formatArrivalDate({
          hours: currentHours,
          minute: currentMinute,
          isToStation: configuration.isToStation,
          isKaizu: isKaizu,
        });
        const arrivalHour = arrivalDate.getHours();
        const arrivalMinute = arrivalDate.getMinutes();
        const arrivalSecond = this.formatter.formatSecond(arrivalHour, arrivalMinute);
        // 1番最後のデータなら終バス扱いにする.
        const isLast = false;// data.length - 1 === dataIndex && currentMinutes!.length - 1 === minuteIndex;
        const timetable: Timetable = {
          hour: currentHours,
          minute: currentMinute,
          second: second,
          arrivalHour: arrivalHour,
          arrivalMinute: arrivalMinute,
          arrivalSecond: arrivalSecond,
          isReturn: currentIsReturn,
          isKaizu: isKaizu,
          isLast: isLast,
        };
        timetables.push(timetable);

        // 分のみリセットする.
        currentMinute = undefined;
      }
    });

    return timetables;
  }
}