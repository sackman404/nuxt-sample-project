import type { MailLogsResponse, MailLogSearchParams } from '~/types'

export const useApi = () => {
  const config = useRuntimeConfig()
  const baseUrl = config.public.apiBaseUrl

  const fetchLogs = async (params: MailLogSearchParams = {}): Promise<MailLogsResponse> => {
    const query = new URLSearchParams()

    if (params.start_date) {
      query.append('start_date', params.start_date)
    }
    if (params.end_date) {
      query.append('end_date', params.end_date)
    }
    if (params.email) {
      query.append('email', params.email)
    }

    const queryString = query.toString()
    const url = `${baseUrl}/api/logs${queryString ? `?${queryString}` : ''}`

    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    return response.json()
  }

  const exportCsv = async (params: MailLogSearchParams = {}): Promise<void> => {
    const query = new URLSearchParams()

    if (params.start_date) {
      query.append('start_date', params.start_date)
    }
    if (params.end_date) {
      query.append('end_date', params.end_date)
    }
    if (params.email) {
      query.append('email', params.email)
    }

    const queryString = query.toString()
    const url = `${baseUrl}/api/logs/export${queryString ? `?${queryString}` : ''}`

    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    const blob = await response.blob()
    const downloadUrl = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = downloadUrl
    a.download = `mail_logs_${new Date().toISOString().slice(0, 10)}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(downloadUrl)
  }

  return {
    fetchLogs,
    exportCsv
  }
}
