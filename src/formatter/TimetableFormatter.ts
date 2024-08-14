import { XMLBuilder, XMLParser } from "fast-xml-parser";

import { 
  TimetableMinute,
  XLSXRawData,
  XLSXStyledData,
  XLSXStyledMultipleData
} from "../types";

export class TimetableFormatter {
  constructor(
    private readonly xmlParser: XMLParser = new XMLParser({
      ignoreAttributes: false,
      removeNSPrefix: true,
      // `@_` のプレフィックスを削除するために空文字を指定.
      attributeNamePrefix: '',
      // `#text` を `text` に変更するために指定.
      textNodeName: 'text'
    }),
  ) {}

  /**
   * セルの値から時間に変換する.
   * @param value 座標に対応する値.
   * @returns 正しくデータを抜けださた場合は時間の値を返す.
   */
  formatHours(value: string): number | undefined {
    // `19時` となっている文字列から `19` の数値になるように正規表現で数値のみ抜き出す.
    const hours = value.match(/\d+/);
    return hours != null ? parseInt(hours[0]) : undefined;
  }

  /**
   * 時間と分から 00:00 からの経過秒数に変換する.
   * @param hour 時間.
   * @param minute 分.
   * @returns 00:00 からの経過秒数.
   */
  formatSecond(hour: number, minute: number): number {
    return hour * 60 * 60 + minute * 60;
  }

  /**
   * スタイルが入ったデータから分一覧に変換する.
   * @param rawValue スタイル入りのデータ.
   * @param value スタイルが入っていない文字列のデータ.
   * @returns 分一覧
   */
  formatMinutes(rawValue: string | undefined, value: string): TimetableMinute[] {
    // スタイルが入っていないデータがあるため、その場合は `value` から分を取得する.
    if (rawValue == null) {
      const matchedMinutes = value.match(/\d+/g);
      return matchedMinutes?.map((minute) => {
        return {
          value: parseInt(minute),
          isKaizu: false,
        }
      }) ?? [];
    }

    // 配列になるパターンがあるため、一旦 `any` として扱う.
    const parsed = this.xmlParser.parse(rawValue);

    let minutes: TimetableMinute[] = [];
    if (Array.isArray(parsed.r)) {
      const styledMultipleData = parsed as XLSXStyledMultipleData;
      minutes = styledMultipleData?.r?.reduce<TimetableMinute[]>((acc, rawData) => {
        const timetableMinutes = this.formatTimetableMinutes(rawData);
        acc.push(...timetableMinutes);
        return acc;
      }, []) ?? [];
    } else {
      const styledData = parsed as XLSXStyledData;
      minutes = this.formatTimetableMinutes(styledData.r);
    }

    return minutes;
  }

  /**
   * 到着時刻を返す.
   * 
   * 大学行きは 15 分、駅直行は 14 分、貝津駅経由は 17 分として算出.
   * @param departure 出発関連の情報.
   */
  formatArrivalDate(
    departure: { 
      hours: number, 
      minute: number, 
      isToStation: boolean, 
      isKaizu: boolean
    }
  ): Date {
    // 日付は利用しないので、時刻だけ指定した `Date` を作成.
    const now = new Date();
    const departureDate = new Date(
      now.getFullYear(), 
      now.getMonth() + 1,
      now.getDate(),
      departure.hours,
      departure.minute
    );

    // 到着時間を算出.
    let intervalMinute = departure.isToStation ? 14 : 15;
    if (departure.isKaizu) {
      intervalMinute = 17;
    }
    departureDate.setMinutes(departureDate.getMinutes() + intervalMinute);

    return departureDate;
  }

  /**
   * xlsx から取り出したスタイル付きのデータから時刻表の分一覧を取り出す.
   * @param rawData xlsx から取り出したスタイル付きのデータ.
   * @returns 時刻表の分一覧.
   */
  private formatTimetableMinutes(rawData: XLSXRawData): TimetableMinute[] {
    // 単一の値だと `number` 扱いになってしまうため `toString()` を噛ます.
    const text = rawData?.t?.text?.toString();
    // フォントカラーが赤になっている場合は貝津駅経由とする.
    const rgb = rawData.rPr?.color?.rgb;
    const isKaizu = rgb === "FFFF0000";
    // `00      15      30      45` のような形式で分が入っているため、正規表現で数値のみ抜き出す.
    const matchedMinutes = text?.match(/\d+/g);

    if (matchedMinutes == null) {
      return [];
    }

    return matchedMinutes.map((value) => {
      return {
        value: parseInt(value), 
        isKaizu: isKaizu
      }
    });
  }
}