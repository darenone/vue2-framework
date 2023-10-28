// 产品页，可能有电子产品，母婴产品，生活产品等
<template>
  <section>
    <h3>这是产品页</h3>
    <router-link to="/product">产品</router-link><br>
    <router-link to="/product/ele-product">电子产品</router-link><br>
    <router-link to="/product/ele-product/phone">手机</router-link>
    <router-link to="/product/ele-product/computer">电脑</router-link>
    <router-view />
  </section>
</template>
