<template>
  <div class="m-sign-in-up">
    <div class="m-sign-logo" @click="logoClick">
      <span class="m-sign-logo-left">E</span>
      <span class="m-sign-logo-rignt">chat</span>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    logoClick () {
      this.$router.push('/')
    }
  }
}
</script>

<style>

</style>
