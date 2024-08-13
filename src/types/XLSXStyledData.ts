/**
 * xlsx ファイルから取り出したスタイル付きのデータ.
 */
export interface XLSXStyledData {
  /**
   * スタイルとテキストに関するデータ.
   */
  r: XLSXRawData;
}

/**
 * xlsx ファイルから取り出した複数のスタイル付きデータ.
 */
export interface XLSXStyledMultipleData {
  /**
   * スタイルとテキストに関するデータ一覧.
   */
  r?: XLSXRawData[];
}

export interface XLSXRawData {
  /**
   * スタイルに関するデータ.
   */
  rPr?: XLSXRawPresentation;

  /**
   * テキストの情報.
   */
  t?: XLSXRawText;
}

export interface XLSXRawText {
  /**
   * テキスト.
   */
  text?: string;
}

export interface XLSXRawPresentation {
  /**
   * 色に関する情報.
   */
  color?: XLSXRawPresentationColor;
}

export interface XLSXRawPresentationColor {
  /**
   * RGB.
   */
  rgb: string;
}