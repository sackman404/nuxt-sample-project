import { defineStore } from 'pinia'
import type { MailLog, MailLogSearchParams } from '~/types'

interface LogState {
  logs: MailLog[]
  total: number
  isLoading: boolean
  error: string | null
  searchParams: MailLogSearchParams
}

export const useLogStore = defineStore('log', {
  state: (): LogState => ({
    logs: [],
    total: 0,
    isLoading: false,
    error: null,
    searchParams: {}
  }),

  actions: {
    setLogs(logs: MailLog[], total: number) {
      this.logs = logs
      this.total = total
    },

    setLoading(loading: boolean) {
      this.isLoading = loading
    },

    setError(error: string | null) {
      this.error = error
    },

    setSearchParams(params: MailLogSearchParams) {
      this.searchParams = params
    },

    clearLogs() {
      this.logs = []
      this.total = 0
    }
  }
})
