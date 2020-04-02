<template>
  <div class="app-container">
    <authority-add />
    <authority-table class="margin-tb" />
  </div>
</template>

<script>
import authorityAdd from './authority/authorityAdd'
import authorityTable from './authority/authorityTable'

export default {
  components: {
    authorityAdd,
    authorityTable
  },
  data() {
    return {
    }
  },
  created() {
  }
}

</script>
<style lang='scss' scoped>

</style>
