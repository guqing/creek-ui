<template>
  <a-card>
    <a-list bordered :data-source="data">
      <a-list-item slot="renderItem" slot-scope="item">
        {{ item.remark }}
        <template slot="actions">
          <a-icon type="star-o" style="margin-right: 8px" />
          修改
        </template>
        <div slot="extra">Expires on {{ item.expireAt }}</div>
        <a-list-item-meta :description="item.scope"></a-list-item-meta>
      </a-list-item>
    </a-list>
  </a-card>
</template>
<script>
export default {
  name: 'CredentialList',
  data() {
    return {
      data: [
        {
          remark:
            'The GIT client uses the personal access tokens instead of the password',
          scope: 'admin:org, repo, workflow, write:packages',
          expireAt: 'Thu, Mar 31 2022',
        },
      ],
    }
  },
}
</script>
