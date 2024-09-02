<template>
  <div>
    <h1>導出資金流</h1>
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
const HOST = 'open-api.bingx.com'

const API = {
  uri: '/openApi/swap/v2/user/income/export',
  method: 'GET',
  payload: {
    endTime: new Date().getTime(),
    limit: '200',
    recvWindow: '10000',
    startTime: new Date().getTime() - 2592000000, // 30天前
    symbol: 'BTC-USDT',
    timestamp: new Date().getTime()
  },
  protocol: 'https'
}

export default {
  data() {
    return {
      data: null
    }
  },
  mounted() {
    this.fetchData().catch(console.error)
  },
  methods: {
    async fetchData() {
      const timestamp = new Date().getTime()
      const sign = CryptoJS.enc.Hex.stringify(
        CryptoJS.HmacSHA256(this.getParameters(API, timestamp), API_SECRET)
      )
      const url = `${API.protocol}://${HOST}${API.uri}?${this.getParameters(API, timestamp, true)}&signature=${sign}`
      const config = {
        method: API.method,
        url: url,
        headers: {
          'X-BX-APIKEY': API_KEY
        }
      }
      const resp = await axios(config)
      this.data = resp.data
    },
    getParameters(API, timestamp, urlEncode) {
      let parameters = ''
      for (const key in API.payload) {
        parameters += `${key}=${urlEncode ? encodeURIComponent(API.payload[key]) : API.payload[key]}&`
      }
      parameters += `timestamp=${timestamp}`
      return parameters
    }
  }
}
</script>
