<template>
  <div class="app-container">
    <role-add />
    <role-table class="margin-tb" />
  </div>
</template>

<script>
import roleAdd from './role/roleAdd'
import roleTable from './role/roleTable'
export default {
  components: {
    roleAdd,
    roleTable
  },
  data() {
    return {

    }
  }
}

</script>
<style lang='scss' scoped>

</style>
