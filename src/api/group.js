import { axios } from '@/utils/request'

const groupsApi = {}

groupsApi.list = function (parameter) {
  return axios({
    url: '/groups/list',
    method: 'get',
    params: parameter,
  })
}

groupsApi.getById = function (parameter) {
  return axios({
    url: `/groups/${parameter}`,
    method: 'get',
  })
}

groupsApi.createOrUpdate = function (parameter) {
  return axios({
    url: `/groups/save`,
    method: 'post',
    data: parameter,
  })
}

export default groupsApi
