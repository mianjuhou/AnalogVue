import query from '@/util/query'

const group_name = 'config';
export default {
  deleteAll() {
    return query({
      url: `/${group_name}/deleteall`,
      method: 'get'
    })
  },
  delete(id) {
    return query({
      url: `/${group_name}/delete/${id}`,
      method: 'get'
    })
  },
  add(pojo) {
    return query({
      url: `/${group_name}/add`,
      method: 'post',
      data: pojo
    })
  },
  getall() {
    return query({
      url: `/${group_name}/getall`,
      method: 'get'
    })
  },
  starttest(port, interval) {
    return query({
      url: `/${group_name}/starttest/${port}/${interval}`,
      method: 'get'
    })
  },
  stoptest() {
    return query({
      url: `/${group_name}/stoptest`,
      method: 'get'
    })
  },
  clean() {
    return query({
      url: `/${group_name}/clean`,
      method: 'get'
    })
  },
  getGlobalPortAndrInterval() {
    return query({
      url: `/${group_name}/globalportinterval`,
      method: 'get'
    })
  },
  getExcelConfig() {
    return query({
      url: `/${group_name}/excelconfig`,
      method: 'get'
    })
  },
  addExcelConfig(pojo) {
    return query({
      url: `/${group_name}/excelconfig`,
      method: 'post',
      data: pojo
    })
  },
  deleteExcelConfig(id) {
    return query({
      url: `/${group_name}/excelconfig/${id}`,
      method: 'delete'
    })
  }
}
