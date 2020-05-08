<template>
  <div class="m-header">
    <el-row>
      <el-col :span="3">
        <div class="m-logo">
          chatting
        </div>
      </el-col>
      <el-col :span="15" class="m-geo-search">
        <div>
          <geo/>
        </div>
        <div>
          <search/>
        </div>
      </el-col>
      <el-col :span="6">
        <user/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Geo from './geo.vue'
import Search from './search'
import User from './user'
export default {
  components: {
    Geo,
    Search,
    User
  }
}
</script>

<style lang="scss">
  @import "@/assets/css/public/header/index.scss";
</style>
