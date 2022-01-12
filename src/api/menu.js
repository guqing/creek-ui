import { axios } from '@/utils/request'

const menusApi = {}

menusApi.listRouterMap = function () {
  return axios({
    url: '/menus/router',
    method: 'get',
  })
}

menusApi.listTreemenus = function (parameter) {
  return axios({
    url: '/menus',
    method: 'get',
    params: parameter,
  })
}

menusApi.getById = function (parameter) {
  return axios({
    url: `/menus/${parameter}`,
    method: 'get',
  })
}
menusApi.saveOrUpdate = function (parameter) {
  return axios({
    url: `/menus/save`,
    method: 'post',
    data: parameter,
  })
}

menusApi.deleteByIds = function (parameter) {
  return axios({
    url: `/menus`,
    method: 'delete',
    data: parameter,
  })
}

export default menusApi
