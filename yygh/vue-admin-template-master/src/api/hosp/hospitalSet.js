// export function getList(params) {
//   return request({
//     //config/dev.env.js中的BASE_API + url,一起构成访问路径
//     url: '/table/list',
//     method: 'get',
//     params
//   })
// }

import request from '@/utils/request'

export default {

  //锁定和取消锁定
  lockHospSet(id, status) {
    return request({
      url: `/admin/hosp/hospitalSet/lockHospitalSet/${id}/${status}`,
      method: 'put'
    })
  },


  //该方法获取分页
  getPageList(current, limit, searchObj) {
    return request({
      //就是通过http://localhost:8201/admin/hosp/hospitalSet/findPageHospSet/1/3
      //来显示分页,具体访问地址可以看后端代码
      url: `/admin/hosp/hospitalSet/findPageHospSet/${current}/${limit}`,
      method: 'post',
      //data是使用后端传递过来的json对象
      data: searchObj
    })
  },

  //删除医院设置
  deleteHospSet(id) {
    return request({
      url: `/admin/hosp/hospitalSet/${id}`,
      // 后端代码中，是@DeleteMapping("{id}")，所有method为delete
      method: 'delete'
    })
  },

  //批量删除
  batchRemoveHospSet(idList) {
    return request({
      url: `/admin/hosp/hospitalSet/batchRemove`,
      method: 'delete',
      //data意思是把idList代表的list转化为json
      data: idList
    })
  },

  //添加医院设置
  saveHospSet(hospitalSet) {
    return request({
      url: `/admin/hosp/hospitalSet/saveHospitalSet`,
      method: 'post',
      data: hospitalSet
    })
  }



}
