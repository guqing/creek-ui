<template>
  <a-modal
    title="Title"
    :visible="visible"
    @cancel="handleCancel"
    destroyOnClose
  >
    <div class="steps-action">
      <a-form-model
        ref="roleForm"
        :model="roleForm"
        v-if="current == 0"
        :rules="rules"
      >
        <a-form-model-item label="角色名称" prop="roleName">
          <a-input v-model="roleForm.roleName" />
        </a-form-model-item>
        <a-form-model-item label="角色描述" prop="remark">
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
      <api-scope
        v-if="current == 1"
        ref="apiScope"
        :defaultCheck="roleForm.authorities"
      />
    </div>
    <template slot="footer">
      <a-button key="back" @click="handleCancel">取消</a-button>
      <a-button
        key="submit"
        type="primary"
        v-if="current == 0"
        @click="handleAuthority"
      >
        编辑权限
      </a-button>
      <a-button
        key="submit"
        type="primary"
        v-if="current == 1"
        @click="handleOk"
      >
        确定
      </a-button>
    </template>
  </a-modal>
</template>
<script>
import ApiScope from './ApiScope.vue'
import roleApi from '@/api/role'

export default {
  name: 'RoleModal',
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    ApiScope,
  },
  data() {
    return {
      current: 0,
      roleForm: {},
      rules: {
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
          { max: 50, message: '字符长度不能超过 50', trigger: 'blur' },
        ],
        remark: [
          {
            max: 150,
            message: '角色描述字符长度不能超过 150',
            trigger: 'blur',
          },
        ],
      },
    }
  },
  methods: {
    edit(value) {
      if (!value.id) {
        return
      }
      this.roleForm = value
      roleApi.getById(value.id).then((res) => {
        this.roleForm['authorities'] = res.data.authorities
      })
    },
    handleAuthority() {
      this.$refs.roleForm.validate((valid) => {
        if (!valid) {
          return false
        }
        this.current++
      })
    },
    handleOk() {
      const authorities = this.$refs.apiScope.getAuthority() || []
      this.roleForm['authorities'] = authorities.map((item) => item.name)
      if (authorities.length === 0) {
        this.$message.error('请选择权限')
        return false
      }
      this.$emit('ok', this.roleForm)
    },
    handleCancel() {
      this.current = 0
      this.roleForm = {}
      this.$emit('cancel')
    },
  },
}
</script>
