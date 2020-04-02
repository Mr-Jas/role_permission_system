<template>
  <div class="app-container">
    <user-add />
    <user-table class="margin-tb" />
  </div>
</template>

<script>
import userAdd from './user/userAdd'
import userTable from './user/userTable'

export default {
  components: {
    userAdd,
    userTable
  },
  data() {
    return {}
  }
}
</script>
<style lang='scss' scoped>
</style>
