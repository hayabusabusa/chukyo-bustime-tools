import * as fs from "fs";

import { outputJSON } from "./output";

interface Stub {
  id: number
  content: string
}

beforeAll(() => {
  // `outputs` フォルダがない場合は作成.
  if (!fs.existsSync("outputs")) {
    fs.mkdirSync("outputs");
  }
});

test("オブジェクトから JSON ファイルが出力できること", () => {
  const singleObject: Stub = {
    id: 0,
    content: "TEST"
  };

  outputJSON(singleObject, "test1");

  expect(fs.existsSync("outputs/test1.json")).toBe(true);

  const arrayObject: Stub[] = [
    {
      id: 0,
      content: "TEST"
    },
    {
      id: 1,
      content: "TEST"
    }
  ]

  outputJSON(arrayObject, "test2");

  expect(fs.existsSync("outputs/test2.json")).toBe(true);
})