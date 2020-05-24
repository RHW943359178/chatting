<template>
  <div class="m-geo">
    <ul>
      <router-link v-for="item in navigators" :key="item.id" tag="li" exact active-class="active" :to="item.url">{{ item.label }}</router-link>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      navigators: [
        { id: 1, label: '首页', url: '/' },
        { id: 2, label: '公海', url: '/publicsea' },
        { id: 3, label: '聊天室', url: '/chatroom' },
        { id: 4, label: '娱乐', url: '/entertainment' },
        { id: 5, label: '我的', url: '/my' }
      ]
    }
  }
}
</script>

<style lang="scss">
</style>
