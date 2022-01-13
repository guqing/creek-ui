<template>
  <div>
    <a-row v-for="resource in resources" :key="resource.name">
      <div :style="{ borderBottom: '1px solid #E9E9E9', borderTop: '1px solid #E9E9E9', padding: '8px 0' }">
        <a-checkbox v-model="resource.checked" @change="onResourceCheckChange($event, resource.name)">
          <a-space size="large">
            {{ resource.displayName }}
            <span>{{ resource.description }}</span>
          </a-space>
        </a-checkbox>
      </div>
      <br />
      <div style="padding-left: 21px">
        <a-list :data-source="resource.scopes">
          <a-list-item slot="renderItem" slot-scope="scope">
            <a-checkbox v-model="scope.checked">
              {{ scope.displayName }}
              <span style="margin-left: 15px">{{ scope.description }}</span>
            </a-checkbox>
          </a-list-item>
        </a-list>
      </div>
      <div style="margin-bottom: 15px"></div>
    </a-row>
  </div>
</template>
<script>
import apiResourceApi from '@/api/apiResource'

export default {
  name: 'ApiScope',
  data() {
    return {
      resources: [],
      indeterminates: [],
      checked: [],
    }
  },
  created() {
    this.listResource()
  },
  methods: {
    listResource() {
      apiResourceApi.list().then((res) => {
        this.resources = res.data
      })
    },
    onResourceCheckChange(e, name) {
      this.resources
        .filter((item) => item.name === name)
        .map((target) => {
          return target.scopes
        })
        .flatMap((item) => item)
        .forEach((item) => {
          item['checked'] = e.target.checked
        })
    },
    getAuthority() {
      return this.resources
        .map((target) => {
          return target.scopes
        })
        .flatMap((item) => item)
        .filter((item) => item['checked'] === true)
    },
  },
}
</script>
