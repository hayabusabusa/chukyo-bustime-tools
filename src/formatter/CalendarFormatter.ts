import { Diagram } from "../types";

export class CalendarFormatter {
    /**
     * 日付を `yyyy-MM-dd` の形に整形する.
     * @param year 年
     * @param month 月
     * @param date 日
     * @returns `yyyy-MM-dd` の文字列.
     */
    formatteDate(
        year: number, 
        month: number, 
        date: number
    ): string {
        return year.toString() + "-" + month.toString().padStart(2, "0") + "-" + date.toString().padStart(2, "0");
    }

    /**
     * ダイヤ種別を整形する.
     * @param diagram ダイヤ種別
     * @param bDiagramValues Bダイヤ判定の文字列
     * @param cDiagramValues Cダイヤ判定の文字列
     * @param specialDiagramValues 特別ダイヤ判定の文字列
     * @returns 半角英字のダイヤ種別
     */
    formateDiagram(
        diagram: string, 
        bDiagramValues: string[],
        cDiagramValues: string[],
        specialDiagramValues: string[]
    ): string {
        // B ダイヤ判定の文字列が含まれる場合は B ダイヤとして返す
        if (bDiagramValues.includes(diagram)) {
            return Diagram.b;
        }

        // C ダイヤ判定の文字列が含まれる場合は C ダイヤとして返す
        if (cDiagramValues.includes(diagram)) {
            return Diagram.c;
        }

        // 任意の文字が含まれる場合特別ダイヤとして返す
        if (specialDiagramValues.map((e) => diagram.includes(e)).includes(true)) {
            return Diagram.special;
        }

        // 半角英字の場合はそのまま返す
        if (diagram.match(/[A-Za-z0-9]/g) != null) {
            return diagram.toLowerCase();
        }

        // 特別ダイヤ判定の文字列以外で英字じゃない場合は運休とみなす
        if (diagram.match(/[Ａ-Ｚａ-ｚ０-９]/g) == null) {
            return Diagram.suspension;
        }

        return diagram.replace(/[Ａ-Ｚａ-ｚ０-９]/g, (str) => {
            return String.fromCharCode(str.charCodeAt(0) - 65248).toLowerCase();
        })
    }

    /**
     * ダイヤ名を「xダイヤ」などの形に整形する.
     * @param diagram ダイヤ種別
     */
    formatteDiagramName(diagram: string): string {
        if (diagram === Diagram.suspension) {
        return "運休";
        }
    
        if (diagram === Diagram.special) {
        return "特別ダイヤ"
        }
    
        return diagram.toUpperCase() + "ダイヤ";
    }
}