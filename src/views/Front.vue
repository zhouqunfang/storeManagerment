<template>
  <div>
    <div style="height: 64px; background-color: #fff; box-shadow: 0 2px 8px rgba(0,0,0,0.08); display: flex; align-items: center; border-bottom: 1px solid #f0f0f0;">
      <div style="width: 20%">
        <div style="padding-left: 20px; display: flex; align-items: center">
          <img src="@/assets/imgs/logo.png" alt="" style="width: 48px; height: 48px; border-radius: 50%; object-fit: contain; background-color: #fff; padding: 4px; box-sizing: border-box">
          <div style="font-weight: 600; font-size: 22px; margin-left: 8px; color: #0ea5e9">服饰商城</div>
        </div>
      </div>
      <div style="width: 60%; height: 64px; display: flex; align-items: center">
        <div style="flex: 1">
          <el-menu router :default-active="router.currentRoute.value.path" style="background-color: transparent; border: none;" ellipsis mode="horizontal">
            <el-menu-item index="/front/home">首页</el-menu-item>
            <el-menu-item index="/front/goods">精选商品</el-menu-item>
            <el-menu-item index="/front/cart">购物车</el-menu-item>
            <el-menu-item index="/front/userOrders">商品订单</el-menu-item>
          </el-menu>
        </div>
        <div style="width: fit-content" v-if="router.currentRoute.value.path !== '/front/goods'">
          <el-input @keyup.enter="search" prefix-icon="Search" style="width: 280px" v-model="data.goodsName" placeholder="请输入商品名称查询"></el-input>
        </div>
      </div>
      <div style="width: 20%; text-align: right; padding-right: 12px;">
        <el-dropdown>
          <div style="display: flex; align-items: center; cursor: pointer;">
            <img style="width: 40px; height: 40px; border-radius: 50%; border: 2px solid #e0f2fe" :src="data.user.avatar || 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'" alt="">
            <span style="color: #1e293b; margin-left: 8px; font-weight: 500">{{ data.user.name || '代码小白' }}</span>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click.native="router.push('/front/userRecharge')">我的充值</el-dropdown-item>
              <el-dropdown-item @click.native="router.push('/front/userCollect')">我的收藏</el-dropdown-item>
              <el-dropdown-item @click.native="router.push('/front/userComment')">我的评价</el-dropdown-item>
              <el-dropdown-item @click.native="router.push('/front/person')">个人信息</el-dropdown-item>
              <el-dropdown-item @click.native="router.push('/front/password')">修改密码</el-dropdown-item>
              <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>

    <div style="background-color: #f8fafc; min-height: calc(100vh - 64px);">
      <router-view @updateUser="updateUser" />
    </div>

    <Footer />

  </div>
</template>

<script setup>
import { reactive } from "vue";
import router from "@/router";
import {ElMessage} from "element-plus";
import Footer from "@/components/Footer.vue";

const data = reactive({
  user: JSON.parse(localStorage.getItem('system-user') || '{}'),
  goodsName: null
})

const search = () => {
  if (data.goodsName) {
    router.push('/front/goods?name=' + data.goodsName)
    data.goodsName = null
  }
}

if (!data.user?.id) {
  ElMessage.error('请登录！')
  router.push('/login')
}

const logout = () => {
  localStorage.removeItem('system-user')
  router.push('/login')
  ElMessage.success('退出成功')
}

// 更新Front里面的user对象为最新值
const updateUser = () => {
  data.user = JSON.parse(localStorage.getItem('system-user') || '{}')
}
</script>

<style>
.el-tooltip__trigger {
  cursor: pointer;
  outline: none !important;
}
.el-menu--horizontal .el-menu-item{
  color: #475569;
  font-weight: 500;
}
.el-menu--horizontal {
  border: none !important;
}
.el-menu--horizontal .el-menu-item {
  border: none;
  height: 64px;
  line-height: 64px;
}
.el-menu--horizontal .el-menu-item.is-active {
  border: none;
  color: #0ea5e9 !important;
  background-color: #e0f2fe !important;
  border-bottom: 2px solid #0ea5e9;
}
.el-menu--horizontal .el-menu-item:not(.is-active):hover {
  color: #0ea5e9;
  background-color: #f0f9ff !important;
}
</style>