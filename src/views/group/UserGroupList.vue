<template>
  <a-card :bordered="false">
    <a-row :gutter="8" type="flex" justify="center">
      <a-col :lg="12" :md="24" :order="isMobile ? 1 : 0">
        <a-spin tip="Loading..." :spinning="treeDataLoading">
          <a-tree
            v-model="checkedGroupKeys"
            checkable
            blockNode
            :expanded-keys="expandedGroupKeys"
            :auto-expand-parent="autoExpandParent"
            :selected-keys="selectedKeys"
            :tree-data="userGroupTreeData"
            @expand="onTreeGroupExpand"
            @select="onSelect"
            @check="onTreeGroupCheck"
          />
          <a-empty v-if="userGroupTreeData.length == 0" />
        </a-spin>
      </a-col>
      <a-col :lg="12" :md="24">
        <a-form :form="userGroupForm" :label-col="labelCol" :wrapper-col="wrapperCol">
          <a-form-item label="ID" v-show="false">
            <a-input v-decorator="['id']" />
          </a-form-item>
          <a-form-item label="上级组">
            <a-tree-select
              allowClear
              v-decorator="['parentId']"
              style="width: 100%"
              :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
              :tree-data="userGroupTreeData"
              tree-default-expand-all
            >
            </a-tree-select>
          </a-form-item>
          <a-form-item label="组名称">
            <a-input
              v-decorator="['groupName', { rules: [{ required: true, message: '分组名称不能为空' }] }]"
              placeholder="例如：默认用户组"
            />
          </a-form-item>
          <a-form-item label="排序">
            <a-tooltip :trigger="['focus']" placement="topLeft" overlay-class-name="numeric-input">
              <template slot="title"> 请输入整数数字 </template>
              <a-input
                v-decorator="['sortIndex', { rules: [{ required: false, message: '请输入整数' }] }]"
                type="number"
                placeholder="只能输入数字"
                :max-length="25"
              />
            </a-tooltip>
          </a-form-item>
          <a-form-item :wrapper-col="groupFormButtonWrapperCol">
            <a-button type="primary" v-limitclick="handleSaveOrUpdate" v-action:save> 保存 </a-button>
            <a-button :style="{ marginLeft: '8px' }" @click="handleResetGroupForm"> 重置 </a-button>
          </a-form-item>
        </a-form>
      </a-col>
    </a-row>
  </a-card>
</template>

<script>
import groupApi from '@/api/group'
import { baseMixin } from '@/store/app-mixin'
import pick from 'lodash.pick'

export default {
  name: 'TreeList',
  mixins: [baseMixin],
  data () {
    return {
      treeDataLoading: false,
      userGroupForm: this.$form.createForm(this, { name: 'userGroupForm' }),
      groupFormButtonWrapperCol: { span: 14, offset: 4 },
      labelCol: { span: 4 },
      wrapperCol: { span: 18 },
      // 查询参数
      queryParam: {},
      expandedGroupKeys: [],
      autoExpandParent: false,
      checkedGroupKeys: [],
      selectedKeys: [],
      userGroupTreeData: [],
    }
  },
  created () {
    this.listUserGroupTree()
  },
  computed: {},
  methods: {
    listUserGroupTree () {
      this.treeDataLoading = true
      groupApi
        .list()
        .then((res) => {
          this.userGroupTreeData = res.data
        })
        .catch((err) => {
          this.userGroupTreeData = []
          this.$message.error(`查询出错:${err}`)
        })
        .finally(() => {
          this.treeDataLoading = false
        })
    },
    onTreeGroupExpand (expandedKeys) {
      console.log('onExpand', expandedKeys)
      // if not set autoExpandParent to false, if children expanded, parent can not collapse.
      // or, you can remove all expanded children keys.
      this.expandedGroupKeys = expandedKeys
      this.autoExpandParent = false
    },
    onTreeGroupCheck (checkedGroupKeys) {
      console.log('onCheck', checkedGroupKeys)
    },
    onSelect (selectedKeys, event) {
      this.handleToggleTreeMenu(selectedKeys, event)

      this.selectedKeys = selectedKeys
      var id = selectedKeys[0]
      if (id) {
        groupApi.getById(id).then((res) => {
          this.userGroupForm.setFieldsValue(pick(res.data, 'id', 'parentId', 'groupName', 'sortIndex'))
          if (res.data.parentId === 0) {
            this.userGroupForm.setFieldsValue({ parentId: null })
          }
        })
      }
    },
    handleToggleTreeMenu (selectedKeys, event) {
      // 控制树形菜单的展开与折叠
      if (event.node.dataRef.hasChildren) {
        this.expandedMenuKeys = selectedKeys
      }
    },
    handleSaveOrUpdate () {
      this.userGroupForm.validateFields((err, values) => {
        if (err) {
          return
        }
        groupApi.createOrUpdate(values).then((res) => {
          this.$message.success('保存成功')
          this.userGroupForm.resetFields()
          this.listUserGroupTree()
        })
      })
    },
    handleResetGroupForm () {
      this.userGroupForm.resetFields()
    },
  },
}
</script>

<style lang="less">
.numeric-input .ant-tooltip-inner {
  min-width: 32px;
  min-height: 37px;
}

.numeric-input .numeric-input-title {
  font-size: 14px;
}
</style>
