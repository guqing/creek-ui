import { axios } from '@/utils/request'

const apiResourceApi = {}

apiResourceApi.list = function (parameter) {
  return axios({
    url: '/resources/list-view',
    method: 'get',
    params: parameter,
  })
}

export default apiResourceApi
