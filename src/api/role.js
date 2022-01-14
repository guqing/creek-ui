import { axios } from '@/utils/request'

const roleApi = {}

roleApi.listRole = function (parameter) {
  return axios({
    url: '/role/list',
    method: 'get',
    params: parameter,
  })
}

roleApi.getById = (parameter) => {
  return axios({
    url: `/role/${parameter}`,
    method: 'get',
  })
}

roleApi.createOrUpdate = (parameter) => {
  return axios({
    url: '/role/save',
    method: 'post',
    data: parameter,
  })
}

roleApi.getById = (parameter) => {
  return axios({
    url: `/role/${parameter}`,
    method: 'get',
  })
}

roleApi.deleteById = (id) => {
  return axios({
    url: `/role/${id}`,
    method: 'delete',
  })
}

roleApi.options = () => {
  return axios({
    url: `/role/options`,
    method: 'get',
  })
}
export default roleApi
