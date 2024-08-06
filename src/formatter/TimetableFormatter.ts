export class TimetableFormatter {
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
   * セルの値から分一覧に変換する.
   * @param coordinateX X 座標.
   * @param value 座標に対応する値.
   * @returns 正しくデータを抜けだした場合は分の値を返す.
   */
  formatMinutes(value: string): number[] | undefined {
    // ` 03    15    31    34    45    47    50` となっている文字列から正規表現を利用して数値のみを複数抜き出す.
    const minutes = value.match(/\d+/g);
    return minutes != null ? minutes.map((minute) => parseInt(minute)) : undefined;
  }

  /**
   * スタイルが入ったデータから折り返し運行かどうかを判定する.
   * @param rawValue スタイル入りのデータ.
   * @returns 折り返し運行かどうか.
   */
  formatIsReturn(rawValue: string): boolean {
    return rawValue.includes("折返し運行");
  }

  /**
   * スタイルが入ったデータから貝津駅経由かどうかを判定する.
   * @param rawValue スタイル入りのデータ.
   * @returns 貝津駅経由かどうか.
   */
  formatIsKaizu(rawValue: string): boolean {
//     <r><rPr><b/><sz val="8.5"/><rFont val="Meiryo UI"/><family val="2"/></rPr><t xml:space="preserve">19時</t></r>
// <r><rPr><b/><sz val="8.5"/><color rgb="FFFF0000"/><rFont val="Meiryo UI"/><family val="2"/></rPr><t xml:space="preserve">00    </t></r><r><rPr><b/><sz val="8.5"/><rFont val="Meiryo UI"/><family val="2"/></rPr><t xml:space="preserve">16    </t></r><r><rPr><b/><sz val="8.5"/><color rgb="FFFF0000"/><rFont val="Meiryo UI"/><family val="2"/></rPr><t xml:space="preserve">27    </t></r><r><rPr><b/><sz val="8.5"/><rFont val="Meiryo UI"/><family val="2"/></rPr><t xml:space="preserve">49</t></r>
    return rawValue.includes("FFFF0000");
  }
}