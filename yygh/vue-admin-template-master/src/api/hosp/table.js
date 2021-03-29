import request from '@/utils/request'

export function getList(params) {
  return request({
    //config/dev.env.js中的BASE_API + url,一起构成访问路径
    url: '/table/list',
    method: 'get',
    params
  })
}
