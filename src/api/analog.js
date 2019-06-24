import query from '@/util/query'

const group_name = 'analog';
export default {
  getStationDatas() {
    return query({
      url: `/${group_name}/stations`,
      method: 'get'
    })
  },
  getTerminalDatas(id){
    return query({
      url: `/${group_name}/stations/${id}`,
      method: 'get'
    })
  },
  findRealData(){
    return query({
      url: `/${group_name}/find`,
      method: 'get'
    })
  },
  findOrderRealData(pojo){
    return query({
      url: `/${group_name}/find`,
      method: 'post',
      data: pojo
    })
  },
  clearAll(){
    return query({
      url: `/${group_name}/clearall`,
      method: 'get'
    })
  }
}
