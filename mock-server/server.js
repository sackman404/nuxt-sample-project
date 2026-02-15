const jsonServer = require('json-server')
const fs = require('fs')
const path = require('path')

const server = jsonServer.create()
const router = jsonServer.router(path.join(__dirname, 'db.json'))
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(jsonServer.bodyParser)

// カスタムルート: /api/logs
server.get('/api/logs', (req, res) => {
  const db = JSON.parse(fs.readFileSync(path.join(__dirname, 'db.json'), 'utf-8'))
  let logs = db.logs

  const { start_date, end_date, email } = req.query

  // 日付フィルタ
  if (start_date) {
    const startDate = new Date(start_date)
    logs = logs.filter(log => new Date(log.sent_at) >= startDate)
  }

  if (end_date) {
    const endDate = new Date(end_date)
    endDate.setHours(23, 59, 59, 999)
    logs = logs.filter(log => new Date(log.sent_at) <= endDate)
  }

  // メールアドレスフィルタ（部分一致）
  if (email) {
    const emailLower = email.toLowerCase()
    logs = logs.filter(log =>
      log.sender.toLowerCase().includes(emailLower) ||
      log.recipient.toLowerCase().includes(emailLower)
    )
  }

  // 日付順でソート（新しい順）
  logs.sort((a, b) => new Date(b.sent_at) - new Date(a.sent_at))

  res.json({
    data: logs,
    total: logs.length
  })
})

// カスタムルート: /api/logs/export (CSV)
server.get('/api/logs/export', (req, res) => {
  const db = JSON.parse(fs.readFileSync(path.join(__dirname, 'db.json'), 'utf-8'))
  let logs = db.logs

  const { start_date, end_date, email } = req.query

  // 日付フィルタ
  if (start_date) {
    const startDate = new Date(start_date)
    logs = logs.filter(log => new Date(log.sent_at) >= startDate)
  }

  if (end_date) {
    const endDate = new Date(end_date)
    endDate.setHours(23, 59, 59, 999)
    logs = logs.filter(log => new Date(log.sent_at) <= endDate)
  }

  // メールアドレスフィルタ
  if (email) {
    const emailLower = email.toLowerCase()
    logs = logs.filter(log =>
      log.sender.toLowerCase().includes(emailLower) ||
      log.recipient.toLowerCase().includes(emailLower)
    )
  }

  // 日付順でソート
  logs.sort((a, b) => new Date(b.sent_at) - new Date(a.sent_at))

  // CSV生成
  const BOM = '\uFEFF'
  const header = '送信日時,送信者,宛先\n'
  const rows = logs.map(log => {
    const sentAt = new Date(log.sent_at).toLocaleString('ja-JP', {
      timeZone: 'Asia/Tokyo'
    })
    return `${sentAt},${log.sender},${log.recipient}`
  }).join('\n')

  const csv = BOM + header + rows

  res.setHeader('Content-Type', 'text/csv; charset=utf-8')
  res.setHeader('Content-Disposition', `attachment; filename="mail_logs_${Date.now()}.csv"`)
  res.send(csv)
})

// デフォルトルーター（その他のエンドポイント）
server.use(router)

const PORT = process.env.PORT || 3001
server.listen(PORT, () => {
  console.log(`Mock server is running on http://localhost:${PORT}`)
  console.log('Available endpoints:')
  console.log('  GET /api/logs - メール送信ログ取得')
  console.log('  GET /api/logs/export - CSV出力')
})
