<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div id="app">
    <nav>
      <ul>
        <li><router-link to="/export-income-data">導出資金流</router-link></li>
        <li><router-link to="/export-transaction-data">導出交易數據</router-link></li>
        <li><router-link to="/export-order-data">導出訂單數據</router-link></li>
        <li><router-link to="/export-balance-data">導出餘額數據</router-link></li>
      </ul>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
nav {
  background-color: #333;
  padding: 1em;
}

nav ul {
  list-style-type: none;
  padding: 0;
}

nav ul li {
  display: inline;
  margin-right: 1em;
}

nav ul li a {
  color: white;
  text-decoration: none;
}

nav ul li a:hover {
  text-decoration: underline;
}
</style>
