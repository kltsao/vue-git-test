import { createFetch } from '@vueuse/core'

export const useApiFetch = createFetch({
  baseUrl: import.meta.env.VITE_API_BASE_URL || '/api',
  options: {
    beforeFetch({ options }) {
      const token = localStorage.getItem('token')
      if (token) {
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${token}`,
        }
      }
      return { options }
    },
    async afterFetch({ data, response }) {
      const newToken = response.headers.get('x-new-token')
      if (newToken) {
        localStorage.setItem('token', newToken)
      }
      return { data: await data.data.json(), response }
    },
  },
  fetchOptions: {
    mode: 'cors',
  },
})
