<template>
  <div>
    <h1>導出訂單數據</h1>
    <button @click="downloadData">下載數據</button>
    <pre v-if="data">{{ JSON.stringify(data, null, 2) }}</pre>
    <p v-else>加載中...</p>
  </div>
</template>

<script>
import CryptoJS from 'crypto-js'
import axios from 'axios'

const API_KEY = 'PylNZbaPIpjPHsGoZ7hCVSHr5yPB8sUWttko3kyuBDfuNEfsV6FH1LLvq9OXdxV2CjoSeeZ0T4fCa59BDw'
const API_SECRET =
  'cIJBg70Sy8kdZB4vV4zQuaoeATNqmqjrfwCbg2XnovP5MHnx5elFJoWEErIReeFHpxmH8I78ASnkrcQN7lJA'

const API = {
  uri: '/swap/v2/user/order/export',
  method: 'GET',
  payload: {
    endTime: new Date().getTime(),
    limit: '200',
    recvWindow: '4000',
    startTime: new Date().getTime() - 2592000000, // 30天前
    symbol: 'BTC-USDT'
  }
}

export default {
  data() {
    return {
      data: null
    }
  },
  methods: {
    async downloadData() {
      const timestamp = new Date().getTime()
      const sign = CryptoJS.enc.Hex.stringify(
        CryptoJS.HmacSHA256(this.getParameters(API, timestamp), API_SECRET)
      )
      const url = `/openApi${API.uri}?${this.getParameters(API, timestamp, true)}&signature=${sign}`
      console.log('Request URL:', url) // 調試用
      const config = {
        method: API.method,
        url: url,
        headers: {
          'X-BX-APIKEY': API_KEY
        },
        responseType: 'blob' // 設置響應類型為 blob
      }
      try {
        const resp = await axios(config)
        console.log('Response Data:', resp.data) // 調試用
        this.downloadFile(resp.data, 'order_data.xlsx')
      } catch (error) {
        console.error('API Error:', error)
      }
    },
    getParameters(API, timestamp, urlEncode) {
      let parameters = ''
      const payloadWithTimestamp = { ...API.payload, timestamp }
      for (const key in payloadWithTimestamp) {
        parameters += `${key}=${urlEncode ? encodeURIComponent(payloadWithTimestamp[key]) : payloadWithTimestamp[key]}&`
      }
      return parameters.slice(0, -1) // 去掉最後一個 &
    },
    downloadFile(data, filename) {
      const url = window.URL.createObjectURL(new Blob([data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', filename)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }
}
</script>
