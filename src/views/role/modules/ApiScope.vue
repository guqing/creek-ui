<template>
  <div>
    <a-row v-for="resource in resources" :key="resource.name">
      <div
        :style="{
          borderBottom: '1px solid #E9E9E9',
          borderTop: '1px solid #E9E9E9',
          padding: '8px 0',
        }"
      >
        <a-checkbox
          v-model="resource.checked"
          @change="onResourceCheckChange($event, resource.name)"
        >
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
            <a-checkbox
              v-model="scope.checked"
              @change="onScopeCheckChange($event, resource.name)"
            >
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
  props: {
    defaultCheck: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  data() {
    return {
      resources: [],
      indeterminates: [],
      checked: [],
    }
  },
  mounted() {
    this.listResource()
  },
  methods: {
    listResource() {
      apiResourceApi.list().then((res) => {
        this.resources = res.data
        this.resources
          .map((target) => {
            const checked = target.scopes
              .map((scope) => scope.name)
              .every((v) => this.defaultCheck.includes(v))
            this.$set(target, 'checked', checked)
            return target.scopes
          })
          .flatMap((item) => item)
          .forEach((item) => {
            const checked = this.defaultCheck.includes(item.name)
            this.$set(item, 'checked', checked)
          })
      })
    },
    onScopeCheckChange(e, resourceName) {
      this.resources
        .filter((item) => item.name === resourceName)
        .forEach((target) => {
          const checked = target.scopes.map((scope) => scope.checked || false)
          this.$set(target, 'checked', !checked.includes(false))
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
          this.$set(item, 'checked', e.target.checked)
        })
    },
    getAuthority() {
      return this.resources
        .map((target) => {
          return target.scopes
        })
        .flatMap((item) => item)
        .filter((item) => {
          this.$set(item, 'checked', true)
        })
    },
  },
}
</script>
