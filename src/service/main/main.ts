import hyRequest from '@/service'

export function postRoleList() {
  return hyRequest.post({
    url: '/role/list'
  })
}

export function postDepartmentList() {
  return hyRequest.post({
    url: '/department/list'
  })
}
