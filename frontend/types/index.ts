// メール送信ログ
export interface MailLog {
  id: number
  sent_at: string
  sender: string
  recipient: string
}

// API レスポンス
export interface MailLogsResponse {
  data: MailLog[]
  total: number
}

// 検索パラメータ
export interface MailLogSearchParams {
  start_date?: string
  end_date?: string
  email?: string
}
