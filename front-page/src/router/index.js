import Vue from 'vue'
import Router from 'vue-router'
import ExportIncomeData from '@/pages/ExportIncomeData.vue'
import ExportTransactionData from '@/pages/ExportTransactionData.vue'
import ExportOrderData from '@/pages/ExportOrderData.vue'
import ExportBalanceData from '@/pages/ExportBalanceData.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/export-income-data',
      name: 'ExportIncomeData',
      component: ExportIncomeData
    },
    {
      path: '/export-transaction-data',
      name: 'ExportTransactionData',
      component: ExportTransactionData
    },
    {
      path: '/export-order-data',
      name: 'ExportOrderData',
      component: ExportOrderData
    },
    {
      path: '/export-balance-data',
      name: 'ExportBalanceData',
      component: ExportBalanceData
    }
  ]
})
