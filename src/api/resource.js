import request from '@/utils/request'
 
// 登录方法
export function login(username, password,shopOrgId,counter, code, uuid) {
  const data = {
    username,
    password,
    shopOrgId,
    counter,
    uuid
  }
  return request({
    url: '/login',
    method: 'post',
    data: data
  })
}
 
// 获取用户详细信息
export function listResource(query) {

  console.log("query.checkedType:"+query.checkedTypes)
  console.log("query.forFree:"+query.forFree)
  console.log("query.frontendOrBackend:"+query.frontendOrBackend)
  console.log("query.tag:"+query.tag)
  console.log("query.unlocked:"+query.unlocked)

  return request({
    url: 'resource/list',
    method: 'post',
    data: query
  })
}
 
// 退出方法
export function logout() {
  return request({
    url: '/logout',
    method: 'post'
  })
}