<template>
  <a-modal title="Title" :visible="visible" @cancel="handleCancel" destroyOnClose>
    <div class="steps-action">
      <a-form-model :model="roleForm" v-if="current == 0">
        <a-form-model-item label="角色名称">
          <a-input v-model="roleForm.roleName" />
        </a-form-model-item>
        <a-form-model-item label="角色描述">
          <a-textarea
            v-model="roleForm.remark"
            placeholder="角色描述最大长度不能超过150字符"
            :maxLength="150"
            allowClear
            :auto-size="{ minRows: 3, maxRows: 5 }"
          />
        </a-form-model-item>
        <a-form-model>
          <a-alert type="info" showIcon>
            <p slot="description">
              下一步<br />
              您需要进一步编辑角色的权限。
            </p>
          </a-alert>
        </a-form-model>
      </a-form-model>
      <api-scope v-if="current == 1" ref="apiScope" />
    </div>
    <template slot="footer">
      <a-button key="back" @click="handleCancel">取消</a-button>
      <a-button key="submit" type="primary" v-if="current == 0" @click="handleAuthority">编辑权限</a-button>
      <a-button key="submit" type="primary" v-if="current == 1" @click="handleOk">确定</a-button>
    </template>
  </a-modal>
</template>
<script>
import ApiScope from './ApiScope.vue'
export default {
  name: 'RoleModal',
  props: ['visible'],
  components: {
    ApiScope,
  },
  data() {
    return {
      current: 0,
      roleForm: {},
    }
  },
  methods: {
    handleAuthority() {
      this.current++
    },
    handleOk() {
      console.log('保存', this.$refs.apiScope.getAuthority())
    },
    handleCancel() {
      this.current = 0
      this.roleForm = {}
      this.$emit('cancel')
    },
  },
}
</script>
