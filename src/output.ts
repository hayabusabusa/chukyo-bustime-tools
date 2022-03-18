import * as fs from "fs";

/**
 * オブジェクトを JSON に変換して `resource` フォルダ配下に出力する.
 * @param object 変換したいオブジェクト
 * @param fileName JSON のファイル名
 */
export function outputJSON(object: any, fileName: string) {
  const json = JSON.stringify(object);
  fs.writeFileSync("resource/" + fileName + ".json", json);
}