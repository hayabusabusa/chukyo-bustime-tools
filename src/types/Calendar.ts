/**
 * カレンダーの `xlsx` ファイルから抜き出したデータ.
 */
export interface Calendar {
    /**
     * 日付
     * `yyyy-MM-dd` の形式.
     */
    date: string

    /**
     * ダイヤ.
     */
    diagram: string
    
    /**
     * ダイヤ名.
     */
    diagramName: string
    
    /**
     * 運行休止がどうか.
     */
    isSuspend: boolean
}