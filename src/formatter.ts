/**
 * 特別ダイヤとして認識させる文字列一覧.
 */
const specialDiagramCandidate = [
  "教育懇談会",
  "オープンキャンパス",
  "定期試験",
  "大学祭",
];

/**
 * 運休を表す文字列.
 */
const suspensionDiagram = "suspension";

/**
 * 特別ダイヤを表す文字列.
 */
const specialDiagram = "special"

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
  // 任意の文字が含まれる場合特別ダイヤとして返す
  if (specialDiagramCandidate.map((e) => diagram.includes(e)).includes(true)) {
    return specialDiagram;
  }

  // 半角英字の場合はそのまま返す
  if (diagram.match(/[A-Za-z0-9]/g) != null) {
    return diagram.toLowerCase();
  }

  // 英字じゃない場合は運休とみなす
  if (diagram.match(/[Ａ-Ｚａ-ｚ０-９]/g) == null) {
    return suspensionDiagram;
  }

  return diagram.replace(/[Ａ-Ｚａ-ｚ０-９]/g, (str) => {
    return String.fromCharCode(str.charCodeAt(0) - 65248).toLowerCase();
  })
}

/**
 * ダイヤ名を「xダイヤ」などの形に整形する.
 * @param diagram ダイヤ種別
 */
export function formatteDiagramName(diagram: string) {
  if (diagram === suspensionDiagram) {
    return "運休";
  }

  if (diagram === specialDiagram) {
    return "特別ダイヤ"
  }

  return diagram.toUpperCase() + "ダイヤ";
}