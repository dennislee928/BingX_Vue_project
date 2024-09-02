import { createRouter, createWebHistory } from 'vue-router'
import ExportIncomeData from '@/pages/ExportIncomeData.vue'
import ExportTransactionData from '@/pages/ExportTransactionData.vue'
import ExportOrderData from '@/pages/ExportOrderData.vue'
import ExportBalanceData from '@/pages/ExportBalanceData.vue'

const routes = [
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

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
