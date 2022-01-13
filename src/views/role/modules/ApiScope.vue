<template>
  <a-card :bordered="false">
    <div>
      <a-row v-for="resource in resources" :key="resource.name">
        <div :style="{ borderBottom: '1px solid #E9E9E9', borderTop: '1px solid #E9E9E9', padding: '8px 0' }">
          <a-checkbox>
            <a-space size="large">
              {{ resource.displayName }}
              <span>{{ resource.description }}</span>
            </a-space>
          </a-checkbox>
        </div>
        <br />
        <a-checkbox-group style="padding-left: 21px">
          <a-row v-for="scope in resource.scopes" :key="scope.name">
            <a-checkbox :value="scope.name">
              <a-space size="large">
                {{ scope.displayName }}
                <span>{{ scope.description }}</span>
              </a-space>
            </a-checkbox>
          </a-row>
        </a-checkbox-group>
        <div style="margin-bottom: 15px"></div>
      </a-row>
    </div>
  </a-card>
</template>
<script>
import apiResourceApi from '@/api/apiResource'
export default {
  name: 'ApiScope',
  data () {
    return {
      resources: [],
    }
  },
  created () {
    this.listResource()
  },
  methods: {
    listResource () {
      apiResourceApi.list().then((res) => {
        this.resources = res.data
      })
    },
  },
}
</script>
