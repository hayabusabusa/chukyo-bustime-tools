/**
 * 日付を `yyyy-MM-dd` の形に整形する.
 * @param year 年
 * @param month 月
 * @param date 日
 * @returns `yyyy-MM-dd` の文字列.
 */
export function formatteDate (year: number, month: number, date: number) {
  return year.toString() + "-" + month.toString().padStart(2, "0") + "-" + date.toString().padStart(2, "0");
}

/**
 * ダイヤ種別を整形する.
 * @param diagram ダイヤ種別
 * @returns 半角英字のダイヤ種別
 */
export function formatteDiagram(diagram: string) {
  // 英字じゃない場合は運休とみなす
  if (diagram.match(/[Ａ-Ｚａ-ｚ０-９]/g) == null) {
    return "suspension";
  }
  return diagram.replace(/[Ａ-Ｚａ-ｚ０-９]/g, (str) => {
    return String.fromCharCode(str.charCodeAt(0) - 65248);
  })
}

/**
 * ダイヤ名を「xダイヤ」などの形に整形する.
 * @param diagram ダイヤ種別
 */
export function formatteDiagramName(diagram: string) {
  if (diagram === "suspension") {
    return "運休";
  }
  return diagram + "ダイヤ";
}