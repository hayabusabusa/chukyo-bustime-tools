import * as fs from "fs";

/**
 * オブジェクトを JSON ファイルに出力するクラス.
 */
export class JSONOutput {
  constructor(
    private readonly outputDirectory: string,
  ) {}

  /**
   * オブジェクトを JSON ファイルに出力する.
   * @param data 出力するデータ.
   * @param fileName 出力するファイル名.
   */
  async output(data: any, fileName: string) {
    return new Promise<void>((resolve) => {
      const jsonString = JSON.stringify(data);

      fs.writeFile(
        `${this.outputDirectory}/${fileName}.json`, 
        jsonString, 
        (error) => {
          if (error) {
            console.error(error);
          }
          resolve();
        }
      );
    });
  }
}