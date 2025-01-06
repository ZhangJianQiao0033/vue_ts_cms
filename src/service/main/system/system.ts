import hyRequest from '@/service'

export function postUserListData(queryInfo: any) {
  return hyRequest.post({
    url: '/users/list',
    data: queryInfo
  })
}

export function deleteUserData(id: number) {

  return hyRequest.delete({
    url: `/users/${id}`
  })
}

export function newUserData(userInfo: any) {

  return hyRequest.post({
    url: `/users`,
    data: userInfo
  })
}

export function updateUserData(id: number, userInfo: any) {

  return hyRequest.patch({
    url: `/users/${id}`,
    data: userInfo
  })
}


