<template>
  <a-modal v-model="visible" title="详情" destroyOnClose>
    <api-scope ref="apiScope" :defaultCheck="role.authorities" />
    <template slot="footer">
      <a-button @click="handleCancel" type="primary">确定</a-button>
    </template>
  </a-modal>
</template>
<script>
import ApiScope from './ApiScope.vue'
import roleApi from '@/api/role'

export default {
  name: 'DetailModal',
  components: {
    ApiScope,
  },
  data() {
    return {
      visible: false,
      role: {},
    }
  },
  methods: {
    show(record) {
      this.visible = true
      roleApi.getById(record.id).then((res) => {
        this.role = res.data
      })
    },
    handleCancel() {
      this.visible = false
      this.role = {}
    },
  },
}
</script>
