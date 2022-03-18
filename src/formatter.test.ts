import { formatteDate, formatteDiagram, formatteDiagramName } from "./formatter";

test("日付を正しいフォーマットに整形できること", () => {
  const zeroPadding = formatteDate(2022, 1, 1);
  expect(zeroPadding).toBe("2022-01-01");

  const noneZeroPadding = formatteDate(2022, 12, 31);
  expect(noneZeroPadding).toBe("2022-12-31");
})

test("ダイヤ種別を正しいフォーマットに整形できること", () => {
  const fullWidthDiagram = formatteDiagram("Ａ");
  expect(fullWidthDiagram).toBe("a");

  const halfWidthDiagram = formatteDiagram("A");
  expect(halfWidthDiagram).toBe("a");

  const fullWidthWordDiagram = formatteDiagram("定期試験");
  expect(fullWidthWordDiagram).toBe("special");

  const fullWidthWordAndFullWidthDiagram = formatteDiagram("定期試験A");
  expect(fullWidthWordAndFullWidthDiagram).toBe("special");

  const dashedFullWidthDiagram = formatteDiagram("Ａ'");
  expect(dashedFullWidthDiagram).toBe("a'")

  const dashedHalfWidthDiagram = formatteDiagram("A'");
  expect(dashedHalfWidthDiagram).toBe("a'");

  const fullWidthOtherWordDiagram = formatteDiagram("春分の日（祝日）");
  expect(fullWidthOtherWordDiagram).toBe("suspension");
})

test("ダイヤ名を正しいフォーマットに整形できること", () => {
  const halfWidthDiagram = formatteDiagramName("a");
  expect(halfWidthDiagram).toBe("Aダイヤ");

  const halfWidthUpperCaseDiagram = formatteDiagramName("A");
  expect(halfWidthUpperCaseDiagram).toBe("Aダイヤ");

  const specialDiagram = formatteDiagramName("special");
  expect(specialDiagram).toBe("特別ダイヤ");

  const suspensionDiagram = formatteDiagramName("suspension");
  expect(suspensionDiagram).toBe("運休");
})