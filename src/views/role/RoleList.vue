<template>
  <a-card :bordered="false">
    <div class="table-operator">
      <a-form layout="inline">
        <a-form-item label="角色名称">
          <a-input placeholder="角色名称" v-model="queryParam.roleName" />
        </a-form-item>
        <a-form-item label="角色描述">
          <a-input placeholder="角色描述" v-model="queryParam.remark" />
        </a-form-item>
        <a-form-item>
          <a-button
            type="primary"
            @click="handleSearch"
            :loading="loadingState.query"
          >
            查询
          </a-button>
          <a-button
            style="margin-left: 8px"
            @click="handleResetSearchForm"
            :loading="loadingState.reset"
          >
            重置
          </a-button>
        </a-form-item>
      </a-form>
    </div>
    <div style="margin-bottom: 15px">
      <a-button
        type="primary"
        @click="() => (modalVisiable = true)"
        icon="plus"
      >
        新建
      </a-button>
    </div>

    <s-table
      ref="table"
      size="default"
      rowKey="id"
      :columns="columns"
      :data="loadData"
      showPagination="auto"
      :alert="false"
    >
      <span slot="action" slot-scope="text, record">
        <div v-if="record.isInternal">
          <a href="javascript:;">详情</a>
        </div>
        <div v-else>
          <a @click="handleRoleEdit(record)">编辑</a>
          <a-divider type="vertical" />
          <a-dropdown>
            <a class="ant-dropdown-link"> 更多 <a-icon type="down" /> </a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a href="javascript:;">详情</a>
              </a-menu-item>
              <a-menu-item>
                <a href="javascript:;" @click="deleteRole(record)">删除</a>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </div>
      </span>
    </s-table>
    <RoleModal
      ref="roleModal"
      :visible="modalVisiable"
      @cancel="() => (modalVisiable = false)"
      @ok="handleSaveOrUpdateRole"
    />
  </a-card>
</template>

<script>
import { STable } from '@/components'
import roleApi from '@/api/role'
import { baseMixin } from '@/store/app-mixin'
import ApiScope from './modules/ApiScope.vue'
import RoleModal from './modules/RoleModal.vue'

export default {
  name: 'TreeList',
  mixins: [baseMixin],
  components: {
    STable,
    ApiScope,
    RoleModal,
  },
  data() {
    return {
      loadingState: {
        save: false,
        query: false,
        reset: false,
      },
      modalVisiable: false,
      // 查询参数
      queryParam: {},
      // 表头
      columns: [
        {
          title: '角色名称',
          dataIndex: 'roleName',
          needTotal: true,
        },
        {
          title: '角色描述',
          dataIndex: 'remark',
        },
        {
          title: '创建时间',
          dataIndex: 'createTime',
          sorter: true,
        },
        {
          title: '操作',
          dataIndex: 'action',
          width: '150px',
          scopedSlots: { customRender: 'action' },
        },
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: (parameter) => {
        const requestParameters = Object.assign({}, this.queryParam)
        requestParameters.current = parameter.pageNo
        requestParameters.pageSize = parameter.pageSize
        return roleApi
          .listRole(requestParameters)
          .then((res) => {
            return {
              pageSize: res.data.pageSize,
              pageNo: res.data.current,
              totalCount: res.data.total,
              totalPage: res.data.pages,
              data: res.data.list,
            }
          })
          .catch((err) => {
            this.$message.error(`查询出错:${err}`)
            return {
              pageSize: 0,
              pageNo: 1,
              totalCount: 0,
              totalPage: 0,
              data: [],
            }
          })
      },
    }
  },
  methods: {
    handleRoleEdit(value) {
      this.modalVisiable = true
      this.$refs.roleModal.edit(value)
    },
    handleClick(e) {
      this.queryParam = {
        key: e.key,
      }
      this.$refs.table.refresh(true)
    },
    handleSaveOrUpdateRole(value) {
      roleApi.createOrUpdate(value).then(() => {
        this.modalVisiable = false
        this.$message.success('保存成功')
        this.$refs.table.refresh()
        this.$refs.roleModal.reset()
      })
    },
    handleSearch() {
      this.loadingState.query = true
      this.$refs.table.refresh()
      setTimeout(() => {
        this.loadingState.query = false
      }, 1500)
    },
    handleResetSearchForm() {
      this.loadingState.reset = true
      this.queryParam = {}
      this.$refs.table.refresh()
      setTimeout(() => {
        this.loadingState.reset = false
      }, 1500)
    },
    deleteRole(record) {
      roleApi.deleteById(record.id).then((res) => {
        this.$message.success('删除成功')
        this.$refs.table.refresh(true)
      })
    },
  },
}
</script>
